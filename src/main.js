import Vue from 'vue'
import App from './App.vue'
import router from "./routers";
import store from "./store";
import axios from "axios";
import ElementUi from "element-ui"
import VueLazyload from "vue-lazyload";
import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.baseURL="https://nicemusic-api.lxhcool.cn/"
axios.defaults.withCredentials = true
axios.interceptors.request.use((config)=>{
  // config.headers.cookie=window.localStorage.getItem("token")
  return config
})
Vue.prototype.$http=axios
Vue.use(ElementUi)
Vue.use(VueLazyload)
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
Vue.filter("timeFormat",(value)=>{
  const time=new Date(value)
  const m=(time.getMinutes()+"").padStart(2,"0")
  const s=(time.getSeconds()+"").padStart(2,"0")
  return m+":"+s
})
Vue.filter("dateFormat",(value)=>{
  const time=new Date(value)
  const year=time.getFullYear()
  const month=(time.getMonth()+1+"").padStart(2,"0")
  const day=(time.getDate()+"").padStart(2,"0")
  return year+"-"+month+"-"+day
})
Vue.filter("detailTimeFormat",(value)=>{
  const time=new Date(value)
  const year=time.getFullYear()
  const month=(time.getMonth()+1+"").padStart(2,"0")
  const day=(time.getDate()+"").padStart(2,"0")
  const hour=(time.getHours()+"").padStart(2,"0")
  const m=(time.getMinutes()+"").padStart(2,"0")
  const s=(time.getSeconds()+"").padStart(2,"0")
  return year+"年"+month+"月"+day+"日"+" "+hour+":"+m
})
// const {app, BrowserWindow} = require('electron')
// const path = require('path')
// const url = require('url')
// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let win
// function createWindow () {
//   // Create the browser window.
//   win = new BrowserWindow({width: 800, height: 600})
//   // and load the index.html of the app.
//   win.loadURL(url.format({
//     pathname: path.join(__dirname, 'index.html'),
//     protocol: 'file:',
//     slashes: true
//   }))
//
//   // Open the DevTools.
//   // win.webContents.openDevTools()
//
//   // Emitted when the window is closed.
//   win.on('closed', () => {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     win = null
//   })
// }
//
// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)
//
// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })
//
// app.on('activate', () => {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (win === null) {
//     createWindow()
//   }
// })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
