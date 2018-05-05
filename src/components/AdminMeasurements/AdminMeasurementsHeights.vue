<template>
  <div class="box">
    <page-title-nav title="Mediciones de Altura" :breadcrumb="breadcrumb"/>

    <transition enter-active-class="animated fadeIn">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import RedirectAuthMixin from '@/components/mixins/RedirectAuth'

  import PageTitleNav from '@/components/Page/TitleNav'

  export default {
    name: 'admin-measurements-heights',

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
            name: 'Alturas',
            component: 'AdminMeasurementsHeights'
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
