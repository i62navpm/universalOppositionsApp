export default function ({ store }) {
  store.dispatch('auth/INIT_COGNITO')
}
