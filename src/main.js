import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import "@/plugins/element"
import 'element-ui/lib/theme-chalk/index.css';
import request from "@/request/request"
import router from './router'
import store from './store'
Vue.prototype.$request=request
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
