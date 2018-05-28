const config = {
  env: 'local',

  local: {
    domain: 'localhost',
    root: 'http://localhost:8080',
    apiRoot: 'http://localhost:3000',
    cookieDomain: 'localhost',
    cookieSecure: false,
    analytics: '',
    forgotCallback: '/#/reset'
  },

  deployment: {
    domain: 'localhost',
    root: 'http://localhost:8080',
    apiRoot: 'https://radiant-springs-64880.herokuapp.com',
    cookieDomain: 'localhost',
    cookieSecure: false,
    analytics: '',
    forgotCallback: '/#/reset'
  },

  apiLoginGoogle: '/login/google',
  apiRegister: '/register',
  apiLogin: '/login',
  apiBabies: '/babys/{babyId}',
  apiUserBabies: '/users/{userId}/babies',
  apiUserBabyHeights: '/users/{userId}/babies/{babyId}/heights',
  apiUserBabyWeights: '/users/{userId}/babies/{babyId}/weights'
}

export default config
