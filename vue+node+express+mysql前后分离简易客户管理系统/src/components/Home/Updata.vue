<template>
	<div>
		<div class="container-fluid">
			<div v-show="show" :transition="transition">
				<div class="modal">
					<div class="modal-dialog">
						<div class="modal-content">
							<!--Header-->
							<div class="modal-header">
								<div name="header">
									<a type="button" class="close" @click="cancel">x</a>
									<h4 class="modal-title">
                                    <slot name="title">
                                    	{{title}}
                                	 </slot>
                                </h4>
								</div>
							</div>
							<!--Container-->
							<div class="modal-body">
								<div class="panel panel-default">
									<div class="panel-body">
										<form role="form">
											<div class="form-group">
												<label for="name">公司名称:</label>
												<input class="form-control" v-verify="name" id="name" placeholder="请输入公司名称" v-model="name">
												<p v-remind="name"></p>
											</div>
											<div class="form-group">
												<label for="linkman">联&nbsp;系&nbsp;人:</label>
												<input class="form-control" v-verify="linkman" id="linkman" placeholder="请输入联系人" v-model="linkman">
												<p v-remind="linkman"></p>
											</div>
											<div class="form-group">
												<label for="exampleInputEmail1">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</label>
												<input class="form-control" v-verify="email" id="exampleInputEmail1" placeholder="请输入邮箱" v-model="email">
												<p v-remind="email"></p>
											</div>
											<div class="form-group">
												<label for="web">公司网址:</label>
												<input class="form-control" id="web" placeholder="请输入公司网址" v-model="web">
												<p></p>
											</div>
											<div class="form-group">
												<label for="phone">联系电话:</label>
												<input class="form-control" id="phone" v-verify="phone" placeholder="请输入联系电话" v-model="phone">
												<p v-remind="phone"></p>
											</div>
										</form>
									</div>
								</div>
							</div>
							<!--Footer-->
							<div class="modal-footer">
								<slot name="footer">
									<button type="button" :class="cancelClass" @click="cancel">{{cancelText}}</button>
									<button type="button" :class="okClass" @click="updateInfo">{{okText}}</button>
								</slot>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-backdrop in" @click="clickMask"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default {
		props: {
			show: { // 控制 Modal 是否显示				　　　　
				type: Boolean,
				twoWay: true,
				default: false　　
			},
			title: {
				type: String,
				default: '更新信息'
			},
			// 为true时无法通过点击遮罩层关闭modal
			force: {
				type: Boolean,
				default: false
			},
			// 自定义组件transition
			transition: {
				type: String,
				default: 'modal'
			},
			// 确认按钮text
			okText: {
				type: String,
				default: '确认'
			},
			// 取消按钮text
			cancelText: {
				type: String,
				default: '取消'
			},
			// 确认按钮className
			okClass: {
				type: String,
				default: 'btn blue'
			},
			// 取消按钮className
			cancelClass: {
				type: String,
				default: 'btn red btn-outline'
			},
			updateId: {
				type: Number,
				default: null
			}
		},
		data() {
			return {
				duration: null,
				name: '',
				linkman: '',
				email: '',
				web: '',
				phone: ''
			}
		},
		created() {
			if(this.show) {
				document.body.className += ' modal-open';
			};
		},
		mounted() {

		},
		beforeDestroy() {
			document.body.className = document.body.className.replace(/\s?modal-open/, '');
		},
		watch: {
			show(value) {
				// 在显示时去掉body滚动条，防止出现双滚动条
				if(value) {
					document.body.className += ' modal-open';
				}
				//         // 在modal动画结束后再加上body滚动条
				else {
					if(!this.duration) {
						this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000;
					}

					window.setTimeout(() => {
						document.body.className = document.body.className.replace(/\s?modal-open/, '');
					}, this.duration || 0);
				}
			}

		},
		methods: {
			cancel() {
				this.$emit('hide');
			},
			// 点击遮罩层
			clickMask() {
				if(!this.force) {
					this.cancel();
				}
			},
			getcurInfo() {
				console.log(this.updateId);
				axios({
						url: '/api/user/curInfo',
						method: 'post',
						data: {
							cusId: this.updateId
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
							this.name = res.data[0].name;
							this.linkman = res.data[0].linkman;
							this.email = res.data[0].email;
							this.web = res.data[0].web;
							this.phone = res.data[0].phone;
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			updateInfo() {
				//console.log(this.updateId);
				if(this.$verify.check()) {
				axios({
						url: '/api/user/update',
						method: 'post',
						data: {
							cusId: this.updateId,
							cusName: this.name,
							cusLinkman: this.linkman,
							cusEmail: this.email,
							cusWeb: this.web,
							cusPhone: this.phone
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
							alert('提交成功！');
							this.cancel();
							this.$emit('resh');
						}
					})
					.catch((err) => {
						console.log(err);
					});
				}
			}
		},
		verify: {
			name: "required",
			linkman: "required",
			email: ["required","email"],
			phone: "phone"
		}
	}
</script>
<style scoped lang="less">
	.modal {
		display: block;
		.modal-body{
			p{
				color: red;
			}
		}
	}
	
	.modal-transition {
		transition: all .6s ease;
	}
	
	.modal-leave {
		/* 样式没什么用，但可以让根标签的transitionEnd生效，以去掉modal-leave */
		border-radius: 1px !important;
	}
	
	.modal-transition .modal-dialog,
	.modal-transition .modal-backdrop {
		transition: all .5s ease;
	}
	
	.modal-enter .modal-dialog,
	.modal-leave .modal-dialog {
		opacity: 0;
		transform: translateY(-30%);
	}
	
	.modal-enter .modal-backdrop,
	.modal-leave .modal-backdrop {
		opacity: 0;
	}
</style>