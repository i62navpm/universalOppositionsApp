<template lang="pug">
  v-flex(xs12 sm10 offset-sm1 md6 offset-md3)
    v-card.card--flex-toolbar
      v-toolbar.white(card, prominent)
        v-icon mood
        v-toolbar-title Register
      v-divider
      v-card-text
        form(@keyup.enter="sendRegister")
          v-text-field(type="email" label="Email", v-model="email", required)
          v-text-field(type="password" label="Password", hint="The length must be more than 8 characters", v-model="password" required)
          v-layout(row justify-space-between)
            small *indicates required field
            v-btn(info :loading="loading"  @click.prevent="sendRegister" :disabled="loading") Sign up
          v-alert(error dismissible transition="scale-transition" v-model="alert") {{error}}
        v-layout(row justify-space-between)
          v-btn(small flat primary :to="'Login'") Have you an account?

</template>

<script>
import { mapActions } from 'vuex'
const debug = require('debug')('register')

export default {
  name: 'register',
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
      registerUser: 'auth/REGISTER_USER'
    }),
    async sendRegister() {
      debug('Sending register form')
      this.loading = true

      try {
        let userConfirmed = await this.registerUser({ email: this.email.trim(), password: this.password.trim() })
        !userConfirmed && this.$router.push({ name: 'verification' })
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
