<template>
  <div class="control flatpickr">
    <input type="hidden" data-input :value="date">

    <a class="button" data-toggle
       :class="{ 'is-success': isSuccess, 'is-danger': isDanger }"
       :disabled="isDisabled">
      <span class="icon"><i class="fa fa-calendar"></i></span>
    </a>
  </div>
</template>

<script>
  import loadash from 'lodash'
  import Flatpickr from 'flatpickr'
  import { Spanish } from 'flatpickr/dist/l10n/es.js'

  export default {
    name: 'hidden-date-picker',

    props: {
      'value': {
        type: String
      },
      'isDisabled': {
        type: Boolean,
        default: false
      },
      'isSuccess': {
        type: Boolean,
        default: false
      },
      'isDanger': {
        type: Boolean,
        default: false
      },
      'config': {
        type: Object,
        default: () => ({})
      }
    },

    data () {
      return {
        datePicker: null,
        selectedDates: null,
        defaultConfig: {
          locale: Spanish
        }
      }
    },

    computed: {
      date: {
        get () {
          return this.selectedDates || this.value
        },
        set (newValue) {
          if (this.selectedDates !== newValue) {
            this.selectedDates = newValue
            this.$emit('input', newValue)
          }
        }
      }
    },

    methods: {
      redraw (newConfig) {
        this.datePicker.config = loadash.merge(this.datePicker.config, newConfig)
        this.datePicker.redraw()
        this.datePicker.jumpToDate()
      },

      setDate (newDate, oldDate) {
        if (newDate) {
          this.datePicker.setDate(newDate, true, 'Y-m-d')
          this.datePicker.redraw()
          this.datePicker.jumpToDate()
        }
      },

      dateUpdated (selectedDates, dateStr) {
        this.date = dateStr
      }
    },

    mounted: function () {
      if (!this.datePicker) {
        this.config.onValueUpdate = this.dateUpdated
        this.datePicker = new Flatpickr(this.$el, loadash.merge(this.defaultConfig, this.config))
        this.setDate(this.value)
      }

      this.$watch('config', this.redraw)
      this.$watch('value', this.setDate)
    },

    beforeDestroy () {
      if (this.datePicker) {
        this.datePicker.destroy()
        this.datePicker = null
      }
    }
  }
</script>

<style lang="scss" scoped></style>
