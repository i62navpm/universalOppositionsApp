<template lang="pug">
  .application.application--light
    main
      transition(name="fade" mode="out-in")
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
