import VueCookie from 'vue-cookie'

import config from '@/settings/config'
import api from '@/store/utils/api'
import Session from '@/store/models/Session'

const state = {
  token: '',
  userId: '',
  currentUserId: '',
  name: '',
  currentName: '',
  roles: [],
  currentRol: ''
}

const getters = {
  SESSION_IS_AUTH: function (state) {
    return (state.token && state.token.trim().length > 0)
  },

  SESSION_GET_TOKEN: function (state) {
    return state.token
  },
/*
  SESSION_GET_USER_ID: function (state) {
    return state.userId
  },
*/
  SESSION_GET_USER_CURRENT_ID: function (state) {
    return state.currentUserId
  },

  SESSION_GET_USER_NAME: function (state) {
    return state.name
  },

  SESSION_GET_USER_CURRENT_NAME: function (state) {
    return state.currentName
  }
}

const mutations = {
  /*
  SESSION_UPDATE (state, playLoad = {}) {
    const env = config.env
    const cookieDomain = config[env].cookieDomain
    const secure = config[env].cookieSecure

    const withReset = (playLoad.hasOwnProperty('withReset')) ? playLoad.withReset : false

    state.token = (playLoad.hasOwnProperty('token'))
      ? playLoad.token : (withReset ? '' : state.token)
    state.userId = (playLoad.hasOwnProperty('userId'))
      ? playLoad.userId : (withReset ? '' : state.userId)
    state.currentUserId = (playLoad.hasOwnProperty('currentUserId'))
      ? playLoad.currentUserId : (withReset ? '' : state.currentUserId)
    state.name = (playLoad.hasOwnProperty('name')) ? playLoad.name : (withReset ? '' : state.name)
    state.currentName = (playLoad.hasOwnProperty('currentName'))
      ? playLoad.currentName : (withReset ? '' : state.currentName)
    state.roles = (playLoad.hasOwnProperty('roles'))
      ? playLoad.roles : (withReset ? [] : state.roles)
    state.currentRol = (playLoad.hasOwnProperty('currentRol'))
      ? playLoad.currentRol : (withReset ? '' : state.currentRol)

    const cookieData = {
      token: state.token,
      userId: state.userId,
      currentUserId: state.currentUserId,
      name: state.name,
      currentName: state.currentName,
      roles: state.roles,
      currentRol: state.currentRol
    }

    VueCookie.set('session', JSON.stringify(cookieData), {
      path: '/',
      domain: cookieDomain,
      expires: '10Y',
      secure: secure
    })
  },
*/
  SESSION_RESET (state) {
    const env = config.env
    const cookieDomain = config[env].cookieDomain
    const secure = config[env].cookieSecure

    state.token = ''
    state.userId = ''
    state.currentUserId = ''
    state.name = ''
    state.currentName = ''
    state.roles = []
    state.currentRol = ''

    VueCookie.delete('session', {
      path: '/',
      domain: cookieDomain,
      secure: secure
    })

    VueCookie.delete('preferences', {
      path: '/',
      domain: cookieDomain,
      secure: secure
    })
  }
}

