import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'user',
    paths: ['auth.user']
  })(store)
}
