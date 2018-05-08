<template>
  <div class="">
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
