import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home/Home.vue'
import Login from './components/Login.vue'
import adminView from './components/Home/Admin.vue'
import insertView from './components/Home/Insert.vue'
import setView from './components/Home/Setting.vue'
import updataView from './components/Home/Updata.vue'
import searchView from './components/Home/Search.vue'

Vue.use(Router)

export default new Router({
routes:[{
		path: '/home',
		component: Home,
		children: [{
			path: '/insert',
			component: insertView
		}, {
			path: '/set',
			component: setView
		}, {
			path: '/admin',
			component: adminView,
		},
			{
		path: '/search',
		component: searchView,
	}]
	}, {
		path: '/login',
		component: Login

	},
	{ path: '/', redirect: '/login' }
]
})