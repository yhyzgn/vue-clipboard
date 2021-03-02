import {App} from 'vue'
import {Clipboard, copyText} from './copy'
import {getConfig, InstallOptions, setConfig} from './options'

const VueClipboard = {
  install (app: App<any>, opts?: InstallOptions): void {
    if (opts) {
      setConfig(opts)
    }
    opts = getConfig()
    app.config.globalProperties.$copyText = copyText
    app.directive('clipboard', {
      mounted: function (el, binding) {
        if (binding.arg === 'success') {
          el._vClipboard_success = binding.value
        } else if (binding.arg === 'error') {
          el._vClipboard_error = binding.value
        } else {
          const clipboard = new Clipboard(el, {
            text: function () {
              return binding.value
            },
            action: function () {
              return binding.arg === 'cut' ? 'cut' : 'copy'
            },
            container: opts.autoSetContainer ? el : undefined
          })
          clipboard.on('success', function (e) {
            const callback = el._vClipboard_success
            callback && callback(e)
          })
          clipboard.on('error', function (e) {
            const callback = el._vClipboard_error
            callback && callback(e)
          })
          el._vClipboard = clipboard
        }
      },
      updated: function (el, binding) {
        if (binding.arg === 'success') {
          el._vClipboard_success = binding.value
        } else if (binding.arg === 'error') {
          el._vClipboard_error = binding.value
        } else {
          el._vClipboard.text = function () {
            return binding.value
          }
          el._vClipboard.action = function () {
            return binding.arg === 'cut' ? 'cut' : 'copy'
          }
        }
      },
      unmounted: function (el, binding) {
        if (binding.arg === 'success') {
          delete el._vClipboard_success
        } else if (binding.arg === 'error') {
          delete el._vClipboard_error
        } else {
          el._vClipboard.destroy()
          delete el._vClipboard
        }
      }
    })
  }
}

export {
  VueClipboard,
  copyText
}