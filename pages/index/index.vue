<template>
	<view class="container">
		<uni-list v-for="(item,index) in news">
			<uni-list-item
				:thumb="item.author_avatar"
				:title="item.title"
				:note="item.summary"
				:key="index"
				link
				@click="goDetail($event, item.post_id)"
			>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news: []
			}
		},
		onLoad: function() {
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/api/news',
				method: "GET",
				data: {},
				success: (res) => {
					console.log(res)
					this.news = res.data
				},
				fail: () => {
					
				},
				complete: () => {
					
				}
			})
		},
		methods: {
			goDetail(e, newsid) {
				uni.navigateTo({
					url: `../info/info?newsid=${newsid}`
				})
			}
		}
	}
</script>

<style>

</style>
