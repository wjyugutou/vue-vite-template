<script setup lang="ts">
/**
 * wangeditor-next 文档
 * https://wangeditor-next.github.io/docs/guide/
 */
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor-next/editor'
import type { CSSProperties } from 'vue'
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue'
// 引入 css
import '@wangeditor-next/editor/dist/css/style.css'

const props = withDefaults(defineProps<{
  disabled?: boolean
  mode?: 'default' | 'simple'
  height?: string
}>(), {
  disabled: false,
  mode: 'default',
  height: '400px',
})

type AlertType = 'success' | 'info' | 'warning' | 'error'

// 内容 HTML
const modelValue = defineModel<string>('<p>hello</p>')

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef<IDomEditor>()
const toolbarConfig: Partial<IToolbarConfig> = {}
const editorConfig: Partial<IEditorConfig> = { placeholder: '请输入内容...' }

const editorStyle = computed<CSSProperties>(() => {
  return {
    height: props.height,
  }
})

/**
 * Editor 函数类型
 * vue-vite-template\node_modules\.pnpm\@wangeditor-next+core@1.7.4_4bb61281b29fb31b1b2f27096907db69\node_modules\@wangeditor-next\core\dist\core\src\config\interface.d.ts
 */
/** 编辑器回调函数start */
function handleCreated(editor: IDomEditor) {
  console.log('created', editor)
  editorRef.value = editor // 记录 editor 实例，重要！
}
function handleChange(editor: IDomEditor) {
  console.log('change:', editor.getHtml())
}
function handleDestroyed(editor: IDomEditor) {
  console.log('destroyed', editor)
}
function handleFocus(editor: IDomEditor) {
  console.log('focus', editor)
}
function handleBlur(editor: IDomEditor) {
  console.log('blur', editor)
}
function customAlert(info: string, type: AlertType) {
  console.log(`【自定义提示】${type} - ${info}`)
}
/** 编辑器回调函数end */

// 监听 disabled 设置编辑器是否禁用
watchEffect(() => {
  if (props.disabled)
    editorRef.value?.disable()
  else
    editorRef.value?.enable()
})

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  editorRef.value?.destroy()
})
</script>

<template>
  <div class="mt-20px border">
    <Toolbar
      class="border-b border-gray-200"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="modelValue"
      :default-config="editorConfig"
      :mode="mode"
      class="overflow-y-hidden"
      :style="editorStyle"
      @on-created="handleCreated"
      @on-change="handleChange"
      @on-destroyed="handleDestroyed"
      @on-focus="handleFocus"
      @on-blur="handleBlur"
      @custom-alert="customAlert"
    />
  </div>
</template>

<style>

</style>
