<template>
  <div>
    <div class="columns">
      <div class="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
        <!-- form -->
        <form @submit.prevent="submitForm" novalidate>
          <FormInput ref="firstfield"
                     type="text"
                     label="Peso (lb)"
                     place-holder="Ingrese el peso"
                     v-model="weight"
                     :max-length="255"
                     :is-required="true"
                     :is-disabled="isSubmitting"
                     :is-success="weightIsSuccess"
                     :is-danger="weightIsDanger"
                     :error-msg="weightErrorMsg"/>

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
                           :to="{name: 'AdminMeasurementsWeightsHistory'}">
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
    name: 'admin-measurements-weights-item',

    mixins: [
      RedirectAuthMixin
    ],

    components: {
      FormInput,
      DateTimePicker
    },

    data () {
      return {
        weight: null,
        weightErrorMsg: null,
        date: null,
        dateErrorMsg: null,
        isSubmitting: false
      }
    },

    computed: {
      weightIsSet: function () {
        return (this.weight !== null)
      },

      weightIsValid: function () {
        if (!this.weightIsSet || this.weight.trim().length <= 0) {
          this.weightErrorMsg = 'Debe ingresar el peso'
          return false
        }

        if (!validator.isFloat(this.weight)) {
          this.weightErrorMsg = 'Debe ingresar un peso valido (número real)'
          return false
        }

        this.weightErrorMsg = null
        return true
      },

      weightIsSuccess: function () {
        return (this.weightIsSet && this.weightIsValid)
      },

      weightIsDanger: function () {
        return (this.weightIsSet && !this.weightIsValid)
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
          weight: this.weight.trim()
        }

        if (this.dateIsSet && this.date.length > 0) {
          data.date = moment(this.date).format()
        }

        let dispatch = 'user_measurements_weights_item_add'

        return this
          .$store.dispatch(dispatch, data)
          .then(() => {
            this.isSubmitting = false
            this.$router.push({name: 'AdminMeasurementsWeightsHistory'})
          })
          .catch(err => {
            this.isSubmitting = false
            this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
      },

      validForm: function () {
        this.weight = this.weight || ''

        return this.weightIsValid
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
