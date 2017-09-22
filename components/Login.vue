<template lang="pug">
  v-flex(xs12 sm10 offset-sm1 md6 offset-md3)
    v-card.card--flex-toolbar
      v-toolbar.white(card, prominent)
        v-icon assignment_ind
        v-toolbar-title Login
      v-divider
      v-card-text
        form(@keyup.enter="sendLogin")
          v-text-field(type="email" label="Email", v-model="email", required)
          v-text-field(type="password" label="Password", hint="The length must be more than 8 characters", v-model="password" required)
          v-layout(row justify-space-between)
            small *indicates required field
            v-btn(info :loading="loading"  @click.prevent="sendLogin" :disabled="loading") Sign in
          v-alert(error dismissible transition="scale-transition" v-model="alert") {{error}}
        v-layout(row-sm column child-flex-sm justify-space-between)
          v-btn(small flat primary :to="'forgotPassword'") Forgot the password?
          v-btn(small flat primary :to="'register'") You don't have an account yet?

</template>

<script>
import { mapActions } from 'vuex'
const debug = require('debug')('login')

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      alert: false,
      error: ''
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'auth/LOGIN_USER'
    }),
    async sendLogin() {
      debug('Sending login form')
      this.loading = true

      try {
        await this.loginUser({ email: this.email.trim(), password: this.password.trim() })
        this.$router.push({ name: 'hello' })
      } catch (error) {
        debug('Error:', error.message)
        this.error = error.message
        this.alert = true
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">

</style>
