import { downloadApi } from '@repo/api'
import { download } from '@repo/utils'
import { useQuery, useQueryClient } from '@tanstack/vue-query'

export interface DownloadOptions {
  url: string
  fileName: string
  downloadFn?: (url: string, data?: Record<string, any>) => Promise<Blob | string>
  data?: Record<string, any>
}

export function useDownload(options: DownloadOptions) {
  const queryKey = ['download', options.url, JSON.stringify(options.data || {})]

  const {
    isLoading,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: ({ signal }) => (options.downloadFn || downloadApi)(options.url, {
      ...options.data,
      signal,
    }),
  })

  const queryClient = useQueryClient()

  async function handleDownload(data?: Record<string, any>) {
    try {
      ElNotification({
        title: '下载任务',
        message: () => h('div', [
          isLoading.value ? `${options.fileName} 下载中...` : '下载成功!',
        ]),
        onClose: () => {
          if (isLoading.value) {
            queryClient.cancelQueries({ queryKey })
            ElMessage.warning('下载任务已取消')
          }
        },
      })

      const { data: response } = await refetch(data)

      if (response) {
        download(response, options.fileName)
      }
      else {
        ElMessage.error('下载失败')
        console.error('下载失败:', response)
      }
    }
    catch (error: any) {
      ElMessage.error('下载失败:', error.message)
      console.error(error)
    }
  }

  return {
    isLoading,
    download: handleDownload,
  }
}
