<template>
  <li v-if="hasAuth && isTypeItem && showLeft">
    <router-link v-if="useComponent"
                 :class="{'is-active': isActive}"
                 :to="{name: component}"
                 :target="hasTarget ? target: '_self'" v-intro="introJs" v-intro-if="introJs.length > 0 ">
      <span v-if="hasIcon" class="icon"><i class="fa" :class="iconName"></i>&nbsp;</span>
      {{ name }}
    </router-link>

    <a v-else
       :class="{'is-active': isActive}"
       :href="url"
       :target="hasTarget ? target: '_self'">
      <span v-if="hasIcon" class="icon"> <font-awesome-icon :icon="iconName"/> &nbsp;</span>
      {{ name }}
    </a>

    <ul v-if="hasChildren">
      <left-menu-item v-for="(item, key) in children" :key="key" :item="item"/>
    </ul>
  </li>
</template>

<script>
  import LeftMenuItem from '@/components/Page/LeftMenuItem'

  export default {
    name: 'left-menu-item',

    components: {
      'left-menu-item': LeftMenuItem
    },

    props: {
      'item': {
        type: Object,
        default: () => ({})
      }
    },

    data () {
      return {
        type: 'item',
        icon: '',
        name: '',
        component: '',
        url: '',
        target: '',
        places: [],
        perms: [],
        children: [],
        message: null,
        route: ''
      }
    },
    methods: {
      getIntro: function () {
        return this
          .$store.dispatch('intro_js_get')
          .then(response => {
            if (response.dashboard === false) {
              this.cookieDashboard = false
            } else if (response.dashboard === true) {
              this.cookieDashboard = true
            }
          })
      }
    },
    computed: {
      isTypeItem: function () {
        return (this.type === 'item')
      },

      hasIcon: function () {
        return (this.icon.length > 0)
      },

      iconName: function () {
        return 'fas-' + this.icon
      },

      useComponent: function () {
        return (this.component.length > 0)
      },

      hasTarget: function () {
        return (this.target.length > 0)
      },

      showLeft: function () {
        // for all (*)
        if (this.places.indexOf('*') !== -1) {
          return true
        }

        return (this.places.indexOf('left') !== -1)
      },

      hasAuth: function () {
        // for all ('*')
        if (this.perms.indexOf('*') !== -1) {
          return true
        }

        // for current rol
        const rol = this.$store.getters.SESSION_GET_USER_CURRENT_ROL
        return (this.perms.indexOf(rol) !== -1)
      },

      hasChildren: function () {
        return (this.children.length > 0)
      },

      isActive: function () {
        if (!this.useComponent) {
          return false
        }

        const name = this.$route.name || ''
        console.log('--')
        const component = this.component.toLowerCase()
        const route = this.$route.fullPath

        return route.includes(component) || name.includes(this.component)
      }
    },
    mounted () {
    },
    created: function () {
      const query = this.$route.fullPath
      if (query === '/page/dashboard') {
        this.route = 1
      }
      this.type = this.item.type || 'item'
      this.icon = this.item.icon || ''
      this.name = this.item.name || ''
      this.introJs = this.item.introJs || ''
      this.component = this.item.component || ''
      this.url = this.item.url || ''
      this.target = this.item.target || ''
      this.places = this.item.places || ['*']
      this.perms = this.item.perms || ['*']
      this.children = this.item.children || []
    }
  }
</script>

<style lang="scss" scoped></style>
