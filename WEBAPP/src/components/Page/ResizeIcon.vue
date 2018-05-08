<template>
  <div class="has-text-right">
        <span class="icon" v-intro="'Maximiza la pantalla.'">
            <i v-if="isWindowNormal" @click="toggleMax" class="fa fa-window-maximize"></i>
            <i v-else @click="toggleRestore" class="fa fa-window-restore"></i>
        </span>
  </div>
</template>

<script>
  export default {
    name: 'resize-icon',

    data () {
      return {
        isWindowNormal: true
      }
    },

    methods: {
      toggleMax: function () {
        return this
          .$store.dispatch('preference_maximize_window')
          .then(() => {
            this.isWindowNormal = this.$store.getters.PREFERENCES_WINDOW_NORMAL
          })
      },

      toggleRestore: function () {
        return this
          .$store.dispatch('preference_restore_window')
          .then(() => {
            this.isWindowNormal = this.$store.getters.PREFERENCES_WINDOW_NORMAL
          })
      }
    },

    created: function () {
      return this
        .$store.dispatch('preference_is_window_normal')
        .then((isNormal) => {
          this.isWindowNormal = isNormal
        })
    }
  }
</script>

<style lang="scss" scoped></style>
