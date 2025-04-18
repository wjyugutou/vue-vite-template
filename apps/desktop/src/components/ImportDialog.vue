<script lang='ts' setup>
import type { UploadInstance } from 'element-plus'

const props = defineProps<{
  url: string
  templateUrl: string
  templateName: string
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const visible = defineModel<boolean>({ required: true })

const uploadRef = useTemplateRef<UploadInstance>('uploadRef')

const loading = ref(false)

const headers = { Authorization: `Bearer ${useToken()}` }

const action = `${import.meta.env.VITE_API_BASE_URL}${props.url}`

async function submitFileForm() {
  uploadRef.value?.submit()
}

const { download, loading: downloadTempLoading } = useDownload(props.templateUrl, props.templateName)
function importTemplate() {
  download()
}

/** 文件上传中处理 */
function handleFileUploadProgress(event: any, file: any, fileList: any) {
  loading.value = true
}

/** 文件上传成功处理 */
function handleFileSuccess(response: any, file: any, fileList: any) {
  if (response.code === 200) {
    ElMessage.success({
      dangerouslyUseHTMLString: true,
      message: response.msg,
    })
    uploadRef.value?.clearFiles()
    visible.value = false
    emit('success')
  }
  else {
    ElMessage.error({
      dangerouslyUseHTMLString: true,
      message: response.msg,
    })
    uploadRef.value?.clearFiles()
  }
}
</script>

<template>
  <ElDialog v-model="visible" title="导入" width="50%" append-to-body>
    <ElUpload
      ref="uploadRef" drag :limit="1" accept=".xlsx, .xls" :headers="headers" :action="action" :auto-upload="false"
      :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess"
    >
      <div class="i-ep-upload-filled inline-block text-12" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip text-center">
          <span>仅允许导入xls、xlsx格式文件。</span>
          <ElButton class="vertical-baseline text-12px" type="primary" link :loading="downloadTempLoading" @click="importTemplate">下载模板</ElButton>
        </div>
      </template>
    </ElUpload>
    <template #footer>
      <div class="dialog-footer">
        <ElButton type="primary" @click="submitFileForm">确 定</ElButton>
        <ElButton @click="visible = false">取 消</ElButton>
      </div>
    </template>
  </ElDialog>
</template>
