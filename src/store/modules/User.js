import config from '@/settings/config'
import api from '@/store/utils/api'

const state = {}

const getters = {}

const mutations = {}

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
          resolve(response.data)
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
