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

  apiLoginGoogle: '/login/google',
  apiRegister: '/register',
  apiLogin: '/login',
  apiUserBabies: '/users/{userId}/babies',
  apiUserBabyHeights: '/users/{userId}/babies/{babyId}/heights',
  apiUserBabyWeights: '/users/{userId}/babies/{babyId}/weights'
}

export default config