<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item"
                   :to="{name: 'Page'}"
                   @click.native="closeMenu">
        <img id="logo">
        <p>Komplementarium</p>
      </router-link>

      <router-link v-if="false" class="navbar-item is-hidden-desktop" style="margin-left: auto;"
                   :to="{name: 'Notifications'}"
                   @click.native="closeMenu">
                <span class="icon">
                    <i class="fa"
                       :class="{'fa-bell-o': !haveNotifications, 'has-text-primary fa-bell': haveNotifications}"></i>
                </span>
      </router-link>

      <button class="button navbar-burger" style="/*margin-left: 0;*/"
              :class="{'is-active': isNavBarMenuActive }"
              @click="toggleNavBarActive">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="navbar-menu" :class="{'is-active': isNavBarMenuActive}">
      <div class="navbar-start">
        <NavigatorMenuItem v-for="(item, key) in mainMenu" :key="key" :item="item"
                           @click.native="closeMenu"/>
      </div>

      <div class="navbar-end">
          <a class="navbar-item" @click="showIntro" style="color:white">
            <span class="icon"><font-awesome-icon icon="question-circle"/>&nbsp;</span>
            Mostrar ayuda
          </a>
        <!-- TODO: Display real notifications -->
        <!-- notifications -->


        <!-- account -->
        <div id="account" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span class="is-hidden-desktop">Cuenta</span>

            <figure class="image is-24x24 is-hidden-touch">
              <img :src="profileIcon" alt="Cuenta">
            </figure>
          </a>

          <div class="navbar-dropdown is-right">

            <!-- TODO: ReAdd separator -->
            <hr v-if="false" class="navbar-divider">

            <a class="navbar-item" @click="showIntro">
              <span class="icon"><font-awesome-icon icon="question-circle"/>&nbsp;</span>
              Mostrar ayuda
            </a>

            <a class="navbar-item" @click="logout">
              <span class="icon"><font-awesome-icon icon="sign-out-alt"/>&nbsp;</span>
              Terminar Sesi&oacute;n
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import mainMenu from '@/settings/mainMenu'
  import NavigatorMenuItem from '@/components/Page/NavigatorMenuItem'
  // import VueCookie from 'vue-cookie'

  export default {
    name: 'navigator',

    components: {
      NavigatorMenuItem
    },

    data () {
      return {
        profileIcon: '',
        mainMenu: [],
        isNavBarMenuActive: false,
        haveNotifications: false,
        route: null
      }
    },

    methods: {
      toggleNavBarActive: function () {
        this.isNavBarMenuActive = !this.isNavBarMenuActive
      },

      logout: function () {
        this.$cookie.delete('user_session')
        this.$router.push({name: 'home'})
      },

      showIntro: function () {
        this.$intro().setOptions({
          'skipLabel': 'Salir',
          'doneLabel': 'Terminar',
          'prevLabel': 'Anterior',
          'nextLabel': 'Siguiente'
        }).start()
        this.$intro().showHints()
      },

      closeMenu: function () {
        if (this.isNavBarMenuActive) this.isNavBarMenuActive = false
      }
    },

    created: function () {
      this.profileIcon = '/static/imgs/user.png'
      this.mainMenu = mainMenu
    },
    mounted () {
    }
  }
</script>

<style lang="scss" scoped>
  #logo {
    max-height: 2.8rem;
  }

  #notifications, #account {
    .navbar-link {
      padding-right: 1em;

      &::after {
        border: 0;
      }
    }

    figure {
      background-color: white;
      overflow: hidden;
      border: 1px solid white;
      border-radius: 50%;
    }
  }
</style>
