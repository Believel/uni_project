<template>
	<view>
		<view class="search-box">
			<uni-search-bar cancelButton="none" placeholder="请输入搜索内容" :radius="100" @input="input"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
		  <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
		    <view class="goods-name">{{item.goods_name}}</view>
		    <uni-icons type="arrowright" size="16"></uni-icons>
		  </view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
		  <!-- 标题区域 -->
		  <view class="history-title">
		    <text>搜索历史</text>
		    <uni-icons type="trash" size="17" @click="cleanHistoryHandle"></uni-icons>
		  </view>
		  <!-- 列表区域 -->
		  <view class="history-list">
		    <uni-tag :text="item" v-for="(item, i) in historyList" :key="i" @click="gotoGoodsList(item)"></uni-tag>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器 timerId
				timer: null,
				// 搜索关键字
				kw: '',
				// 搜索结果列表
				searchResults: [],
				// 搜索历史
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			input(value) {
				// 清除 timer 对应的延时器
				  clearTimeout(this.timer)
				  // 重新启动一个延时器，并把 timerId 赋值给 this.timer
				  this.timer = setTimeout(() => {
					// 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
					// 搜索内容
					this.kw = value
					this.getSearchList()
				  }, 500)
			},
			async getSearchList() {
				// 判断关键词是否为空
				  if (this.kw === '') {
					this.searchResults = []
					return
				  }
				  // 发起请求，获取搜索建议列表
				  const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
				  if (res.meta.status !== 200) return uni.$showMsg()
				  this.searchResults = res.message
				  this.saveSearchHistory()
			},
			// 保存搜索关键词
			saveSearchHistory() {
				const index = this.historyList.indexOf(this.kw)
				// 防止重复添加
				if (index === -1) {
					this.historyList.unshift(this.kw)
				}
				// 持久化存储本地
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			gotoDetail(goods_id){
				// 跳转到商品详情页
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			// 清空历史数据
			cleanHistoryHandle() {
				// 清空数组数据
				this.historyList = []
				// 清空本地存储记录的数据
				uni.setStorageSync('kw', '[]')
			},
			// 跳转商品列表页
			gotoGoodsList(kw) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + kw
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-searchbar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		position: relative;
		padding: 16px;
		background-color: #C00000;
	}
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.sugg-list {
		padding: 0 5px;
		.sugg-item {
			font-size: 12px;
			padding: 12px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.goods-name {
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出隐藏
				overflow: hidden;
				// 超出部分使用 ... 替代
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}
	.history-box {
		padding: 0 5px;
		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}
		.history-list {
		    display: flex;
		    flex-wrap: wrap;
		
		    .uni-tag {
		      margin-top: 5px;
		      margin-right: 5px;
		    }
		}
	}
</style>
