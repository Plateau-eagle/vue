<template>
	<div>
		<div class="full-container">
			<div class="row article">
				<div class="col-lg-12 col-md-12">
					<div class="row search">
						<div class="col-lg-10 col-md-10 search_title">
							<h3>搜索结果</h3>
						</div>
					</div>
				</div>
				<div class="col-lg-10 col-md-10 coustomer_list">
					<div class="panel panel-default">
						<div class="panel-body">
							<table class="table table-striped">
								<thead>
									<tr>
										<th>序号</th>
										<th>公司名称</th>
										<th>联系人</th>
										<th>邮箱</th>
										<th>网址</th>
										<th>联系电话</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in getInfo" :key="item.id">
										<td>{{item.id}}</td>
										<td>{{item.name}}</td>
										<td>{{item.linkman}}</td>
										<td>{{item.email}}</td>
										<td>{{item.web}}</td>
										<td>{{item.phone}}</td>
									</tr>
								</tbody>
							</table>
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
        'getInfo'
    ])
}
</script>
<style scoped lang="less">
	@import '../../assets/css/base.css';
	@import '../../assets/css/home.less';
</style>