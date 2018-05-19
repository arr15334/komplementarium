<template>
  <div class="columns">
    <div class="column">
      <div class="box" v-show="!isLoading">
        <table class="table is-fullwidth" v-if="babies.length > 0">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Género</th>
              <th>Edad</th>
              <th>Cumpleaños</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="baby in babies">
              <td>{{baby.name}}</td>
              <td>{{baby.getGender()}}</td>
              <td>{{baby.getAge()}} meses</td>
              <td>{{baby.getBirthdate()}}</td>
              <td> <router-link :to="{ name: 'NewEdit', params: { 'baby': baby.id} }"  class="button is-warning">
                <span class="icon is-small"><font-awesome-icon icon="edit"/></span>
              </router-link> </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="field">
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <router-link :to="{ name: 'NewEdit' }" class="button is-primary"> Agregar <span class="icon" style="margin-left: 5px"> <font-awesome-icon icon="user-plus"/> </span> </router-link>
          </p>
        </div>
      </div>
      <loader :is-loading="isLoading"/>
    </div>

  </div>

</template>

<script>
  import Loader from '@/components/common/Loader'
  export default {
    name: 'BabyNew',
    components: {
      Loader
    },
    data () {
      return {
        babies: [],
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
      getBabys: function () {
        const data = {
          userId: this.$store.getters.SESSION_GET_USER_ID || this.$cookie.get('user_session')
        }
        return this.$store.dispatch('babies_get', data)
          .then((babies) => {
            this.babies = babies
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
