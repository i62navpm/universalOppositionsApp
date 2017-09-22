<template lang="pug">
  v-flex(xs12 sm10 offset-sm1 md6 offset-md3)
    v-card.card--flex-toolbar
      v-toolbar.white(card, prominent)
        v-icon mood_bad
        v-toolbar-title Forgot the password
      v-divider
      v-card-text
        form(v-if="showPasswordForm" @keyup.enter="sendActivatePassword")
          v-text-field(label="Code", v-model="code", required)
          v-text-field(type="password" label="Password", hint="The length must be more than 8 characters", v-model="password" required)
          v-layout(row justify-space-between)
            small *indicates required field
            v-btn(info :loading="loading"  @click.prevent="sendActivatePassword" :disabled="loading") Set password
          v-alert(error dismissible transition="scale-transition" v-model="alert") {{error}}
        form(v-else @keyup.enter="sendForgotPassword")
          v-text-field(type="email" label="Email", v-model="email", required)
          v-layout(row justify-space-between)
            small *indicates required field
            v-btn(info :loading="loading"  @click.prevent="sendForgotPassword" :disabled="loading") Forgot password
          v-alert(error dismissible transition="scale-transition" v-model="alert") {{error}}
          v-layout(row justify-space-between)
            v-btn(small flat primary :to="'Login'") Have you an account?

</template>

<script>
import { mapActions } from 'vuex'
const debug = require('debug')('forgotPassword')

export default {
  name: 'forgotPassword',
  data() {
    return {
      showPasswordForm: false,
      email: '',
      code: '',
      password: '',
      loading: false,
      alert: false,
      error: ''
    }
  },
  methods: {
    ...mapActions({
      forgotPassword: 'auth/FORGOT_PASSWORD',
      confirmPassword: 'auth/CONFIRM_PASSWORD'
    }),
    async sendForgotPassword() {
      debug('Sending forgot password form')
      this.loading = true
      try {
        this.showPasswordForm = await this.forgotPassword(this.email.trim())
        this.alert = false
      } catch (error) {
        debug('Error:', error.message)
        this.error = error.message
        this.alert = true
      }
      this.loading = false
    },
    async sendActivatePassword() {
      debug('Sending confirm password form')
      this.loading = true
      try {
        await this.confirmPassword({ email: this.email.trim(), code: this.code.trim(), password: this.password.trim() })
        this.$router.push({ name: 'login' })
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
