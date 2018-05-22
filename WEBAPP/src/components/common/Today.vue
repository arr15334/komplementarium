<template>
  <div class="">
    <div class="box" v-show="!isLoading">

      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Tiempo</th>
            <th>Comida</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desayuno</td>
            <td v-if="breakfast.length"> {{ breakfast.toString() }} </td>
            <td v-else> Ninguna </td>
          </tr>
          <tr>
            <td>Almuerzo</td>
            <td v-if="lunch.length"> {{ lunch.toString() }} </td>
            <td v-else> Ninguna </td>
          </tr>
          <tr>
            <td>Refacción</td>
            <td v-if="snack.length"> {{ snack.toString() }} </td>
            <td v-else> Ninguna </td>
          </tr>
          <tr>
            <td>Cena</td>
            <td v-if="dinner.length"> {{ dinner.toString() }} </td>
            <td v-else> Ninguna </td>
          </tr>
        </tbody>
      </table>
      <router-link :to="{ name: 'Menu', params: {babyId: this.baby} }">Editar menú</router-link>
    </div>
    <loader :is-loading="isLoading"/>
  </div>

</template>

<script>
import Loader from '@/components/common/Loader'

export default {
  name: 'today',
  components: {
    Loader
  },
  props: {
    'baby': {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {
      breakfast: [],
      lunch: [],
      snack: [],
      dinner: [],
      isLoading: false
    }
  },
  methods: {
    loadData: function () {
      return Promise.resolve()
        .then(() => {
          return this.getBabyMenu()
        })
    },
    getBabyMenu: function () {
      this.babyId = this.baby
      const data = {
        babyId: this.babyId
      }
      return this.$store.dispatch('get_menu_today', data)
        .then((foods) => {
          console.log(foods.length)
          if (foods.length) {
            for (const foo of foods) {
              if (foo.mealTime === 'Desayuno') {
                this.breakfast = []
                for (const breakfast of foo.food) {
                  this.breakfast.push(breakfast.name)
                }
              } else if (foo.mealTime === 'Almuerzo') {
                this.lunch = []
                for (const lunch of foo.food) {
                  this.lunch.push(lunch.name)
                }
              } else if (foo.mealTime === 'Refacción') {
                this.snack = []
                for (const snack of foo.food) {
                  this.snack.push(snack.name)
                }
              } else if (foo.mealTime === 'Cena') {
                this.dinner = []
                for (const dinner of foo.food) {
                  this.dinner.push(dinner.name)
                }
              }
            }
          } else {
            console.log('no hay')
            this.isLoading = false
            return null
          }
        })
    }
  },
  created: function () {
    this.isLoading = true
    return this.loadData()
      .then(() => {
        console.log('exit')
        this.isLoading = false
      })
  }
}
</script>

<style lang="css">
.square {
  width: 50%;
  color: green;
	border-color: gray;
  border-style: solid;
	padding-bottom: 30%;
  border-radius: 10%;
	float: left;
	margin: 1.66%;
}
input[type='checkbox'] {
    -webkit-appearance:none;
    width:30px;
    height:30px;
    background:white;
    border-radius:5px;
    border:2px solid #555;
}
input[type='checkbox']:checked {
    background: #abd;
}
</style>
