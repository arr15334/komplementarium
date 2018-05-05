<template>
  <div>
    <!-- global operations -->
    <div v-show="!isLoading" class="field is-grouped">
      <!-- add -->
      <p class="control">
        <router-link class="button is-primary"
                     :to="{name: 'AdminMeasurementsWeightsItem'}">
                    <span class="icon">
                        <i class="fa fa-plus-circle"></i>
                    </span>
          <span>Agregar</span>
        </router-link>
      </p>
    </div>

    <!-- graph -->
    <div v-if="!isLoading && userWeights.length > 0">
      <LineChart :width="640" :height="160" :chart-data="chartData" :options="chartOptions"/>
      <div class="content">
        <p>&nbsp;</p>
      </div>
    </div>

    <!-- history -->
    <div v-show="!isLoading" class="is-responsive">
      <!-- no info -->
      <div class="content" v-if="userWeights.length <= 0">
        <p class="has-text-centered">
          No ha ingresado ninguna medición de peso.
        </p>
      </div>

      <!-- info -->
      <table class="table is-striped is-narrow is-fullwidth" v-else>
        <thead>
        <tr>
          <th>Peso</th>
          <th>Fecha</th>
          <th width="100">&nbsp;</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="userWeight in userWeights" :key="userWeight.id">
          <td>{{ userWeight.weight }}</td>
          <td>{{ userWeight.getDate() }}</td>
          <td style="text-align: right">
            <p class="field">
              <a class="button" @click="confirmDelete(userWeight.id)">
                                <span class="icon">
                                    <i class="fa fa-trash-o"></i>
                                </span>
              </a>
            </p>
          </td>
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

  import LineChart from '@/components/common/LineChart'
  import Pagination from '@/components/common/Pagination'
  import Loader from '@/components/common/Loader'
  import ConfirmModal from '@/components/common/ConfirmModal'

  export default {
    name: 'admin-measurements-weights-history',

    mixins: [
      RedirectAuthMixin
    ],

    components: {
      LineChart,
      Pagination,
      Loader,
      ConfirmModal
    },

    data () {
      return {
        isLoading: true,
        currentPage: 1,
        userWeights: [],
        totalPages: 0,
        chartData: null,
        chartOptions: {
          responsive: true,
          maintainAspectRatio: true
        },
        showConfirm: false,
        toDelete: null
      }
    },

    methods: {
      loadData: function () {
        this.isLoading = true

        this.getCurrentPage()

        return this
          .getUserWeights()
          .then(() => {
            this.isLoading = false
          })
          .catch(err => {
            this.isLoading = false
            this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
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
            name: 'AdminMeasurementsWeightsHistory',
            query: {
              page: page
            }
          }
        )
      },

      getUserWeights: function () {
        const data = {
          userId: this.$store.getters.SESSION_GET_USER_CURRENT_ID,
          pageNumber: this.currentPage
        }

        return this
          .$store.dispatch('user_measurements_weights_get', data)
          .then(userWeights => {
            this.userWeights = userWeights.data || []
            this.totalPages = userWeights.totalPages || 0

            if (this.currentPage !== 1 && this.currentPage > this.totalPages) {
              this.goToPage(this.totalPages)
            }

            if (this.userWeights.length > 0) {
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
        for (let i = this.userWeights.length - 1; i >= 0; i--) {
          const measure = this.userWeights[i]
          chartData.labels.push(measure.date.format('D-M'))
          data.push(measure.weight)
        }

        chartData.datasets.push(
          {
            label: 'Peso',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        )

        this.chartData = chartData
      },

      cancelConfirm: function () {
        this.toDelete = null
        this.showConfirm = false
      },

      confirmDelete: function (userWeightId) {
        this.toDelete = userWeightId
        this.showConfirm = true
      },

      deleteItem: function () {
        this.showConfirm = false

        const data = {
          userId: this.$store.getters.SESSION_GET_USER_CURRENT_ID,
          userWeightId: this.toDelete
        }

        return this
          .$store.dispatch('user_measurements_weights_item_delete', data)
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
      this.redirectIfNotLogged({rolRequired: ['patient']})
        .then(() => {
          return this.loadData()
        })
    }
  }
</script>

<style lang="scss" scoped></style>
