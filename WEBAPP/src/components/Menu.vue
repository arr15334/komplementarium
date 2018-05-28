<template>
        <div class="columns">
          <div class="column">
            <div class="box">
              <h1 class="title" v-intro="'Selecciona alguno de tus hijos y diseña el menú del día'"> Escoge el menú de hoy </h1>
              <form  style="margin-bottom:20px">
                <FormSelect label="Seleccione el bebé"
                            placeHolder="Seleccione el nombre del bebé"
                            :list="babyLabels"
                            :isRequired="true"
                            v-model="babyLabel"
                            @change="findFood(baby)"/>
                <!-- <FormSelect label="Tiempo de comida"
                            placeHolder="Escoja el tiempo de comida"
                            :list="mealTimes"
                            :isRequired="true"
                            v-model="mealTime"/> -->
                <div class="field is-horizontal" v-show="babyIsSet">
                  <div class="field-label is-small">
                    <label class="label">Tiempo de comida</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control is-expanded">
                        <span class="select is-fullwidth" v-bind:class="{'is-danger': !mealTimeIsValid}">
                          <select v-model="mealTime" @change="filterByMealTime">
                            <option>Desayuno</option>
                            <option>Almuerzo</option>
                            <option>Refacción</option>
                            <option>Cena</option>
                          </select>
                        </span>
                      </p>
                      <p class="help is-danger" v-show="!mealTimeIsValid"> Debe escoger el tiempo de comida </p>
                    </div>
                  </div>
                </div>
              </form>

              <div class="box" v-show="babyIsSet">
                <p> <strong>Calorías disponibles:</strong> {{remainingCalories}} </p>
                <p class="help">Recuerda complementar los alimentos con leche materna</p>
                <hr>
                <p> <strong>Desayuno</strong>
                  <span v-for="food in breakfast" class="tag is-primary is-rounded"> {{food.name}}
                    <button class="delete is-small" @click="deleteMenuItem(food._id, 'breakfast')"></button>
                  </span> </p>
                <p> <strong>Almuerzo</strong>
                  <span v-for="food in lunch" class="tag is-info is-rounded"> {{food.name}}
                    <button class="delete is-small" @click="deleteMenuItem(food._id, 'lunch')"></button>
                  </span> </p>
                <p> <strong>Refacción</strong>
                  <span v-for="food in snack" class="tag is-primary is-rounded"> {{food.name}}
                    <button class="delete is-small" @click="deleteMenuItem(food._id, 'snack')"></button>
                  </span> </p>
                <p> <strong>Cena</strong>
                  <span v-for="food in dinner" class="tag is-success is-rounded"> {{food.name}}
                    <button class="delete is-small" @click="deleteMenuItem(food._id, 'dinner')"></button>
                  </span> </p>
                <div class="field is-grouped is-grouped-centered">
                  <p class="control">
                     <a class="button is-success" @click="saveMenu" :class="{'is-loading': isSubmitting}">
                       Guardar menú
                     </a>
                   </p>
                </div>
              </div>

              <div class="notification is-warning" v-show="differentItems > 3">
                ¡Intenta no variar tanto los alimentos para que tu bebé se pueda acostumbrar a una comida y puedas identificar fácilmente una alergia!
              </div>

              <div class="box" v-show="food.length > 0 && !isLoading">
                <div class="columns is-multiline">
                  <div class="column is-one-quarter" v-for="foo in food">
                    <FoodCard :name="foo.name"
                              :calories="foo.calories"
                              :image="foo.image"
                              :servingSize="foo.servingSize"
                              :servingMeasure="foo.servingMeasure"
                              :category="foo.category"
                              :foodId="foo._id"
                              :babyId="baby.id"
                              :mealTime="mealTime"/>
                  </div>
                </div>

              </div>
              <loader :is-loading="isLoading"/>
            </div>
            <!-- form -->


        </div>
      </div>

</template>

