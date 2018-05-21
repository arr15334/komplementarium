import config from '@/settings/config'
import api from '@/store/utils/api'
import Baby from '@/store/models/Baby'

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
          const responseData = response.data
          if (responseData.success) {
            const userId = response.data.user._id
            context.commit('SESSION_UPDATE', {
              userId: userId
            })
          }
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
          // console.log(response)
          const data = response.data || {}
          const userData = data.user || {}
          // const babies = userData.babies || []
          let babies = []
          for (const babyData of userData.babies) {
            let newBaby = new Baby()
            newBaby.initWithData(babyData)
            babies.push(newBaby)
          }
          resolve(babies)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  baby_new (context, baby = {}) {
    const name = baby.name || ''
    const gender = baby.gender || ''
    const weight = baby.weight || ''
    const height = baby.height || ''
    const birthdate = baby.birthdate || ''
    console.log(baby)
    const env = config.env
    const apiRoot = config[env].apiRoot

    const userId = baby.userId

    let url = apiRoot + config.apiUserBabies
    url = url.replace('{userId}', userId)
    console.log(url)
    const params = {
      'data': {
        'name': name,
        'gender': gender,
        'weight': weight,
        'height': height,
        'bornDate': birthdate
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
  },
  baby_heights_get (context, data = {}) {
    const userId = data.userId || ''
    const babyId = data.babyId || ''

    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiUserBabyHeights
    url = url.replace('{userId}', userId)
    url = url.replace('{babyId}', babyId)
    console.log(url)
    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          console.log(response)
          const resData = response.data || {}
          const heights = resData.heights || []
          resolve(heights)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  user_measurements_weights_get (context, data = {}) {
    const userId = data.userId || ''
    const babyId = data.babyId || ''

    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiUserBabyWeights
    url = url.replace('{userId}', userId)
    url = url.replace('{babyId}', babyId)
    console.log(url)
    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          console.log(response)
          const resData = response.data || {}
          const weights = resData.weights || []
          resolve(weights)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  baby_weights_add (context, data = {}) {
    const userId = data.userId || ''
    const babyId = data.babyId || ''
    const weightMeasure = data.weight || ''

    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiUserBabyWeights
    url = url.replace('{userId}', userId)
    url = url.replace('{babyId}', babyId)

    const params = {
      'data': {
        'weight_measurement': weightMeasure
      }
    }
    console.log(url)
    return new Promise((resolve, reject) => {
      api.post(url, params)
        .then((response) => {
          console.log(response)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  baby_heights_item_add (context, data = {}) {
    const userId = data.userId || ''
    const babyId = data.babyId || ''
    const heightMeasurement = data.height || 0

    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiUserBabyHeights
    url = url.replace('{userId}', userId)
    url = url.replace('{babyId}', babyId)
    console.log(url)
    const params = {
      'data': {
        'height_measurement': heightMeasurement
      }
    }

    return new Promise((resolve, reject) => {
      api.post(url, params)
        .then((resp) => {
          console.log(resp)
          resolve()
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
