import { createStore} from 'vuex'
import moduleCart from './cart.js'
import moudleUser from './user.js'

// 创建 store 的实例对象
const store = createStore({
	// 挂载store模块
	modules: {
		// 模块内成员的访问路径调整为：m_cart
		m_cart: moduleCart,
		// 挂载用户的 vuex 模块，访问路径为 m_user
		m_user: moudleUser
	}
})

export default store