export default ({ app, store }) => {
  store.dispatch('auth/INIT_COGNITO')
}
