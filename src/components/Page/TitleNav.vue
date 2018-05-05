<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-5">
      <div class="tile is-child">
        <h1 class="title is-2">{{ title }}</h1>
      </div>
    </div>

    <div class="tile">
      <div class="tile is-parent is-vertical">
        <div class="tile is-child" style="margin-bottom: 0 !important;">
          <resize-icon class="is-hidden-touch"/>
        </div>

        <div class="tile is-child">
          <nav class="breadcrumb is-right" aria-label="breadcrumbs">
            <ul>
              <li v-for="(item, key) in breadcrumb" :key="key"
                  :class="{'is-active': key === (breadcrumb.length - 1)}">
                <router-link :to="{name: (item.component || 'Page')}">
                  {{ item.name || '' }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ResizeIcon from '@/components/Page/ResizeIcon'

  export default {
    name: 'page-title-nav',

    components: {
      ResizeIcon
    },

    props: {
      'title': {
        type: String,
        required: true
      },
      'breadcrumb': {
        type: Array,
        default: () => ([])
      }
    }
  }
</script>

<style lang="scss" scoped></style>
