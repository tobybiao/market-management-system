// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import { removeLoginUserFromStorage } from '@/util/storage'
Vue.use(Vuex)
Vue.use(iView)
Vue.config.productionTip = false

axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response
}, function (error) {
    // Do something with response error
    if (error.response.status === 401) {
        // 没有授权，重新登录
        // 清除本地登录信息
        removeLoginUserFromStorage()
        router.push({ name: 'login' })
    }
    return Promise.reject(error)
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
