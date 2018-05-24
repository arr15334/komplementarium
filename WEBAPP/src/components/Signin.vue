<template>
  <section class="hero is-fullheight">
    <div class="hero-head" v-show="!isLoading">
      <div class="container">
        <!-- logo -->
        <Logo/>
      </div>
    </div>

    <div class="hero-body" v-show="!isLoading">
      <div class="container">
        <div class="columns">
          <div class="column is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop">
            <div class="notification is-danger" v-show="showBadLogin">
              Credenciales inválidas. Inténtelo nuevamente.
            </div>
            <!-- form -->
            <form @submit.prevent="submitForm" novalidate>
              <div class="box signinbox">
                <div class="field zenter">
                  <label class="label">Correo electrónico</label>
                  <div class="field-body">
                    <div class="field">
                      <p class="control has-icons-left">
                        <input type="text"
                              class="input"
                              placeholder="Correo"
                              v-model="email"
                              v-bind:class="{'is-danger': emailIsDanger, 'is-success': emailIsSuccess}">
                        <span class="icon is-small is-left"><font-awesome-icon icon="envelope" /></span>
                      </p>
                      <p v-show="emailIsDanger" class="help is-danger"> {{ emailErrorMsg }} </p>
                    </div>
                  </div>
                </div>

                <div class="field zenter">
                  <label class="label">Constraseña</label>
                  <div class="field-body">
                    <div class="field">
                      <p class="control has-icons-left">
                        <input type="password"
                              class="input"
                              v-model="password"
                              placeholder="Contraseña">
                        <span class="icon is-small is-left"><font-awesome-icon icon="unlock" /></span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="field is-grouped is-grouped-centered" style="margin-top: 30px;">
                  <button type="submit"
                          class="button is-info"
                          :class="{'is-loading': isSubmitting}"
                          v-on:click="">Iniciar sesión
                  </button>
                </div>

              </div>
              <div class="field is-grouped is-grouped-centered">
                <div class="control">
                  <!--
                  <button id="fb_btn" class="button" v-on:click="facebookLogin()" target="_blank">
                    Ingresa con  <span class="icon" style="margin-left: 2px;"> <font-awesome-icon :icon="['fab', 'facebook-square']"/> </span>
                  </button>
                  -->
                  <router-link id="google_btn" class="button"
                  :disabled="true"
                  :to="{name: 'Dashboard'}">
                  Ingresa con  <span class="icon" style="margin-left: 2px;"> <font-awesome-icon :icon="['fab', 'google']"/> </span>
                  </router-link>
                </div>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <div class="control">
                  <a href="/#/register">¿No tienes cuenta? ¡Regístrate!</a>
                </div>
              </div>
            </form>

        </div>
      </div>
    </div>
  </div>
    <loader :is-loading="isLoading"/>
    <div class="hero-foot">
      <footer class="footer">
        <div class="container is-fluid">
          <div class="content has-text-centered">
            <p>
              _komplementarium 2018 |
              <router-link :to="{name: ''}">T&eacute;rminos y Condiciones</router-link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  </section>
</template>

<script>
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import Validator from 'validator'
  import Logo from '@/components/common/Logo'
  export default {
    name: 'Signin',
    components: {
      FormInput,
      Loader,
      Logo
    },
    data () {
      return {
        email: null,
        password: null,
        emailErrorMsg: null,
        isLoading: false,
        isSubmitting: false,
        showBadLogin: false
      }
    },
    computed: {
      emailIsSet: function () {
        return (this.email !== null)
      },

      emailIsValid: function () {
        if (!this.emailIsSet || !Validator.isEmail(this.email)) {
          this.emailErrorMsg = 'Debe ingresar un correo válido'
          return false
        }
        return true
      },

      emailIsSuccess: function () {
        return (this.emailIsSet && this.emailIsValid)
      },

      emailIsDanger: function () {
        return (this.emailIsSet && !this.emailIsValid)
      }
    },

    methods: {
      facebookLogin: function () {
        console.log('entro')
        return this
          .$store.dispatch('login_fb')
          .then((response) => {
            console.log(response)
          })
      },
      checkIfLoggedIn: function () {
        const userId = this.$cookie.get('user_session') || null
        return userId
      },
      submitForm: function (e) {
        if (!this.validForm()) {
          e.preventDefault()
          return
        }
        const data = {
          email: this.email,
          password: this.password
        }
        return this
          .$store.dispatch('login_local', data)
          .then((response) => {
            if (response.success) {
              this.$cookie.set('user_session', response.user._id)
              this.$router.push({name: 'Dashboard'})
            } else {
              this.showBadLogin = true
            }
          })
          .catch(err => {
            throw err
          })
      },
      validForm: function () {
        return true
      }
    },
    created: function () {
      const userId = this.checkIfLoggedIn()
      if (userId) {
        this.$router.push({name: 'Dashboard'})
      }
    }
  }
</script>

<style lang="css">
#fb_btn {
  background-color: #3b579d;
  color: #fff;
}
#google_btn {
  background-color: #dd381d;
  color: #fff;
}

.signinbox {
  background-color: rgba(30, 150, 250, 0.25);
  color: white;
}

.zenter {
  width: 68%;
  margin: 2% auto;
}
</style>
