# `vue-easy-clipboard`

![npm](https://img.shields.io/npm/v/vue-easy-clipboard?color=orange&label=vue-easy-clipboard&style=flat-square)

> `localStorage with expiry time.`

## `main.js`
```js
import {createApp} from 'vue'
import App from './App.vue'

import {VueClipboard} from 'vue-easy-clipboard'

const app = createApp(App)
  .use(VueClipboard)
  // 或者
  // .use(VueClipboard, {autoSetContainer: true, appendToBody: true})

app.mount('#app')
```



## 1、当前 `Vue` 实例直接使用

> `this.$copyText('')`

```vue
<script>
export default {
  name: "Test",
  created() {
    this.$copyText('需要复制的内容').then(() => {
        this.$success('内容已复制到剪贴板')
      }).catch(() => {
        this.$error('复制失败')
      })
  },
  methods: {}
}
</script>
```



## 2、指令 `v-clipboard` 方式使用

```vue
<template id="t">
  <div class="container">
    <input type="text" v-model="message">
    <button type="button"
      v-clipboard:copy="message"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">Copy!</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: 'Copy These Text'
    }
  },
  methods: {
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    }
  }
}
</script>
```



## 3、单独使用

```js
import {copyText} from "vue-easy-clipboard"

copyText('需要复制的内容').then(() => {
    this.$success('内容已复制到剪贴板')
}).catch(() => {
    this.$error('复制失败')
})
```

