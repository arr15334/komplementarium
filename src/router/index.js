import Vue from 'vue'
import Router from 'vue-router'

import Splash from '@/components/Splash'
import LandingPage from '@/components/Landing'
import Signin from '@/components/Signin'
import Register from '@/components/Register'
import Dashboard from '@/components/Dashboard'
import BabyNew from '@/components/BabyNew'

import Page from '@/components/Page'

import AdminMeasurements from '@/components/AdminMeasurements'
import AdminMeasurementsHistory from '@/components/AdminMeasurements/AdminMeasurementsHistory'
import AdminMeasurementsWeights from '@/components/AdminMeasurements/AdminMeasurementsWeights'
import AdminMeasurementsWeightsHistory from '@/components/AdminMeasurements/AdminMeasurementsWeightsHistory'
import AdminMeasurementsWeightsItem from '@/components/AdminMeasurements/AdminMeasurementsWeightsItem'
import AdminMeasurementsHeights from '@/components/AdminMeasurements/AdminMeasurementsHeights'
import AdminMeasurementsHeightsHistory from '@/components/AdminMeasurements/AdminMeasurementsHeightsHistory'
import AdminMeasurementsHeightsItem from '@/components/AdminMeasurements/AdminMeasurementsHeightsItem'

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
        path: '/splash',
        name: 'Splash',
        component: Splash
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
        path: '/page',
        name: 'Page',
        redirect: {name: 'Dashboard'},
        component: Page,
        children: [
          {
            path: 'dashboard',
            name: 'Dashboard',
            component: Dashboard
          },
          {
            path: '/baby',
            name: 'BabyNew',
            component: BabyNew
          },
          {
            path: 'measurements',
            name: 'AdminMeasurements',
            redirect: {name: 'AdminMeasurementsHistory'},
            component: AdminMeasurements,
            children: [
              {
                path: 'history',
                name: 'AdminMeasurementsHistory',
                component: AdminMeasurementsHistory
              }
            ]
          },
          {
            path: 'measurements/weights',
            name: 'AdminMeasurementsWeights',
            redirect: {name: 'AdminMeasurementsWeightsHistory'},
            component: AdminMeasurementsWeights,
            children: [
              {
                path: 'history',
                name: 'AdminMeasurementsWeightsHistory',
                component: AdminMeasurementsWeightsHistory
              },
              {
                path: 'item',
                name: 'AdminMeasurementsWeightsItem',
                component: AdminMeasurementsWeightsItem
              }
            ]
          },
          {
            path: 'measurements/heights',
            name: 'AdminMeasurementsHeights',
            redirect: {name: 'AdminMeasurementsHeightsHistory'},
            component: AdminMeasurementsHeights,
            children: [
              {
                path: 'history',
                name: 'AdminMeasurementsHeightsHistory',
                component: AdminMeasurementsHeightsHistory
              },
              {
                path: 'item',
                name: 'AdminMeasurementsHeightsItem',
                component: AdminMeasurementsHeightsItem
              }
            ]
          }
        ]
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  }
)
