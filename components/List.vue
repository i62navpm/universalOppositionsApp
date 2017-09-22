<template lang="pug">
  v-card
    v-card-title
      | English table
      v-spacer
      v-text-field(append-icon='search', label='Search', single-line, hide-details, v-model='query')
    v-data-table.elevation-1(v-bind:headers='headers', v-bind:items='items' v-bind:pagination.sync='pagination', :total-items='totalItems', :loading='loading')
      template(slot='headerCell', scope='props')
        span(v-tooltip:bottom="{ 'html': props.header.text }")
          | {{ props.header.text }}
      template(slot='items', scope='props')
        td {{ props.item.posicion }}
        td.text-xs-right {{ props.item.nombre }}

</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      query: '',
      totalItems: 0,
      loading: true,
      pagination: {},
      preventWatcher: true,
      headers: [
        {
          text: 'Position',
          align: 'left',
          sortable: true,
          value: 'posicion'
        },
        { text: 'Name', align: 'left', sortable: true, value: 'nombre' }
      ],
      items: []
    }
  },
  watch: {
    pagination: {
      async handler() {
        if (this.preventWatcher) return

        let { data, total } = await this.getDataFromApi()
        this.items = data
        this.totalItems = total
      },
      deep: true
    },
    query: function () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        let { data, total } = await this.getDataFromApi()
        this.items = data
        this.totalItems = total
      }, 500)
    }
  },
  async mounted() {
    let { data, total } = await this.getDataFromApi()
    this.items = data
    this.totalItems = total
    this.preventWatcher = false
  },
  methods: {
    getDataFromApi: async function () {
      this.loading = true
      const { sortBy, descending, page, rowsPerPage } = this.pagination

      let params = {
        query: this.query,
        sortBy,
        descending,
        page: this.query ? 1 : page,
        rowsPerPage
      }
      let { data, total } = await this.$parent.lambda.invoke(params)
      this.loading = false

      return { data, total }
    }
  }
}
</script>

<style lang="scss">

</style>
