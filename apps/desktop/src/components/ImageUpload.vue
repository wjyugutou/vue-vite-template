<script lang="ts" setup>
import type { Result } from '@repo/api'
import type { UploadFile, UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { isVideoFile } from 'utils'
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  listType?: 'picture-card' | 'picture' | 'text'
  accept?: string
}>(), {
  listType: 'picture-card',
  accept: 'image/*,video/*',
})

const action = `11${import.meta.env.VITE_API_BASE_URL}11/file/upload`
const headers = {
  Authorization: `Bearer ${useToken()}`,
}

const modelValue = defineModel<string[]>({ default: [] })

const uploadFileList = ref<UploadFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    uid: '1',
    status: 'done',
  },
  {
    name: 'plant-1.png',
    url: '/images/plant-1.png',
    uid: '2',
  },
  {
    name: 'flower.webm',
    url: 'https://5a5f653e-5f16-497b-a085-f93de26b4348.mdnplay.dev/shared-assets/videos/flower.webm',
    uid: '3',
  },
])

// 预览弹窗
const dialogVisible = ref(false)
const previewUrl = ref('')
const previewUrlList = computed(() => {
  return uploadFileList.value.map(item => item.url!)
})

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  previewUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleChange: UploadProps['onChange'] = ({ file, fileList, event }) => {
  console.log({ file, fileList, event })

  if (file.status === 'done') {
    const response = file.response as Result
    if (response.code === 200) {
      modelValue.value.push(response.data.url)
    }
    else {
      message.error(response.msg)
      uploadFileList.value = uploadFileList.value.filter(item => item.uid !== file.uid)
    }
  }
}

const handleRemove: UploadProps['onRemove'] = (file) => {
  modelValue.value = modelValue.value.filter(item => item !== (file.response as Result).data.url)
}
</script>

<template>
  <div>
    <AUpload
      v-model:file-list="uploadFileList"
      :action="action" :headers="headers"
      :list-type="listType"
      @change="handleChange"
      @remove="handleRemove"
      @preview="handlePictureCardPreview"
    >
      <div class="i-ant-design-plus-outlined text-8" />
    </AUpload>

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
