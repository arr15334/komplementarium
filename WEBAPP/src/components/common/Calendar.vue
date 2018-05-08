<template>
  <vue-event-calendar :events="demoEvents"></vue-event-calendar>
</template>

<script>
// obtenido de: https://github.com/GeoffZhu/vue-event-calendar
export default {
  data () {
    return {
      demoEvents: [{
        date: '2018/11/12', // Required
        title: 'Desayuno' // Required
      }, {
        date: '2016/12/15',
        title: 'Refacción',
        desc: 'description',
        customClass: 'disabled highlight' // Custom classes to an calendar cell
      }]
    }
  }
}
</script>
<style lang="css">
</style>
