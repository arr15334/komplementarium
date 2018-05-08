<template>
  <div class="card" style="overflow: hidden">
    <div class="card-header">
      <p class="card-header-title">{{ name }}</p>
    </div>

    <div class="card-image">
      <div style="width: 60%; margin: 0 auto">
        <figure class="image is-3by2">
          <img :src="picture" :alt="name">
        </figure>
      </div>
    </div>

    <div class="card-content">
      <FormSelect label="Medición"
                  place-holder="Seleccione la medición"
                  v-model="measurement"
                  :list="measurements"/>
    </div>

    <div class="card-footer">
      <a @click="addItem" class="card-footer-item">
        <span class="icon has-text-black">Agregar&nbsp;&nbsp;<i class="fa fa-lg fa-plus"></i></span>
      </a>
    </div>
  </div>
</template>

<script>
  import FormSelect from '@/components/common/FormSelect'

  export default {
    name: 'admin-insurances-card',

    components: {
      FormSelect
    },

    props: {
      name: {
        type: String,
        default: 'Agregar Otra Medición'
      },
      picture: {
        type: String,
        default: function () {
          return '/static/imgs/graph3x2.png'
        }
      },
      measurements: {
        type: Array,
        default: function () {
          return []
        }
      }
    },

    data () {
      return {
        measurement: ''
      }
    },

    methods: {
      addItem: function () {
        const measurementId = this.measurement

        if (measurementId.length > 0) {
          this.measurement = ''
          this.$emit('addItem', measurementId)
        }
      }
    }
  }
</script>

<style lang="scss" scoped></style>
