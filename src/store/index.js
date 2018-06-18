import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const USER_LOGIN = 'USER_LOGIN'
const state = {
    loginUser: {
        id: '',
        username: '',
        userType: ''
    }
}

const mutations = {
    [USER_LOGIN] (state, payload) {
        state.loginUser = payload.loginUser
    }
}
const store = new Vuex.Store({
    state,
    mutations
})
export default store
