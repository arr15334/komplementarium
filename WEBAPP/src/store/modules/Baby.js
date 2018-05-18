import config from '@/settings/config'
import api from '@/store/utils/api'

const state = {}

const getters = {}

const mutations = {}

// async operations
const actions = {
  find_foods (context, data = {}) {
    const age = data.age || 0
    const env = config.env
    const apiRoot = config[env].apiRoot
    let url = apiRoot + '/food/months?month=' + age

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          const data = response.data || {}
          const food = data.food || []
          resolve(food)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  execute_query (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const query = data.sqlQuery || ''

    let url = apiRoot + config.apiQuery

    const params = {
      'sql_query': query
    }

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then(response => {
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
