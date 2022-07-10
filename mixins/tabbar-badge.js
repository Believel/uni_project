import { mapGetters } from 'vuex'
// 导出一个 minxins对象
export default {
	onShow() {
		// 在页面显示的时候设置徽章
		this.setBadge()
	},
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	watch: {
		// 监听 total 值的变化，重新设置购物车的徽标数目
		total() {
			this.setBadge()
		}
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + '' // // 注意：text 的值必须是字符串，不能是数字
			})
		}
	}
}