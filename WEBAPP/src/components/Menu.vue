<template>
        <div class="columns">
          <div class="column">
            <div class="box">
              <h1 class="title" v-intro="'bla'"> Escoge el menú de hoy </h1>
              <form  style="margin-bottom:20px">
                <FormSelect label="Seleccione el bebé"
                            placeHolder="Seleccione el nombre del bebé"
                            :list="babyLabels"
                            :isRequired="true"
                            v-model="babyLabel"
                            @change="findFood(baby)"/>
              </form>

              <div class="box" v-show="babyIsSet">
                <p> <strong>Calorías disponibles:</strong> {{remainingCalories}} </p>
                <p> <strong>Menú:</strong> <span v-for="food in menu" class="tag is-warning is-rounded"> {{food.name}} <button class="delete is-small"></button> </span> </p>
                <div class="field is-grouped is-grouped-centered">
                  <p class="control">
                     <a class="button is-success">
                       Guardar menú
                     </a>
                   </p>
                </div>
              </div>
              <div class="box" v-show="food.length > 0 && !isLoading">
                <div class="columns is-multiline">
                  <div class="card column is-one-quarter"
                        v-for="foo in food"
                        v-bind:class="{'deactivated': foo.calories > remainingCalories}">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img :src="foo.image" alt="Placeholder image">
                      </figure>
                    </div>

                    <div class="card-content">
                      <div class="media">
                        <div class="media-content">
                          <p class="title is-4">{{foo.name}}</p>
                          <p class="subtitle is-6">{{foo.category}}</p>
                        </div>
                      </div>

                      <div class="content">
                        <p><strong>Textura:</strong> {{foo.texture}}</p>
                        <p><strong>Cantidad:</strong> {{foo.servingSize + foo.servingMeasure}}</p>
                      </div>
                    </div>
                    <footer class="card-footer">
                      <p class="card-footer-item">
                        <span>
                          <a @click="addToMenu(foo)"><font-awesome-icon icon="plus"/></a>
                        </span>
                      </p>
                    </footer>
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
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import Logo from '@/components/common/Logo'
  import FormSelect from '@/components/common/FormSelect'
  import FormSelectWithSearch from '@/components/common/FormSelectWithSearch'

  export default {
    name: 'Menu',
    components: {
      FormInput,
      FormSelect,
      FormSelectWithSearch,
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
        menu: [],
        remainingCalories: 0,
        isLoading: false,
        isSubmitting: false
      }
    },

    computed: {
      babyIsSet: function () {
        return this.baby !== null
      }
    },

    methods: {
      addToMenu: function (food) {
        this.menu.push(food)
        this.remainingCalories = this.remainingCalories - food.calories
      },

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
        return Promise.resolve()
          .then(() => {
            return this.getBabys()
          })
      },
      findFood: function (babyId) {
        this.isLoading = true
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
        const ageMonths = this.baby.getAge()
        this.remainingCalories = this.baby.getCalories(ageMonths)
        const data = {
          age: ageMonths
        }
        return this.$store.dispatch('find_foods', data)
          .then((food) => {
            this.food = food
            this.isLoading = false
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
