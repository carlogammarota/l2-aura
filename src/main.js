import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"
// import { BootstrapVue } from 'bootstrap-vue'
// Vue.use(BootstrapVue)
import './assets/tailwind.css';



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
