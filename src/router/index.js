import Vue from 'vue'
import Router from 'vue-router'
// import Dashboard from '@/components/Dashboard'
import LandingPage from '@/components/Landing'
import Signin from '@/components/Signin'
import Dashboard from '@/components/Dashboard'

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
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
)
