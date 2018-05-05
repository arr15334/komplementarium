<template>
  <div class="box menu">
    <template v-for="item in mainMenu" :item="item">
      <template v-if="isGroupWithVisibility(item)">
        <p class="menu-label">
          {{ item.name }}
        </p>

        <ul v-if="hasChildren(item)" class="menu-list">
          <LeftMenuItem v-for="(subitem, subkey) in item.children" :key="subkey"
                        :item="subitem"/>
        </ul>
      </template>

      <LeftMenuItem v-else :item="item"/>
    </template>
  </div>
</template>

<script>
  import mainMenu from '@/settings/mainMenu'

  import LeftMenuItem from '@/components/Page/LeftMenuItem'

  export default {
    name: 'left-menu',

    components: {
      LeftMenuItem
    },

    data () {
      return {
        mainMenu: []
      }
    },

    methods: {
      isGroupWithVisibility: function (item) {
        if (item.type !== 'group') {
          return false
        }

        // place
        const places = item.places || ['*']
        if (places.indexOf('*') === -1 && places.indexOf('left') === -1) {
          return false
        }

        // perm
        const perms = item.perms || ['*']
        const rol = this.$store.getters.SESSION_GET_USER_CURRENT_ROL
        return !(perms.indexOf('*') === -1 && perms.indexOf(rol) === -1)
      },

      hasChildren: function (item) {
        const children = item.children || []
        return children.length > 0
      }
    },

    created: function () {
      this.mainMenu = mainMenu
    }
  }
</script>

<style lang="scss" scoped></style>
