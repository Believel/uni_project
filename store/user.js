export default {
	namespaced: true,
	// state 数据
	state: () => ({
		// 收货地址
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
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