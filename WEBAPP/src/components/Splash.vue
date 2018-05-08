<template></template>

<script>
  import RedirectAuthMixin from '@/components/mixins/RedirectAuth'

  export default {
    name: 'splash',

    mixins: [
      RedirectAuthMixin
    ],

    created: function () {
      // return this.redirectAuth()
    }
  }
</script>

<style lang="scss" scoped></style>
