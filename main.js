
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store/store.js'
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 配置请求的根路径
$http.baseUrl = 'https://www.uinav.com'
// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	// 交互反馈 - 显示loading提示框
	uni.showLoading({
		// 提示的文字内容
		title: '数据加载中...'
	})
}
// 请求结束之后做一些事情
$http.afterRequest = function() {
	// 关闭提示框
	uni.hideLoading()
}
uni.$showMsg = function(title = '数据加载失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif