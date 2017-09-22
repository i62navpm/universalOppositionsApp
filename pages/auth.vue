<template lang="pug">
  v-card.grey.lighten-5(flat)
    v-toolbar.primary.elevation-3(dark, extended)
      v-toolbar-title Opposition APP
    v-layout(row)
      transition(name="fade" mode="out-in")
        nuxt-child
</template>

<script>
export default {
  layout: 'auth',
  beforeCreate () {
    this.$store.state.route.name === 'auth' && this.$router.replace({name: 'auth-login'})
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

body {
  overflow-x: hidden;
}

.card--flex-toolbar {
  margin-top: -64px;
}
</style>