<template>
	<div>
		<div class="container-fluid">
			<div v-show="show" :transition="transition">
				<div class="modal" @click="clickMask">
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
								<slot name="body">{{body}}</slot>
							</div>
							<!--Footer-->
							<div class="modal-footer">
								<slot name="footer">
									<button type="button" :class="cancelClass" @click="cancel">{{cancelText}}</button>
									<button type="button" :class="okClass" @click="deleteInfo">{{okText}}</button>
								</slot>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-backdrop in"></div>
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
				default: '警告'
			},
			body: {
				type: String,
				default: '删除无法恢复！'
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
			deleteId:{
				type: Number,
				default: null
			}
		},
		data() {
			return {
				duration: null
			}
		},
		created() {
			//console.log(this.deleteId);
			if(this.show) {
				document.body.className += ' modal-open';
			}
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
			deleteInfo() {
				console.log(this.deleteId);
	                 axios({
	                         url: '/api/user/delete',
	                         method: 'post',
	                         data: {
	                             cusId: this.deleteId
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
	                         	this.$emit('resh');
	                             console.log(res.data);
	                         }
	                     })
	                     .catch((err) => {
	                         console.log(err);
	                     });
	             }
		}
	}

</script>
<style scoped>
	.modal {
		display: block;
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