<template>
    <div>
        <div class="full-container">
            <div class="row header">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                        <div class="title col-lg-10 col-md-10">
                            <h2><span>CRM</span>客户管理系统</h2>
                        </div>
                        <div class="col-lg-2 col-md-2 user">
                            <p>管理员：{{getUserName}}|
                                <router-link to='/login'>退出</router-link>
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <ul class="main_nav nav nav-tabs">
                                <li role="presentation">
                                    <router-link to='/admin' active-class="active">客户管理</router-link>
                                </li>
                                <li>
                                    <router-link to='/insert' active-class="active">客户录入</router-link>
                                </li>
                                <li>
                                    <router-link to='/set' active-class="active">个人设置</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'

export default{
computed: mapGetters([
        'getUserName'
    ])
}
</script>
<style scoped lang="less">
@import '../../assets/css/base.css';
@import '../../assets/css/home.less';
</style>
