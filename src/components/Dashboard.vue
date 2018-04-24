<template>
  <div>
    <Navbar/>

    <section class="section">
      <div class="notification is-primary" v-show="showWelcome">
        <button class="delete" v-on:click="showWelcome = false"></button>
        Bienvenido/a {{ currentUser.name }}
      </div>
      <div class="columns">
        <div class="column is-one-third">
          <div class="container is-fluid">
            <div class="leftmenu">
              <aside class="box menu">
                <p class="menu-label">
                  Funciones
                </p>
                <ul class="menu-list">
                  <li><a  v-bind:class="{'is-active': showToday}"
                          v-on:click="viewToday">
                    Inicio
                  </a></li>
                  <li><a  v-bind:class="{'is-active': showCalendar}"
                          v-on:click="viewCalendar">
                    Calendario
                  </a></li>
                </ul>
                <p class="menu-label">
                  Administrar
                </p>
                <ul class="menu-list">
                  <li>
                    <a>Editar información hijos</a>
                    <ul>
                      <li><a>Rodrigo</a></li>
                      <li><a>Siddhartha</a></li>
                      <li><a>Alejandro</a></li>
                    </ul>
                  </li>
                  <li><a>Mediciones</a></li>
                  <li><a>Historial dietas</a></li>
                </ul>
                <p class="menu-label">
                  Consejos
                </p>
                <ul class="menu-list">
                  <li><a>Nutrición</a></li>
                  <li><a>Alergias</a></li>
                  <li><a>Enfermedades</a></li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <Calendar v-show="showCalendar"/>
            <Today v-show="showToday"/>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>
<script>
  // Script donde se realiza los metodos de comunicación de la webapp
  import FormCheckbox from '@/components/common/FormCheckbox'
  import FormInput from '@/components/common/FormInput'
  import Calendar from '@/components/common/Calendar'
  import Today from '@/components/common/Today'
  import Loader from '@/components/common/Loader'
  import ConfirmModal from '@/components/common/ConfirmModal'
  import Navbar from '@/components/common/Navbar'
  export default {
    name: 'Dashboard',

    components: {
      FormCheckbox,
      FormInput,
      Calendar,
      Today,
      ConfirmModal,
      Navbar,
      Loader
    },

    // Formato de la data, que se va a enviar al servidor.
    data () {
      return {
        showCalendar: false,
        showToday: true,
        currentUser: null,
        showWelcome: true
      }
    },

    methods: {
      viewCalendar: function () {
        this.showCalendar = true
        this.showToday = false
      },
      viewToday: function () {
        this.showCalendar = false
        this.showToday = true
      }
    },

    created () {
      this.currentUser = this.$route.params.user
      if (!this.currentUser) {
        this.$router.push({name: 'Signin'})
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
