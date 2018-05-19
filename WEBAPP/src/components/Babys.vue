<template>
  <div class="box">
    <page-title-nav title="Bebés" :breadcrumb="breadcrumb"/>

    <transition enter-active-class="animated fadeIn">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import PageTitleNav from '@/components/Page/TitleNav'

  export default {
    name: 'BabyNewss',

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
            name: 'Bebes',
            component: 'All'
          }
        ]
      }
    },
    created: function () {
      this.getBreadcrumb()
    }
  }
</script>

<style lang="scss" scoped></style>
