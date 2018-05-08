<template>
  <div>
    <div class="columns">
      <div class="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
        <!-- form -->
        <form @submit.prevent="submitForm" novalidate>
          <FormInput ref="firstfield"
                     type="text"
                     label="Altura (cm)"
                     place-holder="Ingrese la altura"
                     v-model="height"
                     :max-length="255"
                     :is-required="true"
                     :is-disabled="isSubmitting"
                     :is-success="heightIsSuccess"
                     :is-danger="heightIsDanger"
                     :error-msg="heightErrorMsg"/>

          <DateTimePicker
            label="Fecha/Hora de Medición"
            place-holder="Ingrese la fecha/hora de realizada la medición"
            help-msg="Nota: si no ingresa la fecha se tomará la fecha/hora actual"
            v-model="date"
            :is-disabled="isSubmitting"
            :is-success="dateIsSuccess"
            :is-danger="dateIsDanger"
            :error-msg="dateErrorMsg"/>

          <!-- operations -->
          <div class="content">
            <p>&nbsp;</p>
          </div>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <router-link class="button"
                           :to="{name: 'AdminMeasurementsHeightsHistory'}">
                <span>Cancelar</span>
              </router-link>

              <button type="submit" class="button is-primary"
                      :class="{'is-loading': isSubmitting}">
                <span>Agregar</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import validator from 'validator'

  import RedirectAuthMixin from '@/components/mixins/RedirectAuth'

  import FormInput from '@/components/common/FormInput'
  import DateTimePicker from '@/components/common/DateTimePicker.vue'

  export default {
    name: 'admin-measurements-heights-item',

    mixins: [
      RedirectAuthMixin
    ],

    components: {
      FormInput,
      DateTimePicker
    },

    data () {
      return {
        height: null,
        heightErrorMsg: null,
        date: null,
        dateErrorMsg: null,
        isSubmitting: false
      }
    },

    computed: {
      heightIsSet: function () {
        return (this.height !== null)
      },

      heightIsValid: function () {
        if (!this.heightIsSet || this.height.trim().length <= 0) {
          this.heightErrorMsg = 'Debe ingresar la altura'
          return false
        }

        if (!validator.isFloat(this.height)) {
          this.heightErrorMsg = 'Debe ingresar una altura valida (número real)'
          return false
        }

        this.heightErrorMsg = null
        return true
      },

      heightIsSuccess: function () {
        return (this.heightIsSet && this.heightIsValid)
      },

      heightIsDanger: function () {
        return (this.heightIsSet && !this.heightIsValid)
      },

      dateIsSet: function () {
        return (this.date !== null)
      },

      dateIsValid: function () {
        if (this.dateIsSet) {
          if (!moment(this.date).isValid()) {
            this.dateErrorMsg = 'Debe ingresar fecha/hora con formato valido'
            return false
          }
        }

        this.dateErrorMsg = null
        return true
      },

      dateIsSuccess: function () {
        return (this.dateIsSet && this.dateIsValid)
      },

      dateIsDanger: function () {
        return (this.dateIsSet && !this.dateIsValid)
      }
    },

    methods: {
      submitForm: function (e) {
        if (!this.validForm()) {
          e.preventDefault()
          this.firstFieldFocus()
          return
        }

        this.isSubmitting = true

        const data = {
          userId: this.$store.getters.SESSION_GET_USER_CURRENT_ID,
          height: this.height.trim()
        }

        if (this.dateIsSet && this.date.length > 0) {
          data.date = moment(this.date).format()
        }

        let dispatch = 'user_measurements_heights_item_add'

        return this
          .$store.dispatch(dispatch, data)
          .then(() => {
            this.isSubmitting = false
            this.$router.push({name: 'AdminMeasurementsHeightsHistory'})
          })
          .catch(err => {
            this.isSubmitting = false
            this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
      },

      validForm: function () {
        this.height = this.height || ''

        return this.heightIsValid
      },

      firstFieldFocus: function () {
        this.$refs.firstfield.$el.querySelector('input').focus()
      }
    },

    created: function () {
      this.redirectIfNotLogged({rolRequired: ['patient']})
    },

    mounted: function () {
      this.firstFieldFocus()
    }
  }
</script>

<style lang="scss" scoped></style>
