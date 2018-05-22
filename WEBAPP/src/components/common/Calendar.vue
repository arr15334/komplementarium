<template>
  <div>
    <div class="box" v-show="!isLoading">
      <vue-event-calendar :events="demoEvents" :title="'Menú'" @day-changed="viewDay"></vue-event-calendar>
    </div>
    <loader :is-loading="isLoading"/>
  </div>

</template>

<script>
// obtenido de: https://github.com/GeoffZhu/vue-event-calendar
import Moment from 'moment'
import Loader from '@/components/common/Loader'
export default {
  name: 'Calendar',
  components: {
    Loader
  },
  data () {
    return {
      demoEvents: [],
      babies: [],
      menus: [],
      isLoading: false
    }
  },
  methods: {
    loadData: function () {
      return Promise.resolve()
        .then(() => {
          return this.getBabys()
        })
    },

    viewDay: function (dataCalendar) {
      const data = {
        babyId: this.babies[0].id,
        date: Moment(dataCalendar.date).format('YYYY-MM-DD') || null
      }
      return this.$store.dispatch('get_menu_andBaby', data)
        .then((foods) => {
          this.menus = foods
          console.log(this.menus)
        })
    },

    getMenu: function (babyId) {
      const data = {
        babyId: babyId
      }
      return this.$store.dispatch('get_menu_andBaby', data)
        .then((response) => {
          console.log(response)
          const menu = response.menu
          const babyName = response.baby

          let menuDescription = ''

          for (const menuItem of menu) {
            if (menuItem.mealTime === 'Desayuno') {
              menuDescription += 'Desayuno: '
              let first = true
              for (const food of menuItem.food) {
                if (first) {
                  menuDescription += food.name
                  first = false
                } else {
                  menuDescription += ', ' + food.name
                }
              }
            } else if (menuItem.mealTime === 'Almuerzo') {
              menuDescription += '\nAlmuerzo: '
              let first = true
              for (const food of menuItem.food) {
                if (first) {
                  menuDescription += food.name
                  first = false
                } else {
                  menuDescription += ', ' + food.name
                }
              }
            }
          }
          this.demoEvents.push(
            {
              title: babyName + '',
              desc: menuDescription + '',
              date: Moment().format('YYYY/MM/DD')
            }
          )
        })
    },

    getBabys: function () {
      const data = {
        userId: this.$cookie.get('user_session') || this.$store.getters.SESSION_GET_USER_ID
      }
      return this.$store.dispatch('babies_get', data)
        .then((babies) => {
          this.babies = babies
          return
        })
        .then(() => {
          for (const baby of this.babies) {
            this.getMenu(baby.id)
          }
        })
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
<style lang="css">
</style>
