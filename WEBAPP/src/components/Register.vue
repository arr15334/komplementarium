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
            <!-- form -->
            <form @submit.prevent="submitForm" novalidate>
              <div class="box signinbox">

                <!-- Nombre -->
                <div class="field zenter">
                  <label class="label">Nombre</label>
                  <div class="field-body">
                    <div class="field">
                      <p class="control has-icons-left has-icons-right">
                        <input type="text"
                              class="input"
                              placeholder="Nombre"
                              v-model="firstName"
                              v-bind:class="{'is-danger': firstNameIsDanger, 'is-success': firstNameIsSuccess}">
                        <span class="icon is-small is-left"><font-awesome-icon icon="user" /></span>
                        <span class="icon is-small is-right" v-if="firstNameIsSuccess">
                          <font-awesome-icon icon="check"/>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Apellido -->
                <div class="field zenter">
                  <label class="label">Apellido</label>
                  <div class="field-body">
                    <div class="field">
                      <p class="control has-icons-left">
                        <input type="text"
                              class="input"
                              placeholder="Nombre"
                              v-model="lastName"
                              v-bind:class="{'is-success': lastNameIsSuccess}">
                        <span class="icon is-small is-left"><font-awesome-icon icon="user" /></span>
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Correo -->
                <div class="field zenter">
                  <label class="label">Correo electrónico</label>
                  <div class="field-body">
                    <div class="field">
                      <p class="control has-icons-left has-icons-right">
                        <input type="text"
                              class="input"
                              placeholder="Correo"
                              v-model="email"
                              v-bind:class="{'is-danger': emailIsDanger, 'is-success': emailIsSuccess}">
                        <span class="icon is-small is-left"><font-awesome-icon icon="envelope" /></span>
                        <span class="icon is-small is-right" v-if="emailIsSuccess">
                          <font-awesome-icon icon="check"/>
                        </span>
                      </p>
                      <p v-show="emailIsDanger" class="help is-danger"> {{ emailErrorMsg }} </p>
                    </div>
                  </div>
                </div>

                <!-- Constraseña -->
                <div class="field zenter">
                  <label class="label">Constraseña</label>
                  <div class="field-body">
                    <div class="field">
                      <p class="control has-icons-left">
                        <input type="password"
                              class="input"
                              placeholder="Contraseña"
                              v-bind:class="{'is-danger': passwordIsDanger, 'is-success': passwordIsSuccess}"
                              v-model="password">
                        <span class="icon is-small is-left"><font-awesome-icon icon="unlock" /></span>
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Validar constraseña -->
                <div class="field zenter">
                  <label class="label">Validar constraseña</label>
                  <div class="field-body">
                    <div class="field">
                      <p class="control has-icons-left">
                        <input type="password"
                              class="input"
                              v-bind:class="{'is-danger': passwordValidateIsDanger, 'is-success': passwordValidateIsSuccess}"
                              placeholder="Ingrese su contraseña nuevamente"
                              v-model="passwordValidate">
                        <span class="icon is-small is-left"><font-awesome-icon icon="unlock" /></span>
                      </p>
                    </div>
                  </div>
                  <p v-show="passwordValidateIsDanger" class="help is-danger"> {{ passwordValidateErrMsg }} </p>
                </div>

                <div class="field is-grouped is-grouped-centered" style="margin-top: 30px;">
                  <button type="submit"
                          class="button is-primary"
                          :class="{'is-loading': isSubmitting}"
                          v-on:click="">Registrarme
                  </button>
                </div>
              </div>
            </form>

        </div>
      </div>
    </div>
  </div>
    <loader :is-loading="isLoading"/>
  </section>
</template>

<script>
  import Validator from 'validator'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import Logo from '@/components/common/Logo'
  export default {
    name: 'Register',
    components: {
      FormInput,
      Loader,
      Logo
    },
    data () {
      return {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        passwordValidate: null,
        firstNameErrorMsg: null,
        emailErrorMsg: null,
        passwordValidateErrMsg: null,
        isLoading: false,
        isSubmitting: false
      }
    },
    computed: {
      firstNameIsSet: function () {
        return (this.firstName !== null)
      },
      firstNameIsValid: function () {
        if (!this.firstNameIsSet || this.firstName.trim().length <= 0) {
          this.firstNameErrorMsg = 'Debe ingresar su nombre'
          return false
        }
        this.firstNameErrorMsg = null
        return true
      },
      firstNameIsSuccess: function () {
        return (this.firstNameIsSet && this.firstNameIsValid)
      },
      firstNameIsDanger: function () {
        return (this.firstNameIsSet && !this.firstNameIsValid)
      },
      lastNameIsSet: function () {
        return (this.lastName !== null)
      },
      lastNameIsValid: function () {
        if (!this.lastNameIsSet || this.lastName.trim().length <= 0) {
          return false
        }
        return true
      },
      lastNameIsSuccess: function () {
        return (this.lastNameIsSet && this.lastNameIsValid)
      },
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
      },
      passwordIsSet: function () {
        return (this.password !== null)
      },
      passwordIsValid: function () {
        if (!this.passwordIsSet || this.password.trim().length <= 0) {
          return false
        }
        return true
      },
      passwordIsSuccess: function () {
        return (this.passwordIsSet && this.passwordIsValid)
      },
      passwordIsDanger: function () {
        return (this.passwordIsSet && !this.passwordIsValid)
      },
      passwordValidateIsSet: function () {
        return (this.passwordValidate !== null)
      },
      passwordValidateIsValid: function () {
        if (!this.passwordValidateIsSet || this.passwordValidate.trim().length <= 0) {
          this.passwordValidateErrMsg = 'Las contraseñas no coinciden'
          return false
        }
        if (this.password !== this.passwordValidate) {
          this.passwordValidateErrMsg = 'Las contraseñas no coinciden'
          return false
        }
        return true
      },
      passwordValidateIsSuccess: function () {
        return (this.passwordValidateIsSet && this.passwordValidateIsValid)
      },
      passwordValidateIsDanger: function () {
        return (this.passwordValidateIsSet && !this.passwordValidateIsValid)
      }
    },

    methods: {
      submitForm: function (e) {
        if (!this.validForm()) {
          e.preventDefault()
          return
        }
        const data = {
          firstName: this.firstName,
          email: this.email,
          password: this.password
        }
        if (this.lastNameIsSet) {
          data.lastName = this.lastName
        }

        return this
          .$store.dispatch('register', data)
          .then((response) => {
            console.log(response)
            this.$router.push({name: 'Page'})
          })
          .catch(err => {
            throw err
          })
      },
      validForm: function () {
        return true
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

.zenter {
  width: 68%;
  margin: 2% auto;
}
</style>
