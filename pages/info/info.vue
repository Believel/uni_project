<template>
	<view class="info">
		<text class="title">{{info.title}}</text>
		<rich-text :nodes="info.content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				newsid: '',
				info: {}
			}
		},
		onLoad: function(e) {
			// e 会携带传过来的参数
			this.newsid = e.newsid;
			uni.request({
				url: `https://unidemo.dcloud.net.cn/api/news/36kr/${e.newsid}`,
				method: 'GET',
				// ！注意使用function(){} 在回调函数更新数据不生效
				success: (res) => {
					this.info = res.data
				},
				complete: () => {
					
				},
				fail: () => {
					
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped="scss">
	.info {
		display: flex;
		padding: 10px 2%;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}
	.title {
		display: block;
		text-align: center;
		margin-bottom: 10upx;
	}
</style>
