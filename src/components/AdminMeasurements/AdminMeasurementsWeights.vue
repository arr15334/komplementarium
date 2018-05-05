<template>
  <div class="box">
    <page-title-nav title="Mediciones de Peso" :breadcrumb="breadcrumb"/>

    <transition enter-active-class="animated fadeIn">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import RedirectAuthMixin from '@/components/mixins/RedirectAuth'

  import PageTitleNav from '@/components/Page/TitleNav'

  export default {
    name: 'admin-measurements-weights',

    mixins: [
      RedirectAuthMixin
    ],

    components: {
      PageTitleNav
    },

    data () {
      return {
        breadcrumb: []
      }
    },

    methods: {
      getBreadcrumb: function () {
        this.breadcrumb = [
          {
            name: 'Inicio',
            component: 'Page'
          },
          {
            name: 'Mediciones',
            component: 'AdminMeasurements'
          },
          {
            name: 'Pesos',
            component: 'AdminMeasurementsWeights'
          }
        ]
      }
    },

    created: function () {
      this.redirectIfNotLogged({rolRequired: ['patient']})
        .then(() => {
          this.getBreadcrumb()
        })
    }
  }
</script>

<style lang="scss" scoped></style>
