<template>
        <div class="columns" v-show="!isLoading">
          <div class="column">
            <!-- form -->
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
                        <label class="label">Peso (lbs) </label>
                      </div>
                      <div class="field-body">
                          <p class="control">
                            <input class="input" type="number" placeholder="Peso"
                            v-model="weight"
                            v-bind:class="{'is-danger': weightIsDanger, 'is-success': weightIsSuccess}">
                          </p>
                          <!-- <p class="control">
                            <span class="select">
                              <select v-model="weightUnit">
                                <option>kg</option>
                                <option>lbs</option>
                              </select>
                            </span>
                          </p> -->
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

                <div class="field is-grouped is-grouped-centered" style="margin-top: 10px;">
                  <div class="control">
                    <button type="submit" class="button is-primary" v-on:click="submitForm">¡Listo!</button>
                    <router-link :to="{ name: 'All' }" class="button"> Cancelar </router-link>
                  </div>
                </div>

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
  import Moment from 'moment'

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
        babyId: null,
        firstName: null,
        birthdate: null,
        heightUnit: 'cm',
        weightUnit: 'kg',
        weight: null,
        height: null,
        gender: 'Seleccione el sexo del bebé',
        firstNameErrorMsg: null,
        babys: [],
        genders: [{
          value: 'X',
          text: 'Seleccione el sexo del bebé'
        },
        {
          value: 'M',
          text: 'Masculino'
        },
        {
          value: 'F',
          text: 'Femenino'
        }],
        isLoading: false,
        isSubmitting: false,
        isEdit: false
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
      getBaby: function () {
        return Promise.resolve()
          .then(() => {
            const params = this.$route.params || ''
            this.babyId = params.baby || null
            if (!this.babyId) {
              this.isEdit = false
              return
            }
            this.isEdit = true
            const data = {
              babyId: this.babyId
            }
            return this.$store.dispatch('get_baby', data)
              .then((baby) => {
                this.firstName = baby.name
                this.birthdate = Moment(baby.bornDate).format('DD MM YYYY')
                this.gender = baby.gender ? 'Masculino' : 'Femenino'
              })
          })
      },
      /*
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
          userId: this.$store.getters.SESSION_GET_USER_ID || this.$cookie.get('user_session')
        }
        let data = {
          userId: this.$store.getters.SESSION_GET_USER_ID || this.$cookie.get('user_session'),
          baby: baby
        }
        return this.$store.dispatch('baby_new', data)
          .then((resp) => {
            console.log(resp)
            this.firstName = ''
          })
      },
      */
      removeBaby: function (baby) {
        for (const b of this.babys) {
          if (b === baby) {
            this.babys.pop()
          }
        }
      },
      submitForm: function (e) {
        if (!this.validForm()) {
          e.preventDefault()
          return
        }
        let gender
        if (this.gender === 'Masculino') gender = 'M'
        else if (this.gender === 'Femenino') gender = 'F'
        else gender = 'X'

        const date = this.birthdate.split(' ')
        const day = date[0]
        const month = date[1]
        const year = date[2]
        const data = {
          babyId: this.babyId,
          userId: this.$store.getters.SESSION_GET_USER_ID || this.$cookie.get('user_session'),
          name: this.firstName,
          birthdate: Moment(year + '-' + month + '-' + day),
          gender: gender,
          weight: this.weight,
          height: this.height
        }
        let dispatch
        if (this.isEdit) dispatch = 'edit_baby'
        else dispatch = 'baby_new'
        console.log(data)

        return this.$store.dispatch(dispatch, data)
          .then((baby) => {
            this.$router.push({name: 'All'})
          })
          .catch(err => {
            console.log(err)
          })
      },

      validForm: function () {
        return true
      }
    },
    created: function () {
      this.isLoading = true
      return this.getBaby()
        .then(() => {
          this.isLoading = false
        })
    }
  }
</script>

<style lang="css">

</style>
