<template>
  <nav class="pagination is-centered" role="navigation" aria-label="paginación" v-if="totalPages > 1">
    <a class="pagination-previous"
       v-show="currentPage > 1"
       @click="goToPage(currentPage - 1)">Anterior</a>

    <a class="pagination-next"
       v-show="currentPage < totalPages"
       @click="goToPage(currentPage + 1)">Siguiente</a>

    <ul class="pagination-list">
      <li>
        <a class="pagination-link" aria-label="Ir a página 1"
           :class="{'is-current': currentPage === 1}"
           @click="goToPage(1)">1</a>
      </li>

      <li v-if="currentPage > 3 && totalPages > 6"><span class="pagination-ellipsis">&hellip;</span></li>

      <li v-for="i in getPagesToLoop()">
        <a class="pagination-link" :aria-label="'Ir a página ' + i"
           :class="{'is-current': currentPage === i}"
           @click="goToPage(i)">{{ i }}</a>
      </li>

      <li v-if="currentPage < (totalPages - 2) && totalPages > 6"><span
        class="pagination-ellipsis">&hellip;</span></li>

      <li>
        <a class="pagination-link" :aria-label="'Ir a página ' + totalPages"
           :class="{'is-current': currentPage === totalPages}"
           @click="goToPage(totalPages)">{{ totalPages }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'pagination',

    props: {
      'currentPage': {
        type: Number,
        default: 1
      },

      'totalPages': {
        type: Number,
        default: 1
      }
    },

    methods: {
      goToPage: function (page) {
        this.$emit('goToPage', page)
      },

      getPagesToLoop: function () {
        const list = []

        if (this.currentPage > 5 && this.currentPage >= this.totalPages) {
          list.push(this.currentPage - 4)
        }

        if (this.currentPage > 4 && this.currentPage >= (this.totalPages - 1)) {
          list.push(this.currentPage - 3)
        }

        if (this.currentPage > 3 && this.currentPage >= (this.totalPages - 2)) {
          list.push(this.currentPage - 2)
        }

        if (this.currentPage > 2) {
          list.push(this.currentPage - 1)
        }

        if (this.currentPage > 1 && this.currentPage < this.totalPages) {
          list.push(this.currentPage)
        }

        if (this.currentPage < (this.totalPages - 1)) {
          list.push(this.currentPage + 1)
        }

        if (this.currentPage <= 3 && this.currentPage < (this.totalPages - 2)) {
          list.push(this.currentPage + 2)
        }

        if (this.currentPage <= 2 && this.currentPage < (this.totalPages - 3)) {
          list.push(this.currentPage + 3)
        }

        if (this.currentPage <= 1 && this.currentPage < (this.totalPages - 4)) {
          list.push(this.currentPage + 4)
        }

        return list
      }
    }
  }
</script>
