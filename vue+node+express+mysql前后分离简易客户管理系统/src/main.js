import Vue from 'vue'
import App from './App.vue'
import router from './router.config.js'
import axios from 'axios'
import store from './store/'

require('../bower_components/bootstrap/dist/css/bootstrap.css')


//axios配置

axios.defaults.baseURL = 'http://127.0.0.1:8080';
axios.defaults.withCredentials = false;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})