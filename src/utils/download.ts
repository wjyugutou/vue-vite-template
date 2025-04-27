/**
 * 获取文件类型
 * @example getFileType('https://example.com/image.jpg?width=100&height=100') // 'jpg'
 */
export function getFileType(fileUrl?: string) {
  if (!fileUrl)
    return ''
  const arr1 = fileUrl.split('?')[0]
  const arr2 = arr1.split('.')
  const fileType = arr2.at(-1)
  return fileType
}

/** 图片扩展名 */
export const imgExt = ['jpg', 'jpeg', 'png', 'gif', 'bmp'] as const
/** 视频扩展名 */
export const videoExt = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'] as const
/** pdf扩展名 */
export const pdfExt = ['pdf'] as const

/** 图片、视频、pdf 可预览文件扩展名 */
export const previewExt = [...imgExt, ...videoExt, ...pdfExt]

/** 是否是图片 */
export function isImgFile(fileName: string) {
  const fileType = getFileType(fileName)
  return imgExt.some(ext => fileType?.endsWith(ext))
}

/** 是否是视频 */
export function isVideoFile(fileName: string) {
  const fileType = getFileType(fileName)
  return videoExt.some(ext => fileType?.endsWith(ext))
}

/** 是否是pdf */
export function isPdfFile(fileName: string) {
  const fileType = getFileType(fileName)
  return pdfExt.some(ext => fileType?.endsWith(ext))
}

/** 判断文件是否可以预览 */
export function isPreviewFile(fileName: string) {
  const fileType = getFileType(fileName)
  return previewExt.some(ext => fileType?.endsWith(ext))
}

/** 下载文件 */
export function download(data: Blob | string, fileName: string) {
  if (data instanceof Blob) {
    const link = document.createElement('a')
    const _data = window.URL.createObjectURL(data)
    link.href = _data
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(_data)
  }
  else {
    const blob = new Blob([data])
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }
}
