export default {
	namespaced: true,
	// state 数据
	state: () => ({
		// 收货地址
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// 登录成功之后的 token 字符串
		token: uni.getStorageSync('token') || '',
		// 用户基本信息
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
	}),
	// 同步方法
	mutations: {
		// 更新收获地址
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		// 1. 定义将 address 持久化存储到本地 mutations 方法
		saveAddressToStorage(state) {
		  uni.setStorageSync('address', JSON.stringify(state.address))
		},
		// 更新用户的基本信息
		updateUserInfo(state, userinfo) {
		    state.userinfo = userinfo
		    // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
		    this.commit('m_user/saveUserInfoToStorage')
		},
		// 将用户基本信息持久化存储到本地
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		// 更新 token 字符串
		updateToken(state, token) {
		    state.token = token
		    // 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
		    this.commit('m_user/saveTokenToStorage')
		},
		
		// 将 token 字符串持久化存储到本地
		saveTokenToStorage(state) {
		    uni.setStorageSync('token', state.token)
		}
	},
	getters: {
		hasAddress(state) {
			return Object.keys(state.address).length > 0
		},
		// 收货详细地址的计算属性
		addstr(state) {
			if (!state.address.provinceName) return ''
				
			// 拼接 省，市，区，详细地址 的字符串并返回给用户
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}