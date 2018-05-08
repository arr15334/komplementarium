<template>
  <section class="hero">
    <div class="hero-head">
      <navigator @logout="confirmLogout"/>
    </div>

    <div class="hero-body">
      <div class="columns">
        <transition :duration="{leave: 450}"
                    enter-active-class="animated bounceInLeft"
                    leaveActiveClass="animated bounceOutLeft">
          <div v-if="isNormalWindow" class="column is-3 is-2-fullhd is-hidden-touch">
            <left-menu/>
          </div>
        </transition>

        <div class="column"
             :class="{'is-12 is-9-desktop is-10-fullhd': isNormalWindow}">
          <router-view/>
        </div>
      </div>
    </div>

    <div class="hero-foot">
      <footer class="footer">
        <div class="container is-fluid">
          <div class="content has-text-centered">
            <p>
              _komplementarium 2018 |
              <router-link :to="{name: ''}">T&eacute;rminos y Condiciones</router-link>
            </p>
          </div>
        </div>
      </footer>
    </div>

    <confirm-modal :show-confirm="showConfirm"
                   :confirm-msg="confirmMsg"
                   @accept="acceptConfirm"
                   @cancel="cancelConfirm"/>
  </section>
</template>

<script>
  import RedirectAuthMixin from '@/components/mixins/RedirectAuth'

  import Navigator from '@/components/Page/Navigator'
  import LeftMenu from '@/components/Page/LeftMenu'
  import ConfirmModal from '@/components/common/ConfirmModal'

  export default {
    name: 'page',

    mixins: [
      RedirectAuthMixin
    ],

    components: {
      Navigator,
      LeftMenu,
      ConfirmModal
    },

    data () {
      return {
        showConfirm: false,
        confirmMsg: '¿Estas seguro que deseas terminar sesión?',
        copyYear: 2017
      }
    },

    methods: {
      confirmLogout: function () {
        this.showConfirm = true
      },

      acceptConfirm: function () {
        this.showConfirm = false
        this.$router.push({name: 'Logout'})
      },

      cancelConfirm: function () {
        this.showConfirm = false
      },

      getCopyYear: function () {
        const year = (new Date()).getFullYear()

        if (year > this.copyYear) {
          this.copyYear = year
        }
      }
    },

    computed: {
      isNormalWindow: function () {
        return this.$store.getters.PREFERENCES_WINDOW_NORMAL
      }
    },

    created: function () {
      // this.redirectIfNotLogged()
      // this.getCopyYear()
    }
  }
</script>

<style lang="scss" scoped></style>
