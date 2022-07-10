<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="!hasAddress">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>
	
		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
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
	import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['hasAddress', 'addstr'])
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),
			chooseAddress() {
				const that = this
				// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
				//    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
				uni.chooseAddress({
					success(res) {
						that.updateAddress(res)
					},
					fail(err) {
						// 不是主动取消选择，就去重新发起授权
						if (err.errMsg !== 'chooseAddress:fail cancel') {
							// 向用户重新发起授权申请
							that.reAuth()
						}
						
					}
				})
			},
			// 调用此方法，重新发起收货地址的授权
			async reAuth() {
			  // 3.1 提示用户对地址进行授权
			  const [err2, confirmResult] = await uni.showModal({
			    content: '检测到您没打开地址权限，是否去设置打开？',
			    confirmText: "确认",
			    cancelText: "取消",
			  })
			
			  // 3.2 如果弹框异常，则直接退出
			  if (err2) return
			
			  // 3.3 如果用户点击了 “取消” 按钮，则提示用户 “您取消了地址授权！”
			  if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
			
			  // 3.4 如果用户点击了 “确认” 按钮，则调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
			  if (confirmResult.confirm) return uni.openSetting({
			    // 3.4.1 授权结束，需要对授权的结果做进一步判断
			    success: (settingResult) => {
			      // 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
			      if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
			      // 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
			      if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
			    }
			  })
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
