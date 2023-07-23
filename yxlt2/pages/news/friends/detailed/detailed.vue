<template>
	<view class="center">
		<view class="user">
			<image v-if="user.avatar" class="logo-img-avatar" :src="user.avatar"></image>
			<image v-else class="logo-img-avatar" src="@/static/uni-center/defaultAvatarUrl.png"></image>
			<view class="logo-title">
				<text class="user-name-nick" v-if="user.nickname">{{user.nickname}}</text>
				<text class="user-name-nick" v-else>无昵称</text>
				<text class="user-name-user">账号:{{user.username}}</text>
			</view>
		</view>
		<uni-list  class="center-list">
			<uni-list-item :clickable="true" @click="toChat(user.id)" class="add">
				<template v-slot:body>
					<text>发起聊天</text>
				</template>
			</uni-list-item>
			<uni-list-item :clickable="true" @click="deleteFriends()" class="add">
				<template v-slot:body>
					<text>删除好友</text>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
	
</template>

<script>
	import userApi from "@/common/api/userApi.js"
	import friendsUserApi from "@/common/api/friendsUserApi.js"
import utils from "../../../../common/utils/utils"
	export default {
		data() {
			return {
				user:{},
				toUserId:"",
				deleteDate:{
					formUserId:"",
					toUserId:"",
					status:""
				},
			}
		},
		onLoad(e) {
			this.deleteDate.formUserId=utils.getCookieUser().id
			this.deleteDate.toUserId=e.userId
			this.toUserId=e.userId
			this.getUserById(this.toUserId)
		},
		methods: {
			getUserById(toUserId){
				userApi.getUserById(toUserId).then(res=>{
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					this.user=res.data.data
				}).catch(err=>{
						console.log('error', err)
				})
			},
			toChat(toUserId){
				uni.navigateTo({
					url:"/pages/news/chat/chat?toUserId="+toUserId
				})
				// uni.navigateTo({
				// 	url:"/pages/news/gd/gd?name="+toName+'&toUserId='+toUserId
				// })
			},
			deleteFriends(){
				this.deleteDate.status="-1"
				friendsUserApi.updateStatus(this.deleteDate).then(res=>{
					utils.thenMathod(res)
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style>
/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	page {
		background-color: #f8f8f8;
	}
	/* #endif*/

	.center {
		flex: 1;
		flex-direction: column;
		background-color: #f8f8f8;
	}

	.user {
		width: 750rpx;
		padding: 20rpx;
		padding-top: 50rpx;
		background-image: url(../../static/uni-center/headers.png);
		flex-direction: column;
		align-items: center;
	}
	.logo-img-avatar{
		width: 130rpx;
		height: 130rpx;
		position: relative;
		top: 20rpx;
		right: 250rpx;
	}
	.logo-title {
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
	}

	.user-name-nick{
		position: relative;
		height: 50rpx;
		font-size: 30rpx;
		color: #000000;
		top: -140rpx;
		right: 50rpx;
	}
	
	.user-name-user {
		position: relative;
		height: 100rpx;
		font-size: 25rpx;
		color: #434343;
		top: -50rpx;
		right: 100rpx;
	}

	.add{
			display: flex;
			flex-direction: column;
	}
</style>
