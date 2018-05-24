<template>
  <div class="columns">
    <div class="column"  v-show="!isLoading">
      <div class="box">
        <table class="table is-fullwidth" v-if="babies.length > 0">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Género</th>
              <th>Edad</th>
              <th>Cumpleaños</th>
              <th>Editar</th>
              <th>Borrar</th>
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
              <td> <a class="button is-danger" v-on:click="confirmDelete(baby.id)"> <span class="icon is-small"> <font-awesome-icon icon="eraser"/> </span> </a> </td>
            </tr>
          </tbody>
        </table>
        <p v-else> No ha ingresado datos de ningún bebé </p>
      </div>
      <div class="field">
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <router-link :to="{ name: 'NewEdit' }" class="button is-primary"> Agregar <span class="icon" style="margin-left: 5px"> <font-awesome-icon icon="user-plus"/> </span> </router-link>
          </p>
        </div>
      </div>
    </div>
    <loader :is-loading="isLoading"/>
    <confirm-modal :show-confirm="showConfirm"
                   confirm-msg="¿Realmente desea eliminar los datos de este bebé?"
                   @accept="deleteBaby"
                   @cancel="cancelConfirm"/>
  </div>

</template>

<script>
  import Loader from '@/components/common/Loader'
  import ConfirmModal from '@/components/common/ConfirmModal'

  export default {
    name: 'BabyNew',
    components: {
      ConfirmModal,
      Loader
    },
    data () {
      return {
        babies: [],
        showConfirm: false,
        toDelete: null,
        confirmMsg: null,
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
      },
      confirmDelete: function (id) {
        this.toDelete = id
        this.showConfirm = true
      },
      cancelConfirm: function () {
        this.toDelete = null
        this.showConfirm = false
      },
      deleteBaby: function () {
        this.showConfirm = false
        return this.$store.dispatch('delete_baby', {
          babyId: this.toDelete
        })
          .then(() => {
            this.toDelete = null
            return this.loadData()
          })
          .catch(err => {
            console.log(err)
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
