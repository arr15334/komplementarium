<template>
  <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop">
            <!-- form -->
            <form>
              <div class="box" style="padding-top: 10%;">
                <h1 class="title">Datos del bebé</h1>
                <div class="box">
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
                  <date-chooser label="Fecha de nacimiento" v-model="birthdate"/>
                  <FormInput
                             type="number"
                             icon="user"
                             label="Peso"
                             place-holder="20"/>
                  <FormInput ref="firstfield"
                             type="number"
                             icon="user"
                             label="Altura"
                             place-holder="50"/>
                </div>

                <div style="margin-top: 30px;">
                  <button class="button is-primary"><span class="icon" style="margin-right: 2px;"> <font-awesome-icon icon="plus"/> </span> ¡Tengo otro bebé! </button>
                </div>
                <div class="field is-grouped is-grouped-centered">
                  <router-link :to="{name: 'Dashboard'}" class="button is-primary">¡Listo! </router-link>
                </div>

              </div>
            </form>

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
  import DateChooser from '@/components/common/DateChooser'
  export default {
    name: 'Signin',
    components: {
      FormInput,
      DateChooser,
      Loader,
      Logo
    },
    data () {
      return {
        firstName: null,
        birthdate: null,
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
