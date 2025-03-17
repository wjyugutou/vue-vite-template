<script lang="ts" setup>
import type { ElImage, UploadProps, UploadUserFile } from 'element-plus'
import { isVideoFile } from 'utils'
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  listType?: 'picture-card' | 'picture' | 'text'
  accept?: string
}>(), {
  listType: 'picture-card',
  accept: 'image/*,video/*',
})

const modelValue = defineModel<string[]>({ default: [] })

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-1.png',
    url: '/images/plant-1.png',
  },
  {
    name: 'flower.webm',
    url: 'https://5a5f653e-5f16-497b-a085-f93de26b4348.mdnplay.dev/shared-assets/videos/flower.webm',
  },
])

// 预览弹窗
const dialogVisible = ref(false)
const previewUrl = ref('')
const previewUrlList = computed(() => {
  return fileList.value.map(item => item.url!)
})

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  fileList.value = fileList.value.filter(item => item.url !== uploadFile.url)
  modelValue.value = modelValue.value.filter(item => item !== uploadFile.url)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  previewUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile, uploadFiles) => {
  fileList.value.push({
    name: uploadFile.name,
    url: response.url,
  })

  modelValue.value.push(response.url)
}

const handleError: UploadProps['onError'] = (error, uploadFile, uploadFiles) => {
  ElMessage.error(error.message)
}

function handleClickPreview(file: UploadUserFile) {
  dialogVisible.value = true
  previewUrl.value = file.url!
}

function handleClickRemove(file: UploadUserFile) {
  fileList.value = fileList.value.filter(item => item.url !== file.url)
}
</script>

<template>
  <div>
    <ElUpload
      :file-list="fileList"
      action="http://127.0.0.1:4523/m2/4595320-4244870-default/266980986"
      :list-type="listType"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <div class="i-carbon-add text-8" />
      <template v-if="listType === 'picture-card'" #file="{ file }">
        <div class="file-item h-full w-full">
          <!-- 视频 -->
          <div v-if="isVideoFile(file.name)" class="h-full w-full">
            <video class="h-full w-full object-cover" :src="file.url" controls />
          </div>
          <!-- 图片 -->
          <div v-else class="h-full w-full">
            <ElImage class="h-full w-full object-cover" :src="file.url" />
          </div>

          <div class="mask items-center justify-center gap-2">
            <div class="i-carbon-view cursor-pointer text-4 hover:text-primary" @click="handleClickPreview(file)" />
            <div class="i-carbon-trash-can cursor-pointer text-4 hover:text-primary" @click="handleClickRemove(file)" />
          </div>
        </div>
      </template>
    </ElUpload>

    <ImagePreview v-model:visible="dialogVisible" v-model:url="previewUrl" :url-list="previewUrlList" />
  </div>
</template>

<style scoped>
.file-item {
  position: relative;
  &:hover {
    .mask {
      display: flex;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
  }
}
</style>
