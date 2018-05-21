<template>
  <div class="card" style="overflow: hidden">
    <div class="card-header">
      <p class="card-header-title">{{ name }}</p>
    </div>

    <div class="card-image" v-show="!isLoading && !isAddMeasure">
      <BarChart :width="480" :height="320" :chart-data="chartData" :options="chartOptions"/>
    </div>

    <div class="card-content">
      <loader :is-loading="isLoading"/>

      <form @submit.prevent="submitForm" novalidate v-show="!isLoading && isAddMeasure">
        <FormInput ref="heightfield"
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

        <!-- operations -->
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <a class="button" @click="cancelAddMeasure" v-show="heights.length > 0">
              <span>Cancelar</span>
            </a>

            <button type="submit" class="button is-primary"
                    :class="{'is-loading': isSubmitting}">
              <span>Agregar</span>
            </button>
          </div>
        </div>
        <div class="content">
          <p>&nbsp;</p>
        </div>
      </form>
    </div>

    <div class="card-footer" v-show="!isLoading">
      <a @click="showContent" class="card-footer-item">
        <span class="icon has-text-black"><font-awesome-icon icon="eye" /></span>
      </a>

      <a @click="addMeasure" class="card-footer-item">
        <span class="icon has-text-black"><font-awesome-icon icon="plus-square" /></i></span>
      </a>
    </div>
  </div>
</template>

<script>
  import validator from 'validator'
  import moment from 'moment'
  import BarChart from '@/components/common/BarChart'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'

  export default {
    name: 'admin-measurements-height-card',

    components: {
      BarChart,
      FormInput,
      Loader
    },

    props: {
      name: {
        type: String,
        default: 'Altura'
      },
      measurementId: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'height'
      },
      babyId: {
        type: String,
        default: ''
      },
      onDashboard: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        isLoading: true,
        isAddMeasure: false,
        chartData: null,
        chartOptions: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        },
        height: null,
        heights: [],
        heightErrorMsg: null,
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

      babyIdIsSet: function () {
        if (this.babyId !== null) return this.babyId
        return false
      }
    },

    methods: {
      loadData: function () {
        this.isLoading = true

        return this
          .getHeights()
          .then(() => {
            this.isLoading = false
          })
          .catch(err => {
            this.isLoading = false
            console.log(err)
          })
      },

      getHeights: function () {
        const data = {
          userId: this.$store.getters.SESSION_GET_USER_ID || this.$cookie.get('user_session'),
          babyId: this.babyId
        }

        return this
          .$store.dispatch('baby_heights_get', data)
          .then((heights) => {
            if (heights.length > 0) {
              this.heights = heights
              this.isAddMeasure = false
              this.setChartData()
            } else {
              this.isAddMeasure = true
              this.chartData = null
            }
          })
      },

      setChartData: function () {
        const chartData = {
          labels: [],
          datasets: []
        }

        const data = []
        for (const height of this.heights) {
          const measure = height
          const date = measure.date || moment()
          chartData.labels.push(moment(date).format('D-M'))
          data.push(measure.height)
        }

        chartData.datasets.push(
          {
            label: this.name + '(cms)',
            data: data,
            backgroundColor: 'rgba(74, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        )

        this.chartData = chartData
      },

      showContent: function () {
        this.$router.push({name: 'AdminMeasurementsHeightsHistory', params: {baby: this.babyId}})
      },

      addMeasure: function () {
        this.isAddMeasure = true

        this.$nextTick()
          .then(() => {
            this.firstFieldFocus()
          })
      },

      cancelAddMeasure: function () {
        this.isAddMeasure = false
      },

      submitForm: function (e) {
        if (!this.validForm()) {
          e.preventDefault()
          this.firstFieldFocus()
          return
        }

        this.isSubmitting = true

        const data = {
          userId: this.$store.getters.SESSION_GET_USER_ID || this.$cookie.get('user_session'),
          babyId: this.babyId,
          height: this.height.trim()
        }

        let dispatch = 'baby_heights_item_add'

        return this
          .$store.dispatch(dispatch, data)
          .then(() => {
            this.height = null
            this.isSubmitting = false
            return this.loadData()
          })
          .catch(err => {
            this.isSubmitting = false
            console.log(err)
            // this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
      },

      validForm: function () {
        this.height = this.height || ''

        return this.heightIsValid
      },

      firstFieldFocus: function () {
        this.$refs.heightfield.$el.querySelector('input').focus()
      }
    },

    created: function () {
      console.log('creado')
      return this.loadData()
    }
  }
</script>

<style lang="scss" scoped></style>
