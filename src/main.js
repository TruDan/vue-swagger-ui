import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import filters from './filters';

Vue.config.productionTip = false

for(const [filterId, filter] of Object.entries(filters)) {
  Vue.filter(filterId, filter);
}

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
