import localstorage  from '../common/util'

const mutations = {
  saveUserToken(state, info) {
    localstorage.putLocalStorage('passport', info)
    state.passport = info
  },

  removeUserToken(state, info) {
    state.passport = ''
    localstorage.removeLocalStorage('passport')
  }

}

export default mutations