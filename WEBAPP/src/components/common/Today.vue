<template>
  <div class="">
    <div class="box" v-show="!isLoading">

      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Tiempo</th>
            <th>Comida</th>
            <th>¿Listo?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="food in menu">
            <td>Desayuno</td>
            <td>{{food.name}}</td>
            <td>
              <input type="checkbox">
            </td>
          </tr>
          <tr>
            <td>Almuerzo</td>
            <td>Puré de güicoy, compota de manzana</td>
            <td>
              <input type="checkbox">
            </td>
          </tr>
          <tr>
            <td>Cena</td>
            <td>Puré de güicoy, compota de manzana</td>
            <td>
              <input type="checkbox">
            </td>
          </tr>
        </tbody>
      </table>
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
      menu: []
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
          if (foods) {
            if (foods.food) {
              for (const foo of foods.food) {
                this.menu.push(foo)
              }
              return
            }
            this.menu = []
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
