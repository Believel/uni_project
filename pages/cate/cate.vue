<template>
	<view>
		<!-- 自定义搜素框组件 -->
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">  
		  <!-- 左侧的滚动视图区域 -->
		  <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
			<block v-for="(item, i) in cateList" :key="i">
				<view :class="['left-scroll-view-item', active===i ? 'active' : '']" @click="activeChanged(i)">{{item.cat_name}}</view>
			</block>
		  </scroll-view>
		  <!-- 右侧的滚动视图区域 -->
		  <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
			  <view v-for="(item, i) in cateLevel2" :key="i" class="cate-lv2">
				<view class="cate-lv2-title">/ {{item.cat_name}} /</view>
				<view class="cate-lv3-list">
				  <!-- 三级分类 Item 项 -->
				  <view class="cate-lv3-item" v-for="(item3, i3) in item.children" :key="i3" @click="gotoGoodsList(item3)">
					<!-- 图片 -->
					<image :src="item3.cat_icon"></image>
					<!-- 文本 -->
					<text>{{item3.cat_name}}</text>
				  </view>
				</view>
			  </view>
		  </scroll-view>
		</view>

	</view>
</template>

<script>
	import MySearch from '../../components/my-search.vue'
	export default {
		components: {
			MySearch
		},
		data() {
			return {
				// 窗口可用的高度 = 屏幕高度 - navigationBar高度 - tabBar高度
				wh: 0,
				// 分类数据列表
				cateList: [],
				// 当前选中的索引
				active: 0,
				// 右边二级分类列表
				cateLevel2: [],
				// 滚动条距离顶部的距离
				scrollTop: 0
			};
		},
		onLoad() {
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync()
			console.log(sysInfo)
			this.wh = sysInfo.windowHeight - 50
			this.getCateList()
		},
		methods: {
			async getCateList() {
				// 发起请求
				const { data: res } = await uni.$http.get('/api/public/v1/categories')
				// 判断是否获取失败
				if (res.meta.status !== 200) return uni.$showMsg()
				// 转存数据
				this.cateList = res.message
				// 二级分类赋值
				this.cateLevel2 = this.cateList[this.active].children
			},
			// 改变选中索引
			activeChanged(index){
				this.active = index
				// 二级分类重新赋值
				this.cateLevel2 = this.cateList[index].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			// 跳转商品列表页面
			gotoGoodsList(data) {
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?cid=${data.cat_id}`
				})
			},
			// 跳转到分包中的搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container {
	display: flex;
	.left-scroll-view {
		width: 120rpx;
		.left-scroll-view-item {
			line-height: 60rpx;
			background-color: #f7f7f7;
			text-align: center;
			font-size: 12px;
			&.active {
				background-color: #ffffff;
				position: relative;
				&::before {
					content: '';
					display: block;
					width: 3rpx;
					height: 30rpx;
					background-color: #c00000;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
	.right-scroll-view {
		.cate-lv2-title {
		  font-size: 12px;
		  font-weight: bold;
		  text-align: center;
		  padding: 15px 0;
		}
		.cate-lv3-list {
		  display: flex;
		  flex-wrap: wrap;
		
		  .cate-lv3-item {
		    width: 33.33%;
		    margin-bottom: 10px;
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		
		    image {
		      width: 60px;
		      height: 60px;
		    }
		
		    text {
		      font-size: 12px;
		    }
		  }
		}
	}
}
</style>
