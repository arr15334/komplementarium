import config from '@/settings/config'
import api from '@/store/utils/api'
import Baby from '@/store/models/Baby'

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

  get_baby (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const babyId = data.babyId || ''
    let url = apiRoot + config.apiBabies
    url = url.replace('{babyId}', babyId)

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          const data = response.data
          let baby = new Baby()
          baby.initWithData(data)
          resolve(baby)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  edit_baby (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const babyId = data.babyId || ''
    let url = apiRoot + config.apiBabies
    url = url.replace('{babyId}', babyId)

    const name = data.name || ''
    const birthdate = data.birthdate || ''
    const gender = data.gender || 'M'

    let params = {
      'name': name,
      'birthdate': birthdate,
      'gender': gender
    }

    return new Promise((resolve, reject) => {
      api.put(url, params)
        .then((response) => {
          const data = response.data || {}
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
