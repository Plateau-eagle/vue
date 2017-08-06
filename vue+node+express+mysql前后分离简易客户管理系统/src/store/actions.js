export default {
    setUserName: (
    	{ commit },
        userInfo
    ) => {
    	//console.log(userInfo)
        commit('setUserName', userInfo);
    },
    search:({ commit },keyWords) => {
        commit('search',keyWords)
    }
}
