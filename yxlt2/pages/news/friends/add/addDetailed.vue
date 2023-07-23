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
			<uni-list-item :clickable="true" @click="add()" class="add">
				<template v-slot:body>
					<text>添加</text>
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
				addDate:{
					formUserId:"",
					toUserId:""
				},
			}
		},
		onLoad(e) {
			this.addDate.formUserId=utils.getCookieUser().id
			console.log(e.userId)
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
			add(){
				this.addDate.toUserId=this.toUserId
				console.log(this.addDate)
				friendsUserApi.addFriendsUser(this.addDate).then(res=>{
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					utils.showToast("success","申请好友成功")
				}).catch(err=>{
					console.log('error', err)
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
