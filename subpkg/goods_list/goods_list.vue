<template>
	<view>
		<view class="goods-list">
		  <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
			<my-goods :goods="goods"></my-goods>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 查询关键字
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pageNum: 1,
					// 每页显示条数
					pageSize: 10
				},
				// 商品列表
				goodsList: [],
				total: 0,
				// 是否在请求数据
				isLoading: false
			};
		},
		// options 中存储页面参数
		onLoad(options) {
			console.log(options)
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(cb) {
				this.isLoading = true
				const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isLoading = false
				cb && cb()
				if (res.meta.status !== 200) return uni.$showMsg()
				// 为数据赋值
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				
			},
			// 跳转商品详情页
			gotoDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			}
		},
		// 上拉加载更多的触底事件
		onReachBottom() {
			// 判断是否还有下一页数据
			if (this.queryObj.pageNum * this.queryObj.pageSize >= this.total) return uni.$showMsg('数据加载完毕！')
			// 如果在请求数据，就不发送额外请求
			if (this.isLoading) return
			// 页码增加1
			this.queryObj.pageNum += 1
			// 重新请求列表数据
			this.getGoodsList()
		},
		// 下拉刷新的事件
		onPullDownRefresh() {
			// 重置数据
			this.queryObj.pageNum = 1
			this.total = 0
			this.isLoading = false
			this.goodsList = []
			// 重新发起请求
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
