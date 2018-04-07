<template>
  <div class="">
    <h1 class="title">Menú de hoy</h1>
    <div class="box">

      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Tiempo</th>
            <th>Comida</th>
            <th>¿Listo?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desayuno</td>
            <td>Puré de güicoy, compota de manzana</td>
            <td>
              <div class="square" v-on:click="setBreakfastCheck">
                <font-awesome-icon icon="check" v-show="breakfastIsChecked" style="width: 100%"/>
              </div>
            </td>
          </tr>
          <tr>
            <td>Almuerzo</td>
            <td>Puré de güicoy, compota de manzana</td>
            <td>
              <div class="square" v-on:click="setBreakfastCheck">
                <font-awesome-icon icon="check" v-show="false" style="width: 100%"/>
              </div>
            </td>
          </tr>
          <tr>
            <td>Cena</td>
            <td>Puré de güicoy, compota de manzana</td>
            <td>
              <div class="square">
                <font-awesome-icon icon="check" v-show="false" style="width: 100%"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
export default {
  name: 'today',
  data () {
    return {
      breakfastIsChecked: false
    }
  },
  methods: {
    setBreakfastCheck: function () {
      this.breakfastIsChecked = !this.breakfastIsChecked
    }
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
</style>
