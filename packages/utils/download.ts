import { getFileType } from './common'

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
  fileName = getFileType(fileName)
  return imgExt.some(ext => fileName?.endsWith(ext))
}

/** 是否是视频 */
export function isVideoFile(fileName: string) {
  fileName = getFileType(fileName)
  return videoExt.some(ext => fileName?.endsWith(ext))
}

/** 是否是pdf */
export function isPdfFile(fileName: string) {
  fileName = getFileType(fileName)
  return pdfExt.some(ext => fileName?.endsWith(ext))
}

/** 判断文件是否可以预览 */
export function isPreviewFile(fileName: string) {
  fileName = getFileType(fileName)
  return previewExt.some(ext => fileName?.endsWith(ext))
}

/** 下载文件 */
export function download(data: Blob | string, fileName: string) {
  if (typeof data === 'string') {
    fetch(data, { mode: 'no-cors' })
      .then(res => res.blob())
      .then((blob) => {
        const link = document.createElement('a')
        const data = window.URL.createObjectURL(blob)
        link.href = data
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(data)
      })
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
