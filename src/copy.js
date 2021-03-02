import Clipboard from 'clipboard/dist/clipboard.min.js'
import {getConfig} from './options'

let opts = getConfig()

export {Clipboard}

export function copyText (text, container) {
  return new Promise((resolve, reject) => {
    const fakeElement = document.createElement('button')
    const clipboard = new Clipboard(fakeElement, {
      text: function () {
        return text
      },
      action: function () {
        return 'copy'
      },
      container: typeof container === 'object' ? container : document.body
    })
    clipboard.on('success', function (e) {
      clipboard.destroy()
      resolve(e)
    })
    clipboard.on('error', function (e) {
      clipboard.destroy()
      reject(e)
    })
    if (opts.appendToBody) {
      document.body.appendChild(fakeElement)
    }
    fakeElement.click()
    if (opts.appendToBody) {
      document.body.removeChild(fakeElement)
    }
  })
}