<script>
  import VueNotifications from 'vue-notifications'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import FoodCard from '@/components/FoodCard'
  import Logo from '@/components/common/Logo'
  import FormSelect from '@/components/common/FormSelect'
  import FormSelectWithSearch from '@/components/common/FormSelectWithSearch'

  export default {
    name: 'Menu',
    components: {
      FormInput,
      FormSelect,
      FormSelectWithSearch,
      FoodCard,
      Loader,
      Logo
    },
    data () {
      return {
        babyLabels: [],
        babyLabel: '',
        baby: null,
        babies: [],
        breadcrumb: [],
        food: [],
        breakfast: [],
        lunch: [],
        snack: [],
        dinner: [],
        menu: [],
        mealTime: 'Desayuno',
        mealTimeErrorMessage: null,
        isLoading: false,
        isSubmitting: false
      }
    },

    computed: {
      babyIsSet: function () {
        return this.baby !== null
      },
      remainingCalories: function () {
        let remainingCalories = this.baby ? this.baby.getCalories(this.baby.getAge()) : 0
        for (const menuItem of this.breakfast) {
          remainingCalories -= menuItem.calories
        }
        for (const menuItem of this.lunch) {
          remainingCalories -= menuItem.calories
        }
        for (const menuItem of this.snack) {
          remainingCalories -= menuItem.calories
        }
        for (const menuItem of this.dinner) {
          remainingCalories -= menuItem.calories
        }
        if (remainingCalories < 0) return 0
        return remainingCalories
      },
      mealTimeIsSet: function () {
        return this.mealTime !== 'Cualquiera'
      },
      differentItems: function () {
        let foodItems = []
        for (const menuItem of this.breakfast) {
          if (foodItems.indexOf(menuItem._id) < 0) foodItems.push(menuItem._id)
        }
        for (const menuItem of this.lunch) {
          if (foodItems.indexOf(menuItem._id) < 0) foodItems.push(menuItem._id)
        }
        for (const menuItem of this.snack) {
          if (foodItems.indexOf(menuItem._id) < 0) foodItems.push(menuItem._id)
        }
        for (const menuItem of this.dinner) {
          if (foodItems.indexOf(menuItem._id) < 0) foodItems.push(menuItem._id)
        }
        return foodItems.length
      },
      mealTimeIsValid: function () {
        if (this.mealTimeIsSet) {
          return true
        }
        this.mealTimeErrorMessage = 'Debe escoger el tiempo de comida'
        return false
      }
    },

    notifications: {
      showSuccessMsg: {
        type: VueNotifications.types.success,
        message: 'Se ha guardado el menú del día'
      }
    },

    methods: {
      getBabys: function () {
        const data = {
          userId: this.$store.getters.SESSION_GET_USER_ID || this.$cookie.get('user_session')
        }
        this.babyLabels = []
        return this.$store.dispatch('babies_get', data)
          .then((babies) => {
            for (const baby of babies) {
              this.babyLabels.push({
                value: baby.id + '',
                text: baby.name
              })
            }
            this.babies = babies
          })
      },

      loadData: function () {
        console.log('loading')
        return Promise.resolve()
          .then(() => {
            return this.getBabys()
          })
          .then(() => {
            const params = this.$route.params || {}
            console.log(params)
            if (params.babyId) {
              this.babyLabel = params.babyId
              if (params.mealTime) {
                this.mealTime = params.mealTime
              }
              return this.findFood(params.babyId)
            }
          })
      },

      findFood: function (babyId) {
        this.isLoading = true
        this.food = []
        this.menu = []
        let found = false
        for (const baby of this.babies) {
          if (baby.id === babyId) {
            found = true
            this.baby = baby
          }
        }
        if (!found) {
          this.isLoading = false
          return
        }
        // const ageMonths = this.baby.getAge()
        // this.remainingCalories = this.baby.getCalories(ageMonths)
        // const data = {
        //   age: ageMonths
        // }
        // return this.$store.dispatch('find_foods', data)
        //   .then((food) => {
        //     this.food = food
        //   })
        return this.filterByMealTime()
          .then(() => {
            return this.getTodayMenu()
          })
          .then(() => {
            this.isLoading = false
          })
      },

      filterByMealTime: function () {
        const meal = this.mealTime.toLowerCase()
        if (meal === 'cualquiera' || !this.baby) {
          return
        }
        let categories = []
        if (meal === 'desayuno') {
          categories = ['cereal', 'fruta', 'lácteo', 'proteína']
        } else if (meal === 'almuerzo') {
          categories = ['verdura', 'carne', 'leguminosas']
        } else if (meal === 'refacción') {
          categories = ['cereal', 'fruta', 'lácteo']
        } else {
          categories = ['cereal', 'fruta', 'lácteo', 'verdura', 'leguminosas']
        }
        return this.$store.dispatch('find_foods', {age: this.baby.getAge()})
          .then((food) => {
            this.food = []
            for (const foodItem of food) {
              if (categories.indexOf(foodItem.category) > -1) {
                this.food.push(foodItem)
              }
            }
          })
      },

      getTodayMenu: function () {
        const data = {
          babyId: this.baby.id
        }
        return this.$store.dispatch('get_menu_today', data)
          .then((foods) => {
            this.menu = []
            if (foods.length) {
              for (const foo of foods) {
                if (foo.mealTime === 'Desayuno') {
                  this.breakfast = foo.food
                } else if (foo.mealTime === 'Almuerzo') {
                  this.lunch = foo.food
                } else if (foo.mealTime === 'Refacción') {
                  this.snack = foo.food
                } else if (foo.mealTime === 'Cena') {
                  this.dinner = foo.food
                }
              }
            }
          })
      },

      deleteMenuItem: function (id, mealTime) {
        if (mealTime === 'breakfast') {
          for (let i = 0; i < this.breakfast.length; i++) {
            if (this.breakfast[i]._id === id) {
              this.breakfast.splice(i, 1)
              return
            }
          }
        } else if (mealTime === 'lunch') {
          for (let i = 0; i < this.lunch.length; i++) {
            if (this.lunch[i]._id === id) {
              this.lunch.splice(i, 1)
              return
            }
          }
        } else if (mealTime === 'snack') {
          for (let i = 0; i < this.snack.length; i++) {
            if (this.snack[i]._id === id) {
              this.snack.splice(i, 1)
              return
            }
          }
        } else if (mealTime === 'dinner') {
          for (let i = 0; i < this.dinner.length; i++) {
            if (this.dinner[i]._id === id) {
              this.dinner.splice(i, 1)
              return
            }
          }
        }
      },

      saveMenu: function () {
        this.isSubmitting = true
        let data = {}
        return Promise.resolve()
          .then(() => {
            if (this.breakfast.length < 1) {
              return
            }
            data = {
              babyId: this.baby.id,
              menu: this.breakfast,
              mealTime: 'Desayuno'
            }
            return this.$store.dispatch('save_today_menu', data)
          })
          .then(() => {
            if (this.lunch.length < 1) {
              return
            }
            data = {
              babyId: this.baby.id,
              menu: this.lunch,
              mealTime: 'Almuerzo'
            }
            return this.$store.dispatch('save_today_menu', data)
          })
          .then(() => {
            if (this.snack.length < 1) {
              return
            }
            data = {
              babyId: this.baby.id,
              menu: this.snack,
              mealTime: 'Refacción'
            }
            return this.$store.dispatch('save_today_menu', data)
          })
          .then(() => {
            if (this.dinner.length < 1) {
              return
            }
            data = {
              babyId: this.baby.id,
              menu: this.dinner,
              mealTime: 'Cena'
            }
            return this.$store.dispatch('save_today_menu', data)
          })
          .then(() => {
            this.isSubmitting = false
            this.showSuccessMsg()
          })
      }
    },
    watch: {
      babyLabel: function (newVal) {
        this.findFood(newVal)
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
  .deactivated {
    opacity: 0.4
  }
</style>