// async operations
const actions = {
  is_auth (context) {
    // TODO: Remove this fix in near future
    // NOTE: FIX PREVIOUS COOKIES
    // Removing cookies with domain app.mhfile.com
    VueCookie.delete('session', {
      path: '/',
      domain: 'app.mhfile.com',
      secure: true
    })
    VueCookie.delete('preferences', {
      path: '/',
      domain: 'app.mhfile.com',
      secure: true
    })

    const cookie = VueCookie.get('session')
    const session = (cookie) ? JSON.parse(cookie) : {}

    session.withReset = true
    context.commit('SESSION_UPDATE', session)

    return context.getters.SESSION_IS_AUTH
  },

  auth_login (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const url = apiRoot + config.apiSrvLogin
    const email = data.email || ''
    const password = data.password || ''

    const params = {
      'meta': {
        'origin': 'web'
      },
      'data': {
        'type': 'user',
        'attributes': {
          'email': email,
          'password': password
        }
      }
    }

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then(response => {
          const data = response.data || {}

          const meta = data.meta || {}
          const token = meta.token || ''

          const sessionData = data.data || {}
          const session = new Session()
          session.initWithData(sessionData)

          context.commit('SESSION_UPDATE', {
            token: token,
            userId: session.userId,
            currentUserId: session.userId,
            name: session.userName,
            currentName: session.userName,
            roles: session.roles,
            currentRol: session.getMaxRol()
          })

          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  auth_logout (context) {
    context.commit('SESSION_RESET')
  },

  auth_forgot (context, data = {}) {
    const env = config.env
    const root = config[env].root
    const apiRoot = config[env].apiRoot
    const callback = root + config[env].forgotCallback

    const url = apiRoot + config.apiSrvForgot
    const email = data.email || ''

    const params = {
      'meta': {
        'origin': 'web'
      },
      'data': {
        'type': 'user',
        'attributes': {
          'email': email,
          'callback': callback
        }
      }
    }

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then(response => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  auth_reset_valid (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const url = apiRoot + config.apiSrvResetValidate
    const email = data.email || ''
    const timestamp = data.timestamp || ''
    const hash = data.hash || ''

    const params = {
      'data': {
        'type': 'user',
        'attributes': {
          'email': email,
          'timestamp': timestamp,
          'hash': hash
        }
      }
    }

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then(response => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  auth_reset (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const url = apiRoot + config.apiSrvReset
    const email = data.email || ''
    const timestamp = data.timestamp || ''
    const hash = data.hash || ''
    const password = data.password || ''

    const params = {
      'data': {
        'type': 'user',
        'attributes': {
          'email': email,
          'timestamp': timestamp,
          'hash': hash,
          'password': password
        }
      }
    }

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then(response => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  auth_signin (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const url = apiRoot + config.apiSrvMe
    const avatarUrl = data.avatarUrl || null
    const firstName = data.firstName || ''
    const lastName = data.lastName || null
    const email = data.email || ''
    const password = data.password || ''
    const birthDate = data.birthDate || null
    const bornCountryAlpha2 = data.bornCountryAlpha2 || null
    const residenceCountryAlpha2 = data.residenceCountryAlpha2 || null
    const gender = data.gender || null
    const religionId = data.religionId || null
    const religionOther = data.religionOther || null
    const bloodId = data.bloodId || null
    const weight = data.weight || null
    const height = data.height || null
    const color = data.color || null
    const isDoctor = data.isDoctor || false
    const specialtyId = data.specialtyId || null
    const specialtyOther = data.specialtyOther || null
    const college = data.college || null
    const phone = data.phone || null
    const clinicPhone = data.clinicPhone || null
    const clinicAddress = data.clinicAddress || null

    const params = {
      'meta': {
        'origin': 'web'
      },
      'data': {
        'type': 'user',
        'attributes': {
          'first_name': firstName,
          'email': email,
          'password': password,
          'is_doctor': isDoctor
        }
      }
    }

    if (avatarUrl !== null) {
      params.data.attributes['avatar_url'] = avatarUrl
    }

    if (lastName !== null) {
      params.data.attributes['last_name'] = lastName
    }

    if (birthDate !== null) {
      params.data.attributes['birth_date'] = birthDate
    }

    if (bornCountryAlpha2 !== null) {
      params.data.attributes['born_country_alpha2'] = bornCountryAlpha2
    }

    if (residenceCountryAlpha2 !== null) {
      params.data.attributes['residence_country_alpha2'] = residenceCountryAlpha2
    }

    if (gender !== null) {
      params.data.attributes['gender'] = gender
    }

    if (religionId !== null) {
      params.data.attributes['religion_id'] = religionId
    }

    if (religionOther !== null) {
      params.data.attributes['religion_other'] = religionOther
    }

    if (bloodId !== null) {
      params.data.attributes['blood_id'] = bloodId
    }

    if (weight !== null) {
      params.data.attributes['weight'] = weight
    }

    if (height !== null) {
      params.data.attributes['height'] = height
    }

    if (color !== null) {
      params.data.attributes['color'] = color
    }

    if (specialtyId !== null) {
      params.data.attributes['specialty_id'] = specialtyId
    }

    if (specialtyOther !== null) {
      params.data.attributes['specialty_other'] = specialtyOther
    }

    if (college !== null) {
      params.data.attributes['college'] = college
    }

    if (phone !== null) {
      params.data.attributes['phone'] = phone
    }

    if (clinicPhone !== null) {
      params.data.attributes['clinic_phone'] = clinicPhone
    }

    if (clinicAddress !== null) {
      params.data.attributes['clinic_address'] = clinicAddress
    }

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then(response => {
          const data = response.data || {}

          const meta = data.meta || {}
          const token = meta.token || ''

          const sessionData = data.data || {}
          const session = new Session()
          session.initWithData(sessionData)

          context.commit('SESSION_UPDATE', {
            token: token,
            userId: session.userId,
            currentUserId: session.userId,
            name: session.userName,
            currentName: session.userName,
            roles: session.roles,
            currentRol: session.getMaxRol()
          })

          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
