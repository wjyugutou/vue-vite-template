<script setup lang="ts">
import type Toolbar from 'quill/modules/toolbar'
import type { CSSProperties } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const props = defineProps({
  height: {
    type: Number,
    default: null,
  },
  minHeight: {
    type: Number,
    default: null,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  fileSize: {
    type: Number,
    default: 5,
  },
  type: {
    type: String,
    default: 'url',
  },
  theme: {
    type: String,
    default: 'snow',
  },
  toolbar: {
    type: Array,
    default: () => [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image', 'video'],
    ],
  },
})

const emit = defineEmits<{
  change: [string]
}>()

const modelValue = defineModel<string>()

const editorRef = ref<HTMLDivElement | null>(null)
const quillInstance = ref<Quill | null>(null)
const currentValue = ref('')

const styles = computed(() => {
  const style: CSSProperties = {}
  if (props.minHeight) {
    style.minHeight = `${props.minHeight}px`
  }
  if (props.height) {
    style.height = `${props.height}px`
  }
  return style
})

watch(
  modelValue,
  (newVal) => {
    if (newVal !== currentValue.value) {
      currentValue.value = newVal ?? ''
      if (quillInstance.value) {
        quillInstance.value.root.innerHTML = currentValue.value
      }
    }
  },
  { immediate: true },
)

const { open, onChange: onFileChange } = useFileDialog({
  accept: 'image/*',
  multiple: false,
})

onFileChange(async (files) => {
  try {
    console.log(files)
    const file = files?.[0]
    if (file) {
      if (props.fileSize) {
        const isLt = file.size / 1024 / 1024 < props.fileSize
        if (!isLt) {
          return ElMessage.error(`上传文件大小不能超过 ${props.fileSize} MB!`)
        }
      }
      const formData = new FormData()
      formData.append('file', file)

      // const res = await upload(formData)
      // const length = quillInstance.value!.getSelection()?.index ?? 0
      // quillInstance.value!.insertEmbed(length, 'image', res.url)
      // quillInstance.value!.setSelection(length + 1)
    }
  }
  catch (error) {
    ElMessage.error('图片插入失败')
  }
})

function init() {
  quillInstance.value = new Quill(editorRef.value!, {
    theme: props.theme,
    bounds: document.body,
    debug: 'warn',
    modules: {
      toolbar: props.toolbar,
    },
    placeholder: '请输入内容',
    readOnly: props.readOnly,
  })

  if (props.type === 'url') {
    const toolbar = quillInstance.value.getModule('toolbar') as Toolbar
    toolbar.addHandler('image', (value) => {
      if (value) {
        open()
      }
      else {
        quillInstance.value!.format('image', false)
      }
    })
  }

  quillInstance.value.root.innerHTML = currentValue.value

  quillInstance.value.on('text-change', (delta, oldDelta, source) => {
    const html = editorRef.value!.children[0].innerHTML
    // const text = quillInstance.value!.getText()
    currentValue.value = html
    modelValue.value = html
    emit('change', html)
  })

  quillInstance.value.on('selection-change', (range, oldRange, source) => {
  })

  quillInstance.value.on('editor-change', (eventName, ...args) => {
  })
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  quillInstance.value = null
})
</script>

<template>
  <div class="c-editor">
    <div ref="editorRef" class="editor" :style="styles" />
  </div>
</template>

<style>
.c-editor {
  width: 100%;
  .editor,
  .ql-toolbar {
    white-space: pre-wrap !important;
    line-height: normal !important;
  }
  .quill-img {
    display: none;
  }

  .ql-snow .ql-tooltip {
    transform: translate(50%, 10px);
  }

  .ql-snow .ql-tooltip[data-mode="link"]::before {
    content: "请输入链接地址:";
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: "保存";
    padding-right: 0px;
  }

  .ql-snow .ql-tooltip[data-mode="video"]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体";
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体";
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体";
  }
}
</style>
