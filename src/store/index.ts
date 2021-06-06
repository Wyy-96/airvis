import { createStore } from 'vuex'
import getters from './getter'

const modulesFiles = require.context('./modules', true, /\.ts$/)

// you do not need `import app from './modules/app'`
// 不需要“从中导入应用”。/modules/app`
// it will auto require all vuex module from modules file
// 它将自动导入所有vux module 模块
const modules = modulesFiles.keys().reduce((modules:any, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default createStore({
  modules,
  getters
})
