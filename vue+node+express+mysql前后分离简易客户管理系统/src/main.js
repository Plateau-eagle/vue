import Vue from 'vue'
import App from './App.vue'
import router from './router.config.js'
import store from './store/'
import verify from './verify.config.js'
import bootstrap from '../bower_components/bootstrap/dist/css/bootstrap.css'

new Vue({
	el: '#app',
	render: h => h(App),
	router,
	verify,
	store
})