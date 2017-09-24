<template lang="pug">
  v-app.application.application--light
    main
      transition(name="fade" mode="out-in")
          v-card.grey.lighten-5(flat)
            v-toolbar.primary.elevation-3(dark, extended)
              v-toolbar-title Opposition APP
            v-layout(row)
              nuxt
</template>

<script>
export default {
  name: 'app',
  async beforeCreate() {
    if (!this.$nuxt.$isServer && await this.$store.dispatch('auth/GET_CURRENT_USER')) {
      this.$router.push({ name: 'app-hello' })
    }
  }
}
</script>
<style>

</style>
