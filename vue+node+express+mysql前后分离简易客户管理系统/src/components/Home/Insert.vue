<template>
    <div>
        <div class="full-container">
            <div class="row article">
                <div class="col-lg-12 col-md-12">
                    <div class="row search">
                        <div class="col-lg-10 col-md-10 search_title">
                            <h3>客户录入</h3>
                        </div>
                    </div>
                </div>
                <div class="col-lg-10 col-md-10 coustomer_list">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form role="form">
                                <div class="form-group">
                                    <label for="name">公司名称</label>
                                    <input class="form-control" id="name" placeholder="请输入公司名称" v-model="name">
                                </div>
                                <div class="form-group">
                                    <label for="linkman">联系人</label>
                                    <input class="form-control" id="linkman" placeholder="请输入联系人" v-model="linkman">
                                </div>
                                <div class="form-group">
                                    <label for="email">邮箱</label>
                                    <input class="form-control" type="email" id="email" placeholder="请输入邮箱" v-model="email">
                                </div>
                                <div class="form-group">
                                    <label for="web">公司网址</label>
                                    <input class="form-control" id="web" placeholder="请输入公司网址" v-model="web">
                                </div>
                                <div class="form-group">
                                    <label for="phone">联系电话</label>
                                    <input class="form-control" id="phone" placeholder="请输入联系电话" v-model="phone">
                                </div>
                                <button type="submit" class="btn btn-primary" id="btnsubmit" @click.prevent="insert()">提交</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
            return {
                name: '',
                linkman: '',
                email: '',
                web: '',
                phone: '',
                cusInfo:{}
            }
        },
        methods: {
            insert() {
                 if (this.name == ''||this.linkman == ''||this.email == ''||this.web == ''||this.phone == '') {
                    alert('信息不完整，请检查');
                }else{ 
                axios({
                        url: '/api/user/insert',
                        method: 'post',
                        data: {
                            cusName: this.name,
                            cusLinkman: this.linkman,
                            cusEmail: this.email,
                            cusWeb: this.web,
                            cusPhone: this.phone
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
                            alert('提交成功！');
                            this.cusInfo = res.data;
                            this.name='';
                            this.linkman='';
                            this.email='';
                            this.web='';
                            this.phone='';
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }
}
</script>
<style scoped lang="less">
@import '../../assets/css/base.css';
@import '../../assets/css/home.less';
</style>
