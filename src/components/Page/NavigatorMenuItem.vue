<template>
  <div v-if="hasAuth && !isTypeItem" class="navbar-item has-dropdown is-hoverable"
       :class="{'is-hidden-desktop': !showTop}">
    <a class="navbar-link">
      {{ name }}
    </a>

    <div class="navbar-dropdown">
      <navigator-menu-item v-for="(item, key) in children" :key="key" :item="item"/>
    </div>
  </div>

  <router-link v-else-if="hasAuth && isTypeItem && useComponent" class="navbar-item"
               :class="{'is-hidden-desktop': !showTop, 'is-active': isActive}"
               :to="{name: component}"
               @click.native="clickItem"
               :target="hasTarget ? target: '_self'">
    <span v-if="hasIcon" class="icon"><i class="fa" :class="iconName"></i>&nbsp;</span>
    {{ name }}
  </router-link>

  <a v-else-if="hasAuth && isTypeItem" class="navbar-item"
     :class="{'is-hidden-desktop': !showTop, 'is-active': isActive}"
     :href="url"
     @click="clickItem"
     :target="hasTarget ? target: '_self'">
    <span v-if="hasIcon" class="icon"><i class="fa" :class="iconName"></i>&nbsp;</span>
    {{ name }}
  </a>
</template>

<script>
  import NavigatorMenuItem from '@/components/Page/NavigatorMenuItem'

  export default {
    name: 'navigator-menu-item',

    components: {
      'navigator-menu-item': NavigatorMenuItem
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
        children: []
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
        return 'fa-' + this.icon
      },

      useComponent: function () {
        return (this.component.length > 0)
      },

      hasTarget: function () {
        return (this.target.length > 0)
      },

      isNormalWindow: function () {
        return this.$store.getters.PREFERENCES_WINDOW_NORMAL
      },

      showTop: function () {
        // for all (*) or page Max state
        if (this.places.indexOf('*') !== -1 || !this.isNormalWindow) {
          return true
        }

        return (this.places.indexOf('top') !== -1)
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

      isActive: function () {
        if (!this.useComponent) {
          return false
        }

        const name = this.$route.name || ''
        return name.includes(this.component)
      }
    },

    methods: {
      clickItem: function (event) {
        this.$emit('click', event)
      }
    },

    created: function () {
      this.type = this.item.type || 'item'
      this.icon = this.item.icon || ''
      this.name = this.item.name || ''
      this.component = this.item.component || ''
      this.url = this.item.url || ''
      this.target = this.item.target || ''
      this.places = this.item.places || []
      this.perms = this.item.perms || ['*']
      this.children = this.item.children || []
    }
  }
</script>

<style lang="scss" scoped></style>
