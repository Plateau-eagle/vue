import getters from './getter.js'
import axios from 'axios'
const state = {
	userName: '',
	customerInfo: {}
}
const mutations = {
	setUserName: (state, userInfo) => {
		//console.log(userInfo)
		state.userName = userInfo.username;
	},
	search: (state,keyWords) => {
		console.log(keyWords);
		axios({
				url: '/api/user/search',
				method: 'get',
				data:{
					keyWords:keyWords,
				},
				transformRequest: [function(data) {
					let ret = '';
					for(let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret;
				}]
			})
			.then((res) => {
				if(res.status == 200) {
					state.customerInfo = res.data;
                    console.log(state.customerInfo);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	},
}

export default {
	getters,
	state,
	mutations
}