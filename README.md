
> [文档](https://applet-base-api-t.itheima.net/docs-uni-shop/index.htm)
# 知识点
1. 使用第三方包发起网络请求：支持拦截器等全局定制的功能
	* 安装`npm install @escook/request-miniprogram`
	* 在`main.js`进行配置
	```js
	// 按需导入 $http 对象
	import { $http } from '@escook/request-miniprogram'
	// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
	uni.$http = $http
	// 配置请求的根路径
	$http.baseUrl = "https://www.uinav.com"
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
	```
2. 配置小程序分包
> 分包可以减少小程序首次启动时的加载时间

* 在项目根目录中，创建分包的根目录，命名为`subpkg`
* 在`pages.json`中，和`pages`节点平级的位置声明`subPackages`节点，用来定义分包相关的结构
```js
"subPackages": [
		{
			"root": "subpkg",
			"pages": [
				
			],
		}
	],
```
3. 封装全局的调用方法
	* 在`main.js`中，为`uni`对象挂载自定义的方法：如`$showMsg()`
	```js
	uni.$showMsg = function(title = '数据加载失败', duration = 1500) {
		uni.showToast({
			title,
			duration,
			icon: 'none'
		})
	}
	```
	* 今后在使用时直接用`uni.$showMsg()`方法即可