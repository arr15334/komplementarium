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
            <form>
              <div class="box" style="padding-top: 10%;">
                <FormInput ref="firstfield"
                           type="text"
                           icon="user"
                           label="Nombre"
                           place-holder="Nombres"
                           v-model="firstName"
                           :max-length="255"
                           :is-required="true"
                           :is-success="firstNameIsSuccess"
                           :is-danger="firstNameIsDanger"
                           :error-msg="firstNameErrorMsg"/>
                <FormInput type="password"
                        icon="user"
                        label="Contraseña"
                        place-holder="Nombres"
                        v-model="password"
                        :max-length="255"
                        :is-required="true"
                        :is-success="firstNameIsSuccess"
                        :is-danger="firstNameIsDanger"
                        :error-msg="firstNameErrorMsg"/>
                <div class="field is-grouped is-grouped-centered" style="margin-top: 30px;">
                  <router-link class="button is-primary"
                  :disabled="isSubmitting"
                  :to="{name: 'BabyNew'}">
                  Iniciar sesión
                  </router-link>
                </div>

              </div>
              <div class="field is-grouped is-grouped-centered">
                <div class="control">
                  <router-link id="fb_btn" class="button"
                  :disabled="isSubmitting"
                  :to="{name: 'Dashboard'}">
                  Ingresa con  <span class="icon" style="margin-left: 2px;"> <font-awesome-icon :icon="['fab', 'facebook-square']"/> </span>
                  </router-link>

                  <router-link id="google_btn" class="button"
                  :disabled="isSubmitting"
                  :to="{name: 'Dashboard'}">
                  Ingresa con  <span class="icon" style="margin-left: 2px;"> <font-awesome-icon :icon="['fab', 'google']"/> </span>
                  </router-link>
                </div>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <div class="control">
                  <button type="submit" class="button is-primary"
                  :class="{'is-loading': isSubmitting}">
                    Regístrate
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
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
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
        firstName: null,
        password: null,
        firstNameErrorMsg: null,
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
          this.firstNameErrorMsg = 'Debe ingresar sus nombres'
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
</style>
