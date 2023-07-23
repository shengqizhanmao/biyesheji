<template>
	<view class="app-background-height">
		<uni-list class="center-list">
			<uni-list-item  :title="sublist.title" link 
				 :to="sublist.to" :show-extra-icon="true"
				:extraIcon="{type:sublist.icon,color:'#999'}">
			</uni-list-item>
		</uni-list>
		<uni-list>
			<uni-list-item clickable="true" @click="logout()" class="Logout">
				<template v-slot:body>
					<text >退出登录</text>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import utils from "@/common/utils/utils.js"
	import loginApi from "@/common/api/loginApi.js"
	export default {
		data() {
			return {
				sublist:{
					"title":"关于",
					"to": "",
					"icon": "info"
				}
			}
		},
		methods: {
			logout() {
				loginApi.Logout().then(res => {
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					utils.showToast('success', res.data.msg)
					utils.deleteCookieUser()
					utils.deleteCookieToken()
					uni.$emit('logout',{msg:'关闭webSocket连接'})
					uni.$emit('logout-data',{msg:'清空数据'})
					setTimeout(() => {
						uni.switchTab({
							url: "/pages/my/my"
						});
					}, 500)
				}).catch(err => {
					console.log('err', err);
				})
			},
		}
	}
</script>

<style>
	.Logout{
		display: flex;
		flex-direction: column;
	}
	.center-list {
		margin-bottom: 30rpx;
		background-color: #f9f9f9;
	}
	
	.center-list-cell {
		width: 750rpx;
		background-color: #007AFF;
		height: 40rpx;
	}
	.item-footer {
		flex-direction: row;
		align-items: center;
	}

	.item-footer-text {
		color: #999;
		font-size: 24rpx;
		padding-right: 10rpx;
	}


	
</style>
