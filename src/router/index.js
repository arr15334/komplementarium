import Vue from 'vue'
import Router from 'vue-router'
// import Dashboard from '@/components/Dashboard'
import LandingPage from '@/components/Landing'
import Signin from '@/components/Signin'
import Register from '@/components/Register'
import Dashboard from '@/components/Dashboard'
import BabyNew from '@/components/BabyNew'

Vue.use(Router)

export default new Router(
  {
    routes: [
      {
        path: '/',
        name: 'home',
        component: LandingPage
      },
      {
        path: '/signin',
        name: 'Signin',
        component: Signin
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/baby',
        name: 'BabyNew',
        component: BabyNew
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
)
