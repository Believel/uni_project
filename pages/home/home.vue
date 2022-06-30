<template>
	<view>
		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem="clickItem" :info="swiperList" :current="current" :mode="mode" field="content">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<!-- 跳转商品详情页 -->
					<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?good_id='+item.goods_id">
						<image :src="item.image_src" mode="widthFix"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="nav-list">
		   <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandle(item)">
		     <image :src="item.image_src" class="nav-img"></image>
		   </view>
		</view>
		<view class="floor-list">
		  <!-- 楼层 item 项 -->
		  <view class="floor-item" v-for="(item, i) in floorList" :key="i">
		    <!-- 楼层标题 -->
			<navigator :url="item.product_list[0].url">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
			</navigator>
			<!-- 楼层图片区域 -->
			<view class="floor-img-box">
			  <!-- 左侧大图片的盒子 -->
			  <view class="left-img-box">
			    <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
			  </view>
			  <!-- 右侧 4 个小图片的盒子 -->
			  <view class="right-img-box">
			    <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
			      <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
			    </view>
			  </view>
			</view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				// 当前指示点的索引
				current: 0,
				// 指示点的类型
				mode: 'dot',
				swiperDotIndex: 0,
				// 分类导航数据
				navList: [],
				// 楼层区域列表
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			clickItem(e) {
				this.swiperDotIndex = e
			},
			change(e) {
				this.current = e.detail.current;
			},
			async getSwiperList() {
				const { data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.swiperList = res.message
			},
			async getNavList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			navClickHandle(item) {
				if (item.name === '分类') {
					// 跳转到tabBar页面，并关闭其他所有非tabBar页面
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			async getFloorList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				// 通过双层 forEach 循环，处理 URL 地址
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						console.log('prod', prod)
					  prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
					return floor
				})
				this.floorList = res.message
			}
		}
	}
</script>

<style lang="scss">
	.swiper-box {
		height: 330rpx;
	}
	.swiper-item, .image {
		width: 100%;
		height: 100%;
	}
	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0;
		.nav-item {
			.nav-img {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}
	.floor-title {
	  height: 60rpx;
	  width: 100%;
	  display: flex;
	}
	
	.floor-img-box {
	  display: flex;
	  padding-left: 10rpx;
	  .right-img-box {
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: flex-start;
	  }
	}
</style>
