<template>
    <div class="Login">
        <div class="full-container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 header">
                    <h2>客户信息管理后台</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 article">
                    <div class="login">
                        <form>
                            <div class="form-group">
                                <label for="username"><span>*&nbsp</span>用户名</label>
                                <input type="text" class="form-control" id="username" placeholder="请输入用户名" v-model="username">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1"><span>*&nbsp</span>密码</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="请输入密码" v-model="password">
                            </div>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model="checked"> 记住密码
                                </label>
                            </div>
                            <button type="submit" class="btn btn-success" @click.prevent="goLogin()">登陆</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 footer">
                    <p>
                        <span>锦城物流网版权所有2000-2010</span>
                        <a href="">京ICP证060822号</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapActions
} from 'vuex'
import axios from 'axios'
export default {
    data() {
            return {
                username: '',
                password: '',
                checked: false,
                userInfo: {}
            }
        },
        created() {},
        methods: {
            ...mapActions([
                'setUserName'
            ]),
            goLogin() {
                if (this.username == '') {
                    alert('请输入用户名');
                } else if (this.password == '') {
                    alert('请输入密码');
                } else {
                    axios({
                            url: '/api/user/goLogin',
                            method: 'post',
                            data: {
                                loginName: this.username,
                                loginPawd: this.password
                            },
                            transformRequest: [function(data) {
                                let ret = '';
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret;
                            }]
                        })
                        .then((res) => {
                            if (res.status == 200) {
                                this.userInfo = res.data;

                                if (this.userInfo.status == 1) {
                                    //LOGIN success
                                    window.sessionStorage.userInfo = JSON.stringify(this.userInfo);
                                    //console.log(window.sessionStorage.userInfo);
                                    //this.userInfo = window.sessionStorage.userInfo;
                                    //console.log(this.userInfo);
                                    let userInfo = this.userInfo;
                                    this.$store.dispatch('setUserName', userInfo);
                                    this.$router.push({
                                        path: '/admin'
                                    });
                                    if (this.ckecked) {
                                        window.sessionStorage.username = this.username;
                                        window.sessionStorage.password = this.password;
                                    }
                                } else {
                                    alert(this.userInfo.msg);
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        },
        watch: {

            $route(to, from) {
                var path = to.path.substring(1);
                if (to.path == '/login') {
                    this.ckecked = true;
                    console.log(this.ckecked);
                    this.username = window.sessionStorage.username;
                    console.log(this.username);
                    this.password = window.sessionStorage.password;
                }
            }
        }
}
</script>
<style scoped lang="less">
@import '../assets/css/base.css';
@import '../assets/css/Login.less';
</style>
