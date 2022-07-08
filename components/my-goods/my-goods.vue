<template>
	<view class="goods-item">
	  <!-- 商品左侧图片区域 -->
	  <view class="goods-item-left">
		  <!-- radio 按钮 -->
		<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
		<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
	  </view>
	  <!-- 商品右侧信息区域 -->
	  <view class="goods-item-right">
		<!-- 商品标题 -->
		<view class="goods-name">{{goods.goods_name}}</view>
		<view class="goods-info-box">
		  <!-- 商品价格 -->
		  <view class="goods-price">￥{{formatPrice(goods.goods_price)}}</view>
		  <!-- 商品数量 -->
		  <uni-number-box :min="1" v-model="goods.goods_count" @change="numberChange" v-if="showNum"></uni-number-box>
		</view>
	  </view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			},
			// 是否展示图片左侧的 radio
			showRadio: {
				type: Boolean,
				default: false
			},
			// 是否展示价格右侧的 NumberBox 组件
			showNum: {
			  type: Boolean,
			  default: false,
			},
		},
		data() {
			return {
				// 默认图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		methods: {
			formatPrice(num) {
				return Number(num).toFixed(2)
			},
			radioClickHandler() {
				// 向父级传递消息
				this.$emit('radio-change', {
					// 商品id
					goods_id: this.goods.goods_id,
					// 商品的勾选状态
					goods_state: !this.goods.goods_state
				})
			},
			numberChange(value) {
				this.$emit('num-change', {
					// 商品id
					goods_id: this.goods.goods_id,
					// 商品的最新数量
					goods_count: +value
				})
			}
		},
		// 小程序上面不生效
		// filters: {
		//   // 把数字处理为带两位小数点的数字
		//   tofixed(num) {
		//     return Number(num).toFixed(2)
		//   }
		// }
	}
</script>

<style lang="scss">
.goods-item {
	// 让 goods-item 项占满整个屏幕的宽度
	width: 750rpx;
	box-sizing: border-box;
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
	flex: 1;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
	.goods-info-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
  }
}
</style>