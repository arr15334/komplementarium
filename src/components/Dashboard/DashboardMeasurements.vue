<template>
  <div class="box">
    <div class="content">
      <h4>Mediciones</h4>

      <div v-if="!isLoading">
        <p>No posee mediciones en favorito.</p>
      </div>

      <loader :is-loading="isLoading"/>

      <hr>

      <p class="has-text-centered">
        <router-link :to="{name: 'AdminMeasurements'}">Administrar Mediciones</router-link>
      </p>
    </div>
  </div>
</template>

<script>
  import Loader from '@/components/common/Loader'

  export default {
    name: 'dashboard-measurements',

    components: {
      Loader
    },

    props: {
      isLoading: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped></style>
