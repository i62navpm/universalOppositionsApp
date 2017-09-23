<template lang="pug">
  .application.application--light
    main
      transition(name="fade" mode="out-in")
          v-card.grey.lighten-5(flat)
            v-toolbar.primary.elevation-3(dark, extended)
              v-toolbar-title Opposition APP
            v-layout(row)
              nuxt
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapActions({
      initCognito: 'auth/INIT_COGNITO',
      getCurrentUser: 'auth/GET_CURRENT_USER'
    })
  },
  created: function () {
    this.initCognito()
  }
}
</script>
<style>

</style>
