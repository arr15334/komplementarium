<template>
  <div>
    <div v-show="!isLoading">
      <div class="columns is-multiline">
        <div class="column is-half" v-for="userMeasurement in userMeasurements" :key="userMeasurement.id"
             v-if="userMeasurement.isEnabled && validType(userMeasurement.getType())">
          <admin-measurements-height-card
            v-if="userMeasurement.getType() === 'height'"
            :name="getLabel(userMeasurement.getType())"
            :measurement-id="userMeasurement.measurement.id"
            :type="userMeasurement.getType()"
            :favorite="userMeasurement.isFavorite"
            @toggleFavorite="toggleFavorite"
            @removeCard="confirmRemove"/>

          <admin-measurements-weight-card
            v-else-if="userMeasurement.getType() === 'weight'"
            :name="getLabel(userMeasurement.getType())"
            :measurement-id="userMeasurement.measurement.id"
            :type="userMeasurement.getType()"
            :favorite="userMeasurement.isFavorite"
            @toggleFavorite="toggleFavorite"
            @removeCard="confirmRemove"/>
        </div>

        <div v-if="hasToAdd" class="column is-half">
          <admin-measurements-add-card
            :measurements="measurementsToAdd"
            @addItem="addItem"/>
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
        isLoading: true,
        userMeasurements: [],
        showConfirm: false,
        toRemove: null
      }
    },

    computed: {
      measurementsToAdd: function () {
        const toAdd = []

        for (let i = 0; i < this.userMeasurements.length; i++) {
          const userMeasurement = this.userMeasurements[i]

          if (!userMeasurement.isEnabled) {
            const label = this.getLabel(userMeasurement.getType())

            if (label.length > 0) {
              toAdd.push(
                {
                  value: userMeasurement.measurement.id,
                  text: label,
                  type: userMeasurement.getType()
                }
              )
            }
          }
        }
        return toAdd
      },

      hasToAdd: function () {
        return (this.measurementsToAdd.length > 0)
      }
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
          userId: this.$store.getters.SESSION_GET_USER_CURRENT_ID
        }

        return this
          .$store.dispatch('user_measurements_get', data)
          .then(userMeasurements => {
            this.userMeasurements = userMeasurements || []
          })
      },

      validType: function (type) {
        switch (type) {
          case 'height':
          case 'weight':
          case 'blood-glucose':
          case 'blood-pressure':
            return true
          default:
            return false
        }
      },

      toggleFavorite: function (measurementId, currentFavorite) {
        const data = {
          userId: this.$store.getters.SESSION_GET_USER_CURRENT_ID,
          enabled: this.getEnabled(),
          favorites: this.getFavorites(measurementId, !currentFavorite)
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

          case 'blood-pressure':
            return 'Presión Sanguínea'

          case 'blood-glucose':
            return 'Glucosa en Sangre'

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
