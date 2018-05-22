<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="image" alt="../assets/groceries.png">
      </figure>
    </div>

    <div class="card-content">
      <form v-show="isAddFood">
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <label class="label">Cantidad (gramos)</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  v-model="quantity"
                  class="input is-small"
                  type="text" placeholder="Ejemplo: 50"
                  v-bind:class="{'is-danger': quantityIsDanger, 'is-success': quantityIsSuccess}">
              </div>
              <p class="help is-danger" v-if="quantityIsDanger">
                Debe ingresar una cantidad válida
              </p>
              <p class="help" v-else>*Nota: Si no ingresa ningún valor se tomará el valor recomendado</p>
            </div>
          </div>
        </div>
        <a @click="addToMenu(foodId)" class="button is-primary"><font-awesome-icon icon="plus"/></a>
        <a @click="cancelAddFood" class="button">Cancelar</a>
      </form>
      <div class="media" v-show="!isAddFood">
        <div class="media-content">
          <p class="title is-4">{{name}}</p>
          <p class="subtitle is-6">{{category}}</p>
        </div>
      </div>

      <div class="content" v-show="!isAddFood">
        <p><strong>Textura:</strong> {{texture}}</p>
        <p><strong>Cantidad recomendada:</strong> {{servingSize + servingMeasure}}</p>
      </div>
    </div>
    <footer class="card-footer" v-show="!isAddFood">
      <p class="card-footer-item">
        <span>
          <a @click="addFood"><font-awesome-icon icon="plus"/></a>
        </span>
      </p>
    </footer>
  </div>
</template>

<script>
import Validator from 'validator'
export default {
  name: 'food-card',
  props: {
    babyId: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'Nombre'
    },
    category: {
      type: String,
      default: ''
    },
    foodId: {
      type: String,
      default: ''
    },
    calories: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      default: '../assets/groceries.png'
    },
    servingSize: {
      type: Number,
      default: 0
    },
    servingMeasure: {
      type: String,
      default: 'g'
    },
    texture: {
      type: String,
      default: 'suave'
    },
    mealTime: {
      type: String,
      default: 'Desayuno'
    }
  },
  data () {
    return {
      isAddFood: false,
      quantity: null
    }
  },
  computed: {
    quantityIsSet: function () {
      return this.quantity !== null
    },
    quantityIsValid: function () {
      if (!this.quantityIsSet || (this.quantity + '').trim() <= 0 || !Validator.isDecimal(this.quantity + '')) {
        return false
      }
      return true
    },
    quantityIsSuccess: function () {
      return this.quantityIsSet && this.quantityIsValid
    },
    quantityIsDanger: function () {
      return this.quantityIsSet && !this.quantityIsValid
    }
  },
  methods: {
    addToMenu: function (food) {
      return this.$store.dispatch('add_food_item', {babyId: this.babyId, food: food, mealTime: this.mealTime})
        .then((res) => {
          if (res.success) {
            console.log('yiah')
          }
          let timestamp = new Date() + ''
          timestamp = timestamp.replace(/ /g, '')
          this.$router.push({name: 'Menu', params: {babyId: this.babyId}, query: {x: timestamp}})
        })
    },
    addFood: function () {
      this.isAddFood = true
    },
    cancelAddFood: function () {
      this.isAddFood = false
    }
  }
}
</script>

<style lang="css">
</style>
