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
        heights: [],
        isAddMeasure: false,
        chartData: null,
        chartOptions: {
          responsive: true,
          maintainAspectRatio: true
        },
        height: null,
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
            this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
      },

      getHeights: function () {
        const data = {
          userId: this.$store.getters.SESSION_GET_USER_CURRENT_ID
        }

        return this
          .$store.dispatch('user_measurements_heights_get', data)
          .then(userHeights => {
            this.heights = userHeights.data || []

            if (this.heights.length > 0) {
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
        for (let i = this.heights.length - 1; i >= 0; i--) {
          const measure = this.heights[i]
          chartData.labels.push(measure.date.format('D-M'))
          data.push(measure.height)
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
        this.$router.push({name: 'AdminMeasurementsHeightsHistory'})
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
          height: this.height.trim()
        }

        let dispatch = 'user_measurements_heights_item_add'

        return this
          .$store.dispatch(dispatch, data)
          .then(() => {
            this.height = null
            this.isSubmitting = false
            return this.loadData()
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
        this.$refs.heightfield.$el.querySelector('input').focus()
      }
    },

    created: function () {
      return this.loadData()
    }
  }
</script>

<style lang="scss" scoped></style>
