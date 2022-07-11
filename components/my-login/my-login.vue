<template>
	<!-- 登录组件 -->
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- @getuserinfo 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo -->
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<view class="tip-text">登录后尽享更多收益</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
			// 获取微信用户的基本信息
			getUserInfo(e) {
				// 判断是否获取用户信息成功
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
				// 将用户信息存储到 vuex 中
				this.updateUserInfo(e.detail.userInfo)
				// 获取登录成功后的 Token 字符串
				this.getToken(e.detail)
			},
			getToken(info) {
				uni.login({
					async success(res){
						// 准备参数对象
						const query = {
						    code: res.code,
						    encryptedData: info.encryptedData,
						    iv: info.iv,
						    rawData: info.rawData,
						    signature: info.signature
						}
						// 换取 token
						const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
						if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
						// 2. 更新 vuex 中的 token
						this.updateToken(loginResult.message.token)
						uni.$showMsg('登录成功')
					},
					fail(err) {
						uni.$showError('登录失败！')
					}
				})
				
			},
			
		}
	}
</script>

<style lang="scss">
.login-container {
	height: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;
	// 绘制登录盒子底部的半椭圆造型
	&::after {
	    content: ' ';
	    display: block;
	    position: absolute;
	    width: 100%;
	    height: 40px;
	    left: 0;
	    bottom: 0;
	    background-color: white;
	    border-radius: 100%;
	    transform: translateY(50%);
	}
	// 登录按钮的样式
	.btn-login {
	    width: 90%;
	    border-radius: 100px;
	    margin: 15px 0;
	    background-color: #c00000;
	}
	
	// 按钮下方提示消息的样式
	.tips-text {
	    font-size: 12px;
	    color: gray;
	}
}
</style>
