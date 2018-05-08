<template>
  <div>
    <div v-show="!isLoading">
      <div class="box" v-for="baby in babies">
        <h1 class="title">{{baby.name}}</h1>
        <div class="columns is-multiline">
          <div class="column is-half">
            <admin-measurements-height-card
              :name="'Altura'"
              :type="'height'"
              :babyId="baby.id"/>
          </div>
          <div class="column is-half">
            <admin-measurements-weight-card
              :name="'Peso'"
              :type="'weight'"
              :babyId="baby.id"/>
          </div>
        </div>
      </div>
    </div>

    <loader :is-loading="isLoading"/>

    <confirm-modal :show-confirm="showConfirm"
                   confirm-msg="¿Realmente desea remover esta medición?"
                   @accept="removeItem"
                   @cancel="cancelConfirm"/>
  </div>
</template>

<script>
  import RedirectAuthMixin from '@/components/mixins/RedirectAuth'

  import AdminMeasurementsWeightCard from './AdminMeasurementsWeightCard'
  import AdminMeasurementsHeightCard from './AdminMeasurementsHeightCard'
  import AdminMeasurementsAddCard from './AdminMeasurementsAddCard'
  import Loader from '@/components/common/Loader'
  import ConfirmModal from '@/components/common/ConfirmModal'

  export default {
    name: 'admin-measurements-history',

    mixins: [
      RedirectAuthMixin
    ],

    components: {
      AdminMeasurementsWeightCard,
      AdminMeasurementsHeightCard,
      AdminMeasurementsAddCard,
      Loader,
      ConfirmModal
    },

    data () {
      return {
        isLoading: false,
        userMeasurements: [],
        babies: [],
        heightMeasurements: [],
        weightMeasurements: [],
        showConfirm: false,
        toRemove: null
      }
    },

    computed: {
    },

    methods: {
      loadData: function () {
        this.isLoading = true

        return this
          .getUserMeasurements()
          .then(() => {
            this.isLoading = false
          })
          .catch(err => {
            this.isLoading = false
            this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
      },

      getUserMeasurements: function () {
        const data = {
          userId: this.$store.getters.SESSION_GET_USER_ID || this.$cookie.get('user_session')
        }
        this.babies = []
        return this
          .$store.dispatch('babies_get', data)
          .then((response) => {
            this.babies = response
          })
      },

      validType: function (type) {
        switch (type) {
          case 'height':
          case 'weight':
            return true
          default:
            return false
        }
      },

      confirmRemove: function (measurementId) {
        this.toRemove = measurementId
        this.showConfirm = true
      },

      removeItem: function () {
        this.showConfirm = false

        const data = {
          userId: this.$store.getters.SESSION_GET_USER_CURRENT_ID,
          enabled: this.getEnabled(this.toRemove, false),
          favorites: this.getFavorites(this.toRemove, false)
        }

        return this
          .$store.dispatch('user_measurements_item_update', data)
          .then(() => {
            this.toRemove = null
            return this.loadData()
          })
          .catch(err => {
            this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
      },

      cancelConfirm: function () {
        this.toRemove = null
        this.showConfirm = false
      },

      addItem: function (measurementId) {
        const data = {
          userId: this.$store.getters.SESSION_GET_USER_CURRENT_ID,
          enabled: this.getEnabled(measurementId),
          favorites: this.getFavorites()
        }

        return this
          .$store.dispatch('user_measurements_item_update', data)
          .then(() => {
            return this.loadData()
          })
          .catch(err => {
            this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
      },

      getLabel: function (type) {
        switch (type) {
          case 'height':
            return 'Altura'

          case 'weight':
            return 'Peso'

          default:
            return ''
        }
      },

      getEnabled: function (measurementId = '', toAdd = true) {
        const list = []

        for (let i = 0; i < this.userMeasurements.length; i++) {
          const userMeasurement = this.userMeasurements[i]

          if (measurementId.length > 0 && userMeasurement.measurement.id === measurementId) {
            if (toAdd) {
              list.push(userMeasurement.measurement.id)
            }
          } else {
            if (userMeasurement.isEnabled) {
              list.push(userMeasurement.measurement.id)
            }
          }
        }

        return list
      },

      getFavorites: function (measurementId = '', toAdd = true) {
        const list = []

        for (let i = 0; i < this.userMeasurements.length; i++) {
          const userMeasurement = this.userMeasurements[i]

          if (measurementId.length > 0 && userMeasurement.measurement.id === measurementId) {
            if (toAdd) {
              list.push(userMeasurement.measurement.id)
            }
          } else {
            if (userMeasurement.isFavorite) {
              list.push(userMeasurement.measurement.id)
            }
          }
        }

        return list
      }
    },

    created: function () {
      this.isLoading = true
      return this.loadData()
        .then(() => {
          this.isLoading = false
        })
      /*
      this.redirectIfNotLogged({rolRequired: ['patient']})
        .then(() => {
          return this.loadData()
        })
        */
    }
  }
</script>

<style lang="scss" scoped></style>
