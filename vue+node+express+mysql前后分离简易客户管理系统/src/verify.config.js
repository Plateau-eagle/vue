import Vue from 'vue'
import Verify from "vue-verify-plugin";

const myRules = {
	phone: {
		test: /^1[34578]\d{9}$/,
		message: "电话号码格式不正确"
	},
	max6: {
		test: function(val) {
			if(val.length > 6) {
				return false
			}
			return true;
		},
		message: "最大为6位"
	}

}
Vue.use(Verify, {
	rules: myRules
});

