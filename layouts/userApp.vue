<template lang="pug">

  .application.application--light
    .main(toolbar)
      v-navigation-drawer(absolute, persistent, light, :mini-variant.sync='mini', v-model='drawer', overflow)
        v-toolbar.transparent(flat)
          v-list.pa-0
            v-list-tile(tag='div')
              v-list-tile-content.content-username
                v-list-tile-title.username {{getUsername}}
              v-list-tile-action
                v-btn(icon, @click.native.stop='mini = !mini')
                  v-icon chevron_left
        v-list.pt-0(dense)
          v-divider
          v-list-tile(v-for='item in items', :key='item.title' :to="item.route")
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title {{ item.title }}
      v-toolbar.primary.darken-4(fixed, dark)
        v-toolbar-side-icon(@click.stop='drawer = !drawer')
        v-toolbar-title Oposition App
        v-spacer
        v-btn(icon @click.prevent="logout()")
          v-icon exit_to_app
      main
        v-container(fluid)
          transition(name="fade" mode="out-in")
            nuxt
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  middleware: 'init',
  methods: {
    ...mapActions({
      logoutUser: 'auth/LOGOUT_USER'
    }),
    async logout() {
      await this.logoutUser()
      this.$router.push({ name: 'auth-login' })
    }
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'dashboard', route: 'hello' },
        { title: 'English list', icon: 'view_list', route: 'list' }
      ],
      mini: false,
      right: null
    }
  },
  computed: {
    getUsername() {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style>

</style>
