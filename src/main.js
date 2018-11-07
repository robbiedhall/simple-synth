import Vue from 'vue'
import App from './App.vue'
import VueCircleSlider from 'vue-circle-slider'
import Element from 'element-ui'

Vue.use(Element)
Vue.use(VueCircleSlider)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
