<template>
  <div class="box">
    <page-title-nav  title="Inicio"/>
    <div class="columns is-multiline"  v-show="!isLoading" v-for="baby in babies">
        <div class="column is-one-third">
          <div class="card">
            <!-- <header class="card-header">
              <p class="card-header-title">{{baby.name}}</p>
            </header> -->
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="../assets/baby.png" alt="" v-if="baby.gender">
                    <img src="../assets/baby_girl.png" alt="Placeholder" v-else>
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{baby.name}}</p>
                </div>
              </div>
              <div class="content">
                <p><strong>Edad: </strong> {{ currentAge(baby.bornDate) }} meses</p>
                <p><strong>Peso: </strong> {{ baby.weightMeasurements[baby.weightMeasurements.length-1].weight }} lbs</p>
                <p><strong>Altura: </strong> {{ baby.heightMeasurements[baby.heightMeasurements.length-1].height }} cms</p>
              </div>
            </div>
            <footer class="card-footer">
              <router-link :to="{ name: 'AdminMeasurements', params: {} }" class="card-footer-item"> Peso </router-link>
              <router-link :to="{ name: 'AdminMeasurements', params: {} }" class="card-footer-item"> Altura </router-link>
            </footer>
          </div>
        </div>
        <div class="column">
          <Today :baby="baby.id"/>
        </div>
    </div>
    <loader :is-loading="isLoading"/>
  </div>
  <!--
  <div>
    <Navbar/>

    <section class="section">
      <div class="notification is-primary" v-show="showWelcome">
        <button class="delete" v-on:click="showWelcome = false"></button>
        Bienvenido/a {{ currentUser.name }}
      </div>
      <div class="columns">
        <div class="column is-one-third is-one-quarter-fullhd is-hidden-touch">
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
  -->
</template>
<script>
  import PageTitleNav from '@/components/Page/TitleNav'
  import FormCheckbox from '@/components/common/FormCheckbox'
  import FormInput from '@/components/common/FormInput'
  import Calendar from '@/components/common/Calendar'
  import Today from '@/components/common/Today'
  import Loader from '@/components/common/Loader'
  import ConfirmModal from '@/components/common/ConfirmModal'
  import Navbar from '@/components/common/Navbar'

  import Moment from 'moment'

  import DashboardMeasurements from '@/components/Dashboard/DashboardMeasurements.vue'
  import AdminMeasurementsWeightCard from '@/components/AdminMeasurements/AdminMeasurementsWeightCard'
  import AdminMeasurementsHeightCard from '@/components/AdminMeasurements/AdminMeasurementsHeightCard'
  // import Babys from '@/components/Babys'

  export default {
    name: 'Dashboard',

    components: {
      FormCheckbox,
      FormInput,
      Calendar,
      Today,
      // BabyNew,
      PageTitleNav,
      ConfirmModal,
      DashboardMeasurements,
      AdminMeasurementsWeightCard,
      AdminMeasurementsHeightCard,
      Navbar,
      Loader
    },

    data () {
      return {
        showCalendar: false,
        showToday: true,
        currentUser: null,
        isLoading: false,
        babies: [],
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
      },
      getImage: function (gender) {
        console.log(gender)
        return gender
      },
      loadData: function () {
        return this.getBabies()
      },
      getBabies: function () {
        const userId = this.$store.getters.SESSION_GET_USER_ID || this.$cookie.get('user_session')
        const data = {
          userId: userId
        }
        return this.$store.dispatch('babies_get', data)
          .then((babies) => {
            if (babies.length < 1) {
              this.$router.push({name: 'NewEdit'})
            }
            this.babies = babies
          })
      },
      currentAge: function (birthdate) {
        return Math.round(-Moment(birthdate).diff(Moment(), 'months', true))
      }
    },
    created: function () {
      this.isLoading = true
      return this.loadData()
        .then(() => {
          this.isLoading = false
        })
    }
  }
</script>

<style lang="scss" scoped>
</style>
