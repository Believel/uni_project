export default {
	// 为当前模块开启命名空间
	namespaced: true,
	state: () => ({
		// 购物车数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
	    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations: {
		// 加入购物车
		addToCart(state, goods) {
			const findGood = state.cart.find(x => x.goods_id === goods.goods_id)
			// 如果购物车中没有这件商品，则直接 push
			if (!findGood) {
				state.cart.push(goods)
			} else {
				// 如果购物车中有这件商品，则只更新数量即可
				findGood.goods_count++
			}
			// 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
			this.commit('m_cart/saveToStorage')
		},
		// 将购物车信息持久化本地存储
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车中商品的勾选状态
		updateGoodsState(state, goods) {
			const findGoods = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findGoods) {
				findGoods.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新商品数量
		updateGoodsCount(state, goods) {
			const findGoods = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findGoods) {
				findGoods.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		// 根据 Id 从购物车中删除对应的商品信息
		removeGoodsById(state, goods_id) {
			start.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		}
	},
	getters: {
		// 购物车总数量
		total(state) {
			return state.cart.reduce((current, next) => {
				return current + next.goods_count
			}, 0)
		}
	}
}