import AWSCognitoSDK from '@/utils/cognito.service.js'
var debug = require('debug')('auth')

export const state = () => ({
  user: null,
  cognitoSDK: null
})

export const mutations = {
  SET_COGNITO: (state, cognito) => (state.cognitoSDK = cognito),
  SET_USER: (state, user) => (state.user = user)
}

export const actions = {
  INIT_COGNITO: ({ state, commit }) => {
    commit('SET_COGNITO', new AWSCognitoSDK())
  },
  GET_CURRENT_USER: async ({ dispatch, state, commit }) => {
    return new Promise(async (resolve, reject) => {
      if (!state.cognitoSDK) await dispatch('INIT_COGNITO')
      if (!state.user) {
        debug('No user logged')
        reject(new Error('No user logged'))
        return
      }

      state.cognitoSDK.getSession((err, session) => {
        if (err) {
          debug('Error:', err)
          reject(err)
          return
        }
        debug('User session valid:', session.isValid())
        resolve(session.isValid())
        state.cognitoSDK.setToken(session.getIdToken().jwtToken)
      })
    })
  },
  REGISTER_USER: ({ commit, state }, { email, password }) => {
    return new Promise((resolve, reject) => {
      state.cognitoSDK.registerUser({ email, password }, (err, result) => {
        if (err) {
          debug('Error:', err)
          reject(err)
          return
        }
        debug('User registered correctly')
        commit('SET_USER', result.user.username)
        resolve(result.userConfirmed)
      })
    })
  },
  VERIFICATE_CODE: ({ state }, code) => {
    return new Promise((resolve, reject) => {
      state.cognitoSDK.verificateCode({ username: state.user, code }, (err, result) => {
        if (err) {
          debug('Error:', err)
          reject(err)
          return
        }
        debug('User verified correctly')
        resolve(true)
      })
    })
  },
  LOGIN_USER: ({ state, commit }, { email, password }) => {
    return new Promise((resolve, reject) => {
      state.cognitoSDK.loginUser({ email, password }, {
        onSuccess: (result) => {
          debug('User logged correctly')
          state.cognitoSDK.setToken(result.getIdToken().jwtToken)
          commit('SET_USER', email)
          resolve(result)
        },
        onFailure: (err) => {
          debug('Error:', err)
          reject(err)
        }
      })
    })
  },
  LOGOUT_USER: ({ state, commit }) => {
    return new Promise((resolve, reject) => {
      state.cognitoSDK.logoutUser(() => {
        debug('User logout correctly')
        commit('SET_USER', null)
        state.cognitoSDK.setToken(null)
        resolve(true)
      })
    })
  },
  FORGOT_PASSWORD: ({ state, commit, dispatch }, email) => {
    return new Promise((resolve, reject) => {
      state.cognitoSDK.forgotPassword(email, {
        onSuccess: async (result) => {
          debug('Password reset correctly')
          await dispatch('LOGOUT_USER')
          resolve(true)
        },
        onFailure: (err) => {
          debug('Error:', err)
          reject(err)
        }
      })
    })
  },
  CONFIRM_PASSWORD: ({ state }, { email, code, password }) => {
    return new Promise((resolve, reject) => {
      state.cognitoSDK.confirmPassword({ username: email, code, password }, {
        onSuccess: (result) => {
          debug('Password changed correctly')
          resolve(result)
        },
        onFailure: (err) => {
          debug('Error:', err)
          reject(err)
        }
      })
    })
  }
}
