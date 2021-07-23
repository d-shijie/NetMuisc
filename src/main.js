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
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
