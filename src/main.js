import Vue from 'vue'
import App from './App.vue'
import router from "./routers";
import store from "./store";
import axios from "axios";
import ElementUi from "element-ui"
import VueLazyload from "vue-lazyload";
import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.baseURL = "/api"
//挂载axios在原型上 基本没用这种用法
Vue.prototype.$http = axios
Vue.use(ElementUi)
// 用于图片懒加载 中途加的 没用到 img的src改为v-lazy
Vue.use(VueLazyload)
Vue.config.productionTip = false
//事件总线 $on $emit
Vue.prototype.$bus = new Vue()
//全局时间过滤器
Vue.filter("timeFormat", (value) => {
  const time = new Date(value)
  const m = (time.getMinutes() + "").padStart(2, "0")
  const s = (time.getSeconds() + "").padStart(2, "0")
  return m + ":" + s
})
//全局日期过滤器
Vue.filter("dateFormat", (value) => {
  const time = new Date(value)
  const year = time.getFullYear()
  const month = (time.getMonth() + 1 + "").padStart(2, "0")
  const day = (time.getDate() + "").padStart(2, "0")
  return year + "-" + month + "-" + day
})
// 全局事件过滤器 精确到分钟
Vue.filter("detailTimeFormat", (value) => {
  const time = new Date(value)
  const year = time.getFullYear()
  const month = (time.getMonth() + 1 + "").padStart(2, "0")
  const day = (time.getDate() + "").padStart(2, "0")
  const hour = (time.getHours() + "").padStart(2, "0")
  const m = (time.getMinutes() + "").padStart(2, "0")
  const s = (time.getSeconds() + "").padStart(2, "0")
  return year + "年" + month + "月" + day + "日" + " " + hour + ":" + m
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
