<template>
	<view class="my-search-container" :style="{'background-color': bgColor}">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}" @click="searchBoxHandle">
		  <uni-icons type="search" size="17"></uni-icons>
		  <text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props: {
			// 背景颜色
			bgColor: {
				default: '#C00000',
				type: String
			},
			// 圆角大小
			radius: {
				default: 18,
				type: Number
			}
		},
		data() {
			return {
				searchValue: ''
			};
		},
		methods: {
			searchBoxHandle() {
				// 触发父级元素绑定的click事件
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		// background-color: #C00000;
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		.my-search-box {
			height: 36px;
			background-color: #ffffff;
			// border-radius: 15px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.placeholder {
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>