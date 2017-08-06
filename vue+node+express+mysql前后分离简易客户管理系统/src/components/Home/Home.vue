<template>
    <div>
        <headerView></headerView>
        <router-view></router-view>	
        <footerView></footerView>
    </div>
</template>
<script>
import headerView from './Header.vue'
import footerView from './Footer.vue'
export default {
components:{
        headerView,
        footerView
       }
}
</script>
