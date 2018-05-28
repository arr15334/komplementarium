<template>
  <div>
    <!-- global operations -->
    <div v-show="!isLoading" class="field is-grouped">
      <!-- add -->
      <!-- <p class="control">
        <router-link class="button is-primary"
                     :to="{name: 'AdminMeasurementsHeightsItem'}">
                    <span class="icon">
                        <font-awesome-icon icon="plus-  circle"/>
                    </span>
          <span>Agregar</span>
        </router-link>
      </p> -->
    </div>

    <!-- graph -->
    <div v-if="!isLoading && babyHeights.length > 0">
      <BarChart :width="640" :height="160" :chart-data="chartData" :options="chartOptions"/>
      <div class="content">
        <p>&nbsp;</p>
      </div>
    </div>

    <!-- history -->
    <div v-show="!isLoading" class="is-responsive">
      <!-- no info -->
      <div class="content" v-if="babyHeights.length <= 0">
        <p class="has-text-centered">
          No ha ingresado ninguna medición de altura.
        </p>
      </div>

      <!-- info -->
      <table class="table is-striped is-narrow is-fullwidth" v-else>
        <thead>
        <tr>
          <th>Altura</th>
          <th>Fecha</th>
          <!-- <th width="100">&nbsp;</th> -->
        </tr>
        </thead>
        <tbody>
        <tr v-for="babyHeight in babyHeights">
          <td>{{ babyHeight.height }}</td>
          <td>{{ babyHeight.date }}</td>
          <!-- <td style="text-align: right">
            <p class="field">
              <a class="button is-danger" @click="confirmDelete(babyHeight.id)">
                                <span class="icon">
                                    <font-awesome-icon icon="trash"/>
                                </span>
              </a>
            </p>
          </td> -->
        </tr>
        </tbody>
      </table>
    </div>

    <Pagination :currentPage="currentPage"
                :totalPages="totalPages"
                @goToPage="goToPage"/>

    <loader :is-loading="isLoading"/>

    <confirm-modal :show-confirm="showConfirm"
                   confirm-msg="¿Realmente desea eliminar este registro?"
                   @accept="deleteItem"
                   @cancel="cancelConfirm"/>
  </div>
</template>

<script>
  import RedirectAuthMixin from '@/components/mixins/RedirectAuth'

  import BarChart from '@/components/common/BarChart'
  import Pagination from '@/components/common/Pagination'
  import Loader from '@/components/common/Loader'
  import Moment from 'moment'
  import ConfirmModal from '@/components/common/ConfirmModal'

  export default {
    name: 'admin-measurements-heights-history',

    mixins: [
      RedirectAuthMixin
    ],

    components: {
      BarChart,
      Pagination,
      Loader,
      ConfirmModal
    },

    data () {
      return {
        isLoading: true,
        currentPage: 1,
        birthdate: null,
        expectedValues: {
          0: 50.3,
          3: 60,
          6: 67,
          9: 72,
          12: 76,
          15: 79,
          18: 82.5,
          24: 88
        },
        babyHeights: [],
        totalPages: 0,
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
        showConfirm: false,
        toDelete: null
      }
    },

    methods: {
      loadData: function () {
        this.isLoading = true
        this.getBabyId()
        this.getCurrentPage()

        return this
          .getBabyHeights()
          .then(() => {
            this.isLoading = false
          })
          .catch(err => {
            this.isLoading = false
            console.log(err)
            // this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
      },

      getBabyId: function () {
        const params = this.$route.params || {}
        console.log(params)
        this.babyId = params.baby
      },

      getCurrentPage: function () {
        const query = this.$route.query
        this.currentPage = query['page'] ? query['page'] : '1'

        this.currentPage = parseInt(this.currentPage)
        if (!this.currentPage || this.currentPage <= 0) {
          this.goToPage(1)
        }
      },

      goToPage: function (page) {
        this.$router.push(
          {
            name: 'AdminMeasurementsHeightsHistory',
            query: {
              page: page
            },
            params: {
              baby: this.babyId
            }
          }
        )
      },

      getBabyHeights: function () {
        const data = {
          babyId: this.babyId,
          pageNumber: this.currentPage - 1
        }

        return this
          .$store.dispatch('get_baby_heights', data)
          .then(babyHeights => {
            this.birthdate = babyHeights.birthdate
            this.babyHeights = babyHeights.measurements || []
            this.totalPages = babyHeights.total || 0

            if (this.currentPage !== 1 && this.currentPage > this.totalPages) {
              this.goToPage(this.totalPages)
            }

            if (this.babyHeights.length > 0) {
              this.setChartData()
            } else {
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
        let expectedValue = []
        for (let i = 0; i < this.babyHeights.length; i++) {
          const measure = this.babyHeights[i]
          const currentMonths = Math.round(Moment(measure.date).diff(Moment(this.birthdate), 'months', true))
          chartData.labels.push(Moment(measure.date).format('D-M'))
          this.babyHeights[i].date = Moment(measure.date).format('DD - MMMM - YYYY')
          data.push(measure.height)
          const value = this.findShortestDistance(currentMonths)
          expectedValue.push(this.expectedValues[value])
        }

        chartData.datasets.push(
          {
            label: 'Altura',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Altura promedio mundial',
            data: expectedValue,
            backgroundColor: 'rgba(162, 235, 54, 0.4)',
            borderColor: 'rgba(162, 235, 54, 1)',
            borderWidth: 1
          }
        )

        this.chartData = chartData
      },

      findShortestDistance: function (month) {
        let shortestDistance = 10000
        let bestMonth = 0
        for (const m of Object.keys(this.expectedValues)) {
          const distance = Math.abs(month - m)
          console.log('distance ' + distance + ' ' + m)
          if (distance <= shortestDistance) {
            shortestDistance = distance
            bestMonth = m
          }
        }
        return bestMonth
      },

      /*

    setChartData: function () {
      const chartData = {
        labels: [],
        datasets: []
      }

      const data = []
      const expectedValue = []
      for (let i = this.userTemperatures.length - 1; i >= 0; i--) {
        const measure = this.userTemperatures[i]
        chartData.labels.push(measure.date.format('D-M'))
        data.push(measure.temperature)
        expectedValue.push(37)
      }

      chartData.datasets.push(
        {
          label: 'Temperatura',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: '37 °C',
          data: expectedValue,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(162, 235, 54, 1)',
          borderWidth: 1
        }
      )

      this.chartData = chartData
    },

      */

      cancelConfirm: function () {
        this.toDelete = null
        this.showConfirm = false
      },

      confirmDelete: function (userHeightId) {
        this.toDelete = userHeightId
        this.showConfirm = true
      },

      deleteItem: function () {
        this.showConfirm = false

        const data = {
          userId: this.$store.getters.SESSION_GET_USER_CURRENT_ID,
          userHeightId: this.toDelete
        }

        return this
          .$store.dispatch('user_measurements_heights_item_delete', data)
          .then(() => {
            this.toDelete = null
            return this.loadData()
          })
          .catch(err => {
            this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
      }
    },

    watch: {
      '$route' (to, from) {
        if (to !== from) {
          return this.loadData()
        }
      }
    },

    created: function () {
      return this.loadData()
    }
  }
</script>

<style lang="scss" scoped></style>
