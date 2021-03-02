export declare interface InstallOptions {
  autoSetContainer: boolean,
  appendToBody: boolean
}

let instance = {
  autoSetContainer: false,
  appendToBody: true
} as InstallOptions

const setConfig = (option: InstallOptions): void => {
  instance = option
}

const getConfig = (): InstallOptions => {
  return instance
}

export {
  getConfig,
  setConfig
}