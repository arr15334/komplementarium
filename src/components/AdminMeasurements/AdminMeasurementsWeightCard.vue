<template>
  <div class="card" style="overflow: hidden">
    <div class="card-header">
      <p class="card-header-title">{{ name }}</p>

      <a @click="toggleFavorite" class="card-header-icon" v-show="!onDashboard">
                <span class="icon">
                    <i class="fa fa-star-o" v-if="!favorite"></i>
                    <i class="fa fa-star" v-else></i>
                </span>
      </a>
    </div>

    <div class="card-image" v-show="!isLoading && !isAddMeasure">
      <LineChart :width="480" :height="320" :chart-data="chartData" :options="chartOptions"/>
    </div>

    <div class="card-content">
      <loader :is-loading="isLoading"/>

      <form @submit.prevent="submitForm" novalidate v-show="!isLoading && isAddMeasure">
        <FormInput ref="weightfield"
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

        <!-- operations -->
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <a class="button" @click="cancelAddMeasure" v-show="weights.length > 0">
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
      <a @click="removeCard" class="card-footer-item" v-show="!onDashboard">
        <span class="icon has-text-black"><i class="fa fa-lg fa-minus"></i></span>
      </a>

      <a @click="showContent" class="card-footer-item">
        <span class="icon has-text-black"><i class="fa fa-lg fa-eye"></i></span>
      </a>

      <a @click="addMeasure" class="card-footer-item">
        <span class="icon has-text-black"><i class="fa fa-lg fa-plus-circle"></i></span>
      </a>
    </div>
  </div>
</template>

<script>
  import validator from 'validator'

  import LineChart from '@/components/common/LineChart'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'

  export default {
    name: 'admin-measurements-weight-card',

    components: {
      LineChart,
      FormInput,
      Loader
    },

    props: {
      name: {
        type: String,
        default: 'Peso'
      },
      measurementId: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'weight'
      },
      favorite: {
        type: Boolean,
        default: false
      },
      onDashboard: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        isLoading: true,
        weights: [],
        isAddMeasure: false,
        chartData: null,
        chartOptions: {
          responsive: true,
          maintainAspectRatio: true
        },
        weight: null,
        weightErrorMsg: null,
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
      }
    },

    methods: {
      loadData: function () {
        this.isLoading = true

        return this
          .getWeights()
          .then(() => {
            this.isLoading = false
          })
          .catch(err => {
            this.isLoading = false
            this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
      },

      getWeights: function () {
        const data = {
          userId: this.$store.getters.SESSION_GET_USER_CURRENT_ID
        }

        return this
          .$store.dispatch('user_measurements_weights_get', data)
          .then(userWeights => {
            this.weights = userWeights.data || []

            if (this.weights.length > 0) {
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
        for (let i = this.weights.length - 1; i >= 0; i--) {
          const measure = this.weights[i]
          chartData.labels.push(measure.date.format('D-M'))
          data.push(measure.weight)
        }

        chartData.datasets.push(
          {
            label: this.name,
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        )

        this.chartData = chartData
      },

      toggleFavorite: function () {
        this.$emit('toggleFavorite', this.measurementId, this.favorite)
      },

      removeCard: function () {
        this.$emit('removeCard', this.measurementId)
      },

      showContent: function () {
        this.$router.push({name: 'AdminMeasurementsWeightsHistory'})
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
          userId: this.$store.getters.SESSION_GET_USER_CURRENT_ID,
          weight: this.weight.trim()
        }

        let dispatch = 'user_measurements_weights_item_add'

        return this
          .$store.dispatch(dispatch, data)
          .then(() => {
            this.weight = null
            this.isSubmitting = false
            return this.loadData()
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
        this.$refs.weightfield.$el.querySelector('input').focus()
      }
    },

    created: function () {
      return this.loadData()
    }
  }
</script>

<style lang="scss" scoped></style>
