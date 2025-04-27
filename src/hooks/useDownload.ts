import { useRequest } from 'alova/client'

function downloadApi(url: string, data?: Record<string, any>) {
  return Promise.resolve({ url, data })
}

export function useDownload(url: string, fileName: string) {
  const {
    loading,
    send,
    abort,
  } = useRequest((data?: Record<string, any>) => downloadApi(url, data), {
    immediate: false,
  })

  async function handleDownload(data?: Record<string, any>) {
    try {
      ElNotification({
        title: '下载任务',
        message: () => h('div', [
          loading.value ? `${fileName} 下载中...` : '下载成功!',
        ]),
        onClose: () => {
          if (loading.value) {
            abort()
            ElMessage.warning('下载任务已取消')
          }
        },
      })

      const res = await send(data)

      download(res, fileName)
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    loading,
    download: handleDownload,
  }
}
