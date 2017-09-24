export default async ({ app, store }) => {
  await store.dispatch('auth/INIT_COGNITO')
}
