import AWSCognitoSDK from '@/utils/cognito.service.js'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
var debug = require('debug')('auth')

let cognitoSDK

export const state = () => ({
  user: null
})

export const mutations = {
  SET_COGNITO: (state, cognito) => (cognitoSDK = cognito),
  SET_USER: (state, user) => (state.user = user)
}

export const actions = {
  INIT_COGNITO: ({ state, commit }, hola) => {
    if (cognitoSDK) return
    cognitoSDK = new AWSCognitoSDK()
  },
  GET_CURRENT_USER: async ({ dispatch, state, commit }) => {
    return new Promise(async (resolve, reject) => {
      if (!cognitoSDK) await dispatch('INIT_COGNITO')
      if (!state.user) {
        debug('No user logged')
        reject(new Error('No user logged'))
        return
      }

      cognitoSDK.getSession((err, session) => {
        if (err) {
          debug('Error:', err)
          reject(err)
          return
        }
        debug('User session valid:', session.isValid())
        resolve(session.isValid())
        cognitoSDK.setToken(session.getIdToken().jwtToken)
        // cognitoSDK.refreshCredentials((err) => {
        //   if (err) {
        //     commit('SET_USER', null)
        //     debug('Error:', err)
        //     reject(err)
        //     return
        //   }
        //   debug('User session refreshed')
        //   resolve(true)
        // })
      })
    })
  },
  REGISTER_USER: ({ commit, state }, { email, password }) => {
    return new Promise((resolve, reject) => {
      cognitoSDK.registerUser({ email, password }, (err, result) => {
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
      cognitoSDK.verificateCode({ username: state.user, code }, (err, result) => {
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
      cognitoSDK.loginUser({ email, password }, {
        onSuccess: (result) => {
          debug('User logged correctly')
          cognitoSDK.setToken(result.getIdToken().jwtToken)
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
      cognitoSDK.logoutUser(() => {
        debug('User logout correctly')
        commit('SET_USER', null)
        cognitoSDK.setToken(null)
        resolve(true)
      })
    })
  },
  FORGOT_PASSWORD: ({ state, commit, dispatch }, email) => {
    return new Promise((resolve, reject) => {
      cognitoSDK.forgotPassword(email, {
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
      cognitoSDK.confirmPassword({ username: email, code, password }, {
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

export const plugins = [createPersistedState({
  key: 'user',
  paths: ['auth.user'],
  storage: {
    getItem: (key) => Cookies.getJSON(key),
    setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
    removeItem: (key) => Cookies.remove(key)
  }
})]
