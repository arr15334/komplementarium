<template>
        <div class="columns" v-show="!isLoading">
          <div class="column">
            <!-- form -->
            <form>
              <div class="box" style="padding-top: 5%;">
                <h1 class="title">Ingrese los datos de su bebé</h1>
                <form @submit.prevent="submitForm" novalidate>
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

                    <div class="field is-horizontal">
                      <div class="field-label is-small">
                        <label class="label">Sexo</label>
                      </div>
                      <div class="field-body">
                        <div class="control has-icons-left">
                          <div class="select">
                            <select v-model="gender">
                              <option selected>Indique el sexo del bebé</option>
                              <option v-for="sex in genders"> {{ sex.text }}</option>
                            </select>
                          </div>
                          <div class="icon is-small is-left">
                            <font-awesome-icon icon="venus-mars"/>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div class="field is-horizontal has-addons">
                      <div class="field-label is-small">
                        <label class="label">Peso</label>
                      </div>
                      <div class="field-body">
                          <p class="control">
                            <input class="input" type="number" placeholder="Peso"
                            v-model="weight"
                            v-bind:class="{'is-danger': weightIsDanger, 'is-success': weightIsSuccess}">
                          </p>
                          <p class="control">
                            <span class="select">
                              <select v-model="weightUnit">
                                <option>kg</option>
                                <option>lbs</option>
                              </select>
                            </span>
                          </p>
                      </div>
                    </div>

                    <div class="field is-horizontal has-addons">
                      <div class="field-label is-small">
                        <label class="label">Altura</label>
                      </div>
                      <div class="field-body">

                          <p class="control">
                            <input class="input" type="number" placeholder="Altura"
                            v-model="height"
                            v-bind:class="{'is-danger': heightIsDanger, 'is-success': heightIsSuccess}">
                          </p>
                          <p class="control">
                            <span class="select">
                              <select v-model="heightUnit">
                                <option>cm</option>
                                <option>ft</option>
                              </select>
                            </span>
                          </p>
                      </div>
                    </div>
                  </div>
                </form>

                <span class="tag is-success" v-for="baby in babys"> {{ baby.name }}
                  <button class="delete is-small" v-on:click="removeBaby(baby)"></button> </span>
                <div style="margin-top: 30px;">
                  <button class="button is-primary" v-on:click="addBaby">
                    <span class="icon" style="margin-right: 2px;"> <font-awesome-icon icon="plus"/> </span>
                     Agregar </button>
                </div>
                <div class="field is-grouped is-grouped-centered">
                  <div class="control">
                    <button type="submit" class="button is-primary" v-on:click="submitForm">¡Listo!</button>
                  </div>
                </div>

              </div>
            </form>

        </div>
        <loader :is-loading="isLoading"/>
      </div>

</template>

<script>
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import Logo from '@/components/common/Logo'
  import DateChooser from '@/components/common/DateChooser'
  import FormSelectWithSearch from '@/components/common/FormSelectWithSearch'

  import Validator from 'validator'
  export default {
    name: 'BabyNew',
    components: {
      FormInput,
      DateChooser,
      FormSelectWithSearch,
      Loader,
      Logo
    },
    data () {
      return {
        firstName: null,
        birthdate: null,
        heightUnit: 'cm',
        weightUnit: 'kg',
        weight: null,
        height: null,
        gender: null,
        firstNameErrorMsg: null,
        babys: [],
        genders: [],
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
      },

      weightIsSet: function () {
        return this.weight !== null
      },

      weightIsValid: function () {
        const weightString = this.weight + ''
        return Validator.isNumeric(weightString) && (this.weight > 0)
      },

      weightIsSuccess: function () {
        return (this.weightIsSet && this.weightIsValid)
      },

      weightIsDanger: function () {
        return (this.weightIsSet && !this.weightIsValid)
      },

      heightIsSet: function () {
        return this.height !== null
      },

      heightIsValid: function () {
        const heightString = this.height + ''
        return Validator.isNumeric(heightString) && (this.height > 0)
      },

      heightIsSuccess: function () {
        return (this.heightIsSet && this.heightIsValid)
      },

      heightIsDanger: function () {
        return (this.heightIsSet && !this.heightIsValid)
      }
    },
    methods: {
      addBaby: function () {
        const firstName = this.firstName || ''
        const bornDate = this.birthdate
        const weight = this.weight * 1
        const height = this.height * 1
        const gender = this.gender + ''
        const baby = {
          name: firstName,
          bornDate: bornDate,
          weight: weight * 1,
          height: height * 1,
          gender: gender + '',
          userId: this.$store.getters.SESSION_GET_USER_ID
        }
        let data = {
          userId: this.$store.getters.SESSION_GET_USER_ID,
          baby: baby
        }
        return this.$store.dispatch('baby_new', data)
          .then((resp) => {
            console.log(resp)
            this.firstName = ''
          })
      },
      removeBaby: function (baby) {
        for (const b of this.babys) {
          if (b === baby) {
            this.babys.pop()
          }
        }
      },
      getGenders: function () {
        this.genders = [
          {
            value: 'M',
            text: 'Masculino'
          },
          {
            value: 'F',
            text: 'Femenino'
          }
        ]
      },
      submitForm: function (e) {
        if (!this.validForm()) {
          e.preventDefault()
          return
        }
        for (const baby of this.babys) {
          let data = {
            userId: this.$store.getters.SESSION_GET_USER_ID,
            baby: baby
          }
          return this.$store.dispatch('baby_new', data)
        }
      },

      validForm: function () {
        return true
      }
    },
    created: function () {
      return this.getGenders()
    }
  }
</script>

<style lang="css">

</style>
