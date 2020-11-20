import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import localstorage  from './common/util'
import Router from 'vue-router'
import VueLazyload from 'vue-lazyload'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.prototype.$localstorage = localstorage


Vue.use(ElementUI)
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: require('./assets/img/placeholder.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
