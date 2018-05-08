// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAnalytics from 'vue-analytics'
import VueIntro from 'vue-introjs'
import VueCookie from 'vue-cookie'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import brands from '@fortawesome/fontawesome-free-brands'
import 'vue-event-calendar/dist/style.css' // ^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar'
// import miniToastr from 'mini-toastr'

import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/theme/theme.scss'
import config from '@/settings/config'

fontawesome.library.add(solid)
fontawesome.library.add(brands)

// d55a9bf7e23607d7b95f5c716643bfd3
const env = config.env
const analytics = config[env].analytics || null
if (analytics !== null && analytics.length > 0) {
  Vue.use(VueAnalytics, {
    id: analytics,
    router
  })
}
Vue.use(vueEventCalendar, {locale: 'es'}) // locale can be 'zh' , 'en' , 'es', 'pt-br', 'ja', 'ko', 'fr', 'it', 'ru', 'de', 'vi', 'ua'
Vue.use(VueIntro)
Vue.use(VueCookie)
/*
miniToastr.init()
function toast ({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb)
}
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}
*/
Vue.http = Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon) // Use the icon component anywhere
/* eslint-disable no-new */
new Vue(
  {
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
  }
)
