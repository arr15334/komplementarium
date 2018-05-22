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

  get_menu_today (context, data = {}) {
    const babyId = data.babyId || ''
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiBabies
    url = url.replace('{babyId}', babyId) + '/menu'

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          const data = response.data || {}
          const foods = data.data || {}
          resolve(foods)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  get_menu_andBaby (context, data = {}) {
    const babyId = data.babyId || ''
    const date = data.date || null
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiBabies
    url = url.replace('{babyId}', babyId) + '/babymenu'

    if (date) {
      url = url + '?date=' + date
    }

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          console.log(response)
          const data = response.data || {}
          const menu = data.menu
          const baby = data.baby
          resolve({menu: menu, baby: baby})
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  save_today_menu (context, data = {}) {
    const babyId = data.babyId || ''
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiBabies
    url = url.replace('{babyId}', babyId) + '/menu/today'

    const menu = data.menu || []
    const mealTime = data.mealTime || null

    const params = {
      'menu': menu,
      'mealTime': mealTime
    }

    return new Promise((resolve, reject) => {
      api.put(url, params)
        .then((response) => {
          const data = response.data || {}
          resolve(data)
        })
        .catch(err => reject(err))
    })
  },

  add_food_item (context, data = {}) {
    const babyId = data.babyId || ''
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiBabies
    url = url.replace('{babyId}', babyId) + '/menu/today'

    const food = data.food || []
    const mealTime = data.mealTime || ''

    const params = {
      'food': food,
      'mealTime': mealTime
    }

    return new Promise((resolve, reject) => {
      api.post(url, params)
        .then((response) => {
          const data = response.data || {}
          resolve(data)
        })
        .catch(err => reject(err))
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
  },
  delete_baby (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const babyId = data.babyId || ''

    let url = apiRoot + config.apiBabies
    url = url.replace('{babyId}', babyId)

    return new Promise((resolve, reject) => {
      api.delete(url)
        .then((response) => {
          const data = response.data || {}
          resolve(data)
        })
        .catch(err => reject(err))
    })
  },

  get_baby_heights (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const babyId = data.babyId || ''
    const offset = data.pageNumber || null

    let url = apiRoot + config.apiBabies
    url = url.replace('{babyId}', babyId) + '/heights'

    if (offset) {
      url = url + '?page=' + offset
    }

    return new Promise((resolve, reject) => {
      api.get(url)
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
