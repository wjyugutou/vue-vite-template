import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import archiver from 'archiver'

// 获取 __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// dist目录的路径
const distPath = path.join(__dirname, '../dist')

// 格式化文件大小
function formatFileSize(bytes) {
  if (bytes === 0)
    return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / (k ** i)).toFixed(2)} ${sizes[i]}`
}

// 获取文件夹大小
async function getFolderSize(folderPath) {
  let size = 0
  const files = await fs.promises.readdir(folderPath, { withFileTypes: true })

  for (const file of files) {
    const filePath = path.join(folderPath, file.name)
    if (file.isDirectory())
      size += await getFolderSize(filePath)
    else
      size += (await fs.promises.stat(filePath)).size
  }

  return size
}

// 获取构建类型
function getBuildType() {
  const scriptName = process.env.npm_lifecycle_event || ''
  if (scriptName.includes('mobile'))
    return 'mobile'
  if (scriptName.includes('desktop'))
    return 'desktop'
  return null
}

// 获取dist目录下的所有文件夹
async function getDirectories(path) {
  const entries = await fs.promises.readdir(path, { withFileTypes: true })
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
}

// 删除已存在的zip文件
async function removeExistingZip(zipPath) {
  try {
    if (fs.existsSync(zipPath))
      await fs.promises.unlink(zipPath)
  }
  catch (error) {
    console.warn(`⚠️ 无法删除旧的zip文件 ${zipPath}:`, error.message)
  }
}

// 创建zip文件
async function createZip(folderPath, zipPath) {
  const originalSize = await getFolderSize(folderPath)

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath)
    const archive = archiver('zip', {
      zlib: { level: 9 }, // 设置压缩级别
    })

    output.on('close', () => {
      const compressedSize = archive.pointer()
      const compressionRatio = ((1 - (compressedSize / originalSize)) * 100).toFixed(2)
      console.log(`✅ ${path.basename(zipPath)} 创建成功:`)
      console.log(`   源文件大小: ${formatFileSize(originalSize)}`)
      console.log(`   压缩后大小: ${formatFileSize(compressedSize)}`)
      console.log(`   压缩率: ${compressionRatio}%`)
      resolve()
    })

    archive.on('progress', (progress) => {
      const percent = Math.round((progress.entries.processed / progress.entries.total) * 100)
      process.stdout.write(`\r📦 正在压缩 ${path.basename(zipPath)}: ${percent}%`)
    })

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT')
        console.warn('\n⚠️ 警告:', err.message)
      else
        reject(err)
    })

    archive.on('error', (err) => {
      reject(err)
    })

    archive.pipe(output)
    archive.directory(folderPath, false)
    archive.finalize()
  })
}

// 并行压缩文件夹
async function zipFolders(folders) {
  const concurrency = 2 // 同时压缩的最大文件夹数
  const results = []

  for (let i = 0; i < folders.length; i += concurrency) {
    const batch = folders.slice(i, i + concurrency)
    const promises = batch.map(async (folder) => {
      const folderPath = path.join(distPath, folder)
      const zipPath = path.join(distPath, `${folder.trim()}.zip`)

      await removeExistingZip(zipPath)
      await createZip(folderPath, zipPath)
    })

    results.push(...await Promise.all(promises))
  }

  return results
}

// 主函数
async function main() {
  try {
    console.log('🔍 正在扫描目录...')

    const buildType = getBuildType()
    const folders = await getDirectories(distPath)

    // 根据构建类型过滤文件夹
    const foldersToZip = buildType
      ? folders.filter(folder => folder.includes(buildType))
      : folders

    if (foldersToZip.length === 0) {
      console.warn('⚠️ 没有找到需要压缩的文件夹')
      return
    }

    console.log(`📋 找到 ${foldersToZip.length} 个文件夹需要压缩`)
    console.log('开始压缩...\n')

    await zipFolders(foldersToZip)

    console.log('\n🎉 所有文件夹压缩完成！')
  }
  catch (error) {
    console.error('\n❌ 压缩过程中出现错误:', error)
    process.exit(1)
  }
}

main()
