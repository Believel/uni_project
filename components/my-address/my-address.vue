<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="!hasAddress">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>
	
		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else>
			<view class="row1">
			  <view class="row1-left">
				<view class="username">收货人：<text>{{address.userName}}</text></view>
			  </view>
			  <view class="row1-right">
				<view class="phone">电话：<text>{{address.telNumber}}</text></view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			  </view>
			</view>
			<view class="row2">
			  <view class="row2-left">收货地址：</view>
			  <view class="row2-right">{{addstr}}</view>
			</view>
		</view>
		
		<!-- 底部的边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 收获地址
				address: {}
			}
		},
		computed: {
			hasAddress() {
				return Object.keys(this.address).length > 0
			},
			// 收货详细地址的计算属性
			addstr() {
				if (!this.address.provinceName) return ''
		
				// 拼接 省，市，区，详细地址 的字符串并返回给用户
				return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
			}
		},
		methods: {
			chooseAddress() {
				// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
				//    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
				const [err, succ] = await uni.chooseAddress().catch(err => err)
			
				// 2. 用户成功的选择了收货地址
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
				  // 为 data 里面的收货地址对象赋值
				  this.address = succ
				}
			}
		}
	}
</script>

<style lang="scss">
.address-border {
	display: block;
	width: 100%;
	height: 5px;
}
// 选择收获地址的盒子
.address-choose-box {
	height: 90px;
	display: flex;
	align-items: center;
	justify-content: center;
}
// 收获信息的盒子
.address-info-box {
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;
	.row1 {
		display: flex;
		justify-content: space-between;
		.row1-right {
			display: flex;
			align-items: center;
			.phone {
				margin-right: 5px;
			}
		}
	}
	.row2 {
		display: flex;
		align-items: center;
		margin-top: 10px;
		.row2-left {
			white-space: nowrap;
		}
	}
}
</style>
