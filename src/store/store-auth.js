import { firebaseAuth } from 'boot/firebase'
import { LocalStorage } from 'quasar'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
    loggedIn: false
}

const mutations = {
  setLoggedIn(state, value) {
      state.loggedIn = value
  }
}

const actions = {
    registerUser({}, payload) {
        createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
            .then(response => {
                console.log('response: ', response)
            })
            .catch(error => {
              showErrorMessage(error.message)
            })
    },
    loginUser({}, payload) {
      signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
          .then(response => {
              console.log('response: ', response)
          })
          .catch(error => {
            showErrorMessage(error.message)
          })
  },
  logoutUser() {
    firebaseAuth.signOut()
},
handleAuthStateChange({ commit, dispatch }) {
  firebaseAuth.onAuthStateChanged(user => {
      if (user) {
      commit('setLoggedIn', true)
      LocalStorage.set('loggedIn', true)
      this.$router.push('/').catch(err => {})
      dispatch('tasks/fbReadData', null, { root: true })
      }
      else {
      commit('tasks/clearTasks', null, { root: true })
      commit('tasks/setTasksDownloaded', false, { root: true })
      commit('setLoggedIn', false)
      LocalStorage.set('loggedIn', false)
      this.$router.replace('/auth').catch(err => {})
      }
  })
}
}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
