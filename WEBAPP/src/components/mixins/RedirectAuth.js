const RedirectAuthMixin = {
  methods: {
    redirectAuth: function () {
      return this
        .$store.dispatch('is_auth')
        .then(isAuth => {
          if (!isAuth) {
            this.$router.replace({name: 'Login'})
          } else {
            this.$router.replace({name: 'Page'})
          }
        })
    },

    redirectIfAlreadyLogged: function () {
      return this
        .$store.dispatch('is_auth')
        .then(isAuth => {
          if (isAuth) {
            this.$router.replace({name: 'Splash'})
          }
        })
    },

    redirectIfNotLogged: function (options = {}) {
      const rolRequired = options.rolRequired || []

      return this
        .$store.dispatch('is_auth')
        .then(isAuth => {
          if ((!isAuth) ||
            (rolRequired.length > 0 &&
              rolRequired.indexOf(this.$store.getters.SESSION_GET_USER_CURRENT_ROL) === -1)) {
            this.$router.replace({name: 'Splash'})
          }
        })
    },

    redirectLogout: function () {
      return this
        .$store.dispatch('auth_logout')
        .then(() => {
          this.$router.replace({name: 'Splash'})
        })
    }
  }
}

export default RedirectAuthMixin
