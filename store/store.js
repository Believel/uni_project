import { createStore} from 'vuex'
import moduleCart from './cart.js'

// 创建 store 的实例对象
const store = createStore({
	// 挂载store模块
	modules: {
		// 模块内成员的访问路径调整为：m_cart
		m_cart: moduleCart
	}
})

export default store