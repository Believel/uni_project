<template>
	<view class="goods-detail-container">
		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem="clickItem" :info="goods_info.pics" :current="current" :mode="mode" field="content">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in goods_info.pics" :key="index">
					<image :src="item.pics_big" mode="widthFix" @click="preview(index)"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- 商品信息区域 -->
		<view class="goods-info-box" v-if="goods_info.goods_name">
		  <!-- 商品价格 -->
		  <view class="price">￥{{goods_info.goods_price}}</view>
		  <!-- 信息主体区域 -->
		  <view class="goods-info-body">
		    <!-- 商品名称 -->
		    <view class="goods-name">{{goods_info.goods_name}}</view>
		    <!-- 收藏 -->
		    <view class="favi">
		      <uni-icons type="star" size="18" color="gray"></uni-icons>
		      <text>收藏</text>
		    </view>
		  </view>
		  <!-- 运费 -->
		  <view class="yf">快递：免运费{{cart.length}}</view>
		</view>
		<!-- 商品详情信息 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<view class="goods-carts">
			<!-- fill 控制右侧按钮的样式 -->
			<!-- options 左侧按钮的配置项 -->
			<!-- buttonGroup 右侧按钮的配置项 -->
			<!-- click 左侧按钮的点击事件处理函数 -->
			<!-- buttonClick 右侧按钮的点击事件处理函数 -->
			<uni-goods-nav
				:options="options"
				:fill="true"
				:button-group="buttonGroup"
				@click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
		data() {
			return {
				// 轮播图相关
				current: 0,
				mode: 'dot',
				swiperDotIndex: 0,
				// 商品详情对象
				goods_info: {},
				// 左侧按钮组配置项
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				// 右侧按钮组配置项
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				],
			};
		},
		computed: {
			// 参数1：模块的名称	
			// 参数2： [要映射的数据名称1，...]
			// 使用的时候，可以直接使用映射的数据：this.cart
			...mapState('m_cart', {
				cart: state => state.cart
			}),
			...mapGetters('m_cart', ['total'])
		},
		watch: {
			total: {
				immediate: true,
				handler(newVal) {
					const findCartBtn = this.options.find(x => x.text === '购物车')
					if (findCartBtn) {
						// 动态给购物车按钮的徽章赋值
						findCartBtn.info = newVal
					}
				}
			}
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
		},
		methods: {
			clickItem(e) {
				this.swiperDotIndex = e
			},
			change(e) {
				this.current = e.detail.current;
			},
			async getGoodsDetail(goods_id) {
				const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
				if (res.meta.status !== 200) return uni.$showMsg()
				// 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
				// 解决 .webp 格式图片在 ios 设备上无法正常显示的问题:使用字符串的 replace() 方法，将 webp 的后缀名替换为 jpg 的后缀名
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
				// 为 data 中的数据赋值
				this.goods_info = res.message
			},
			// 预览图片
			preview(index) {
				uni.previewImage({
					// 所有图片url地址
					urls: this.goods_info.pics.map(x => x.pics_big),
					// 预览时默认显示的图片索引
					current: index
				})
			},
			onClick(e) {
				// {
				// 	index: 0,
				// 	content: {
				// 		icon: 'shop',
				// 		text: '店铺'
				// 	}
				// }
				console.log(e)
				if (e.content.text === '购物车') {
					// 切换到购物车页面
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				// {
				// 	index: 0,
				// 	content: {
				// 		text: '加入购物车',
				// 		backgroundColor: '#ff0000',
				// 		color: '#fff'
				// 	}
				// }
				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goods_info.goods_id,
						goods_id: this.goods_info.goods_id,       // 商品的Id
						goods_name: this.goods_info.goods_name,   // 商品的名称
						goods_price: this.goods_info.goods_price, // 商品的价格
						goods_count: 1,                           // 商品的数量
						goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
						goods_state: true                         // 商品的勾选状态
					}
					this.addToCart(goods)
				}
			},
			...mapMutations('m_cart', ['addToCart'])
		}
	}
</script>

<style lang="scss">
	.goods-detail-container {
		// 防止底部导航内容遮盖
		padding-bottom: 50px;
	}
	.swiper-box {
		height: 750rpx;
	}
	.swiper-item, .image {
		width: 100%;
		height: 100%;
	}
	.goods-info-box {
		padding: 10px;
		padding-right: 0;
		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}
		.goods-info-body {
			display: flex;
			justify-content: space-between;
			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}
			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}
		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}
	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>
