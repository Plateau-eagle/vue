<template>
	<div>
		<div class="full-container">
			<div class="row article">
				<div class="col-lg-12 col-md-12">
					<div class="row search">
						<div class="col-lg-10 col-md-10 search_title">
							<h3>搜索用户</h3>
						</div>
						<div class="col-lg-2 col-md-2 go_search">
							<form>
								<div class="form-group">
									<label for="abstrict">
                                        <input type="text" class="form-control" id="abstrict" placeholder="请输入关键词" v-model="keyWords">
                                    </label>
								</div>
								<router-link to='/search'><button class="btn btn-success" @click="search(keyWords)">搜索</button></router-link>
							</form>
						</div>
					</div>
				</div>
				<div class="col-lg-10 col-md-10 coustomer_list">
					<div class="panel panel-default">
						<div class="panel-body">
							<table class="table table-striped" id="customerTable">
								<thead>
									<tr>
										<th>序号</th>
										<th>公司名称</th>
										<th>联系人</th>
										<th>邮箱</th>
										<th>网址</th>
										<th>联系电话</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in customerInfo" :key="item.id">
										<td>{{item.id}}</td>
										<td>{{item.name}}</td>
										<td>{{item.linkman}}</td>
										<td>{{item.email}}</td>
										<td>{{item.web}}</td>
										<td>{{item.phone}}</td>
										<td>
											<button class="btn btn-primary btn-xs" @click="showModalU(item.id)">修改</button>
											<button class="btn btn-danger btn-xs" @click="showModalD(item.id)">刪除</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<deleteView :show="dShow" :deleteId="dataId" @hide="hideModelD" @resh="refreshNews"></deleteView>
		<updataView :show="uShow" ref="updataView" :updateId="dataId" @hide="hideModelU" @resh="refreshNews"></updataView>
	</div>
</template>
<script>
	import deleteView from './Delete.vue'
	import updataView from './Updata.vue'
	import {
		mapActions
	} from 'vuex'
	import axios from 'axios'
	export default {
		data() {
			return {
				dShow: false,
				uShow: false,
				dataId:null,
				keyWords:'',
				customerInfo: {}
			}

		},
		mounted() {
			this.refreshNews();
		},
		methods: {
			...mapActions([
				'search'
			]),
			refreshNews() {
				axios({
						url: '/api/user/getNews',
						method: 'get',
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
							this.customerInfo = res.data;
						}
					})
					.catch((err) => {
						console.log(err);
					});

			},
			hideModelD() {
				this.dShow = false;
			},
			showModalD(id) {
				this.dShow = true;
			    this.dataId=id;
			},
			hideModelU() {
				this.uShow = false;
			},
			showModalU(id) {
				this.uShow = true;				
				this.dataId=id;
				console.log(this.dataId)
				this.$refs.updataView.getcurInfo();
				//console.log(this.uShow)
			}
		},
		components: {
			deleteView,
			updataView
		}
	}
</script>
<style scoped lang="less">
	@import '../../assets/css/base.css';
	@import '../../assets/css/home.less';
</style>