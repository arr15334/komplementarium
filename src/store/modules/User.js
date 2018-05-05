import config from '@/settings/config'
import api from '@/store/utils/api'

const state = {
  userId: ''
}

const getters = {
  SESSION_GET_USER_ID: function (state) {
    return state.userId
  }
}

const mutations = {
  SESSION_UPDATE (state, playLoad = {}) {
    state.userId = (playLoad.hasOwnProperty('userId')) ? playLoad.userId : ''
  }
}

// async operations
const actions = {
  login_fb (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiLoginGoogle
    return new Promise((resolve, reject) => {
      api
        .get(url)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  register (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiRegister

    const firstName = data.firstName || null
    const lastName = data.lastName || null
    const email = data.email || null
    const password = data.password || null

    const params = {
      'data': {
        'type': 'register',
        'attributes': {
          'first_name': firstName,
          'last_name': lastName,
          'email': email,
          'password': password
        }
      }
    }

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then((response) => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  login_local (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiLogin

    const email = data.email || null
    const password = data.password || null

    const params = {
      'username': email,
      'password': password
    }

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then((response) => {
          const userId = response.data.user._id
          context.commit('SESSION_UPDATE', {
            userId: userId
          })
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  babies_get (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const userId = data.userId || ''

    let url = apiRoot + config.apiUserBabies
    url = url.replace('{userId}', userId)

    return new Promise((resolve, reject) => {
      api
        .get(url)
        .then((response) => {
          const data = response.data || {}
          const userData = data.user || {}
          const babies = userData.babies || []
          resolve(babies)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  baby_new (context, data = {}) {
    const baby = data.baby || {}
    const name = baby.name || ''
    const gender = baby.gender || ''
    const weight = baby.weight || ''
    const height = baby.height || ''
    const birthdate = baby.bornDate || ''
    console.log(data)
    const env = config.env
    const apiRoot = config[env].apiRoot

    const userId = data.userId || baby.userId

    let url = apiRoot + config.apiUserBabies
    url = url.replace('{userId}', userId)
    console.log(url)
    const params = {
      'data': {
        'name': name,
        'gender': gender,
        'weight': weight,
        'height': height,
        'bornDate': new Date(birthdate)
      }
    }

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then((response) => {
          console.log(response)
          resolve(response)
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
