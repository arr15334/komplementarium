import VueCookie from 'vue-cookie'

import config from '@/settings/config'

const state = {
  windowNormal: true
}

const getters = {
  PREFERENCES_WINDOW_NORMAL: function (state) {
    return state.windowNormal
  }
}

const mutations = {
  PREFERENCES_UPDATE (state, playLoad = {}) {
    const env = config.env
    const cookieDomain = config[env].cookieDomain
    const secure = config[env].cookieSecure

    state.windowNormal = (playLoad.hasOwnProperty('windowNormal'))
      ? playLoad.windowNormal : state.windowNormal

    const cookieData = {
      windowNormal: state.windowNormal
    }

    VueCookie.set('preferences', JSON.stringify(cookieData), {
      path: '/',
      domain: cookieDomain,
      secure: secure
    })
  }
}

// async operations
const actions = {
  preference_is_window_normal (context) {
    const cookie = VueCookie.get('preferences')
    const data = (cookie) ? JSON.parse(cookie) : {}

    context.commit('PREFERENCES_UPDATE', data)

    return context.getters.PREFERENCES_WINDOW_NORMAL
  },

  preference_maximize_window (context) {
    const data = {
      windowNormal: false
    }

    context.commit('PREFERENCES_UPDATE', data)
  },

  preference_restore_window (context) {
    const data = {
      windowNormal: true
    }

    context.commit('PREFERENCES_UPDATE', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
