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
export default {
  name: 'app'
}
</script>
<style>

</style>
