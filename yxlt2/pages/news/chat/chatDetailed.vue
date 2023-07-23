<template>
	<view class="app-background-height">
		<view>
			<uni-nav-bar left-icon="left"  title="聊天信息" :shadow="true"
				:fixed="true" @clickLeft="toChat()"/>
		</view>
		<view>
			<uni-list :border="true" >
				<uni-list-item>
						<!-- 自定义 header -->
						<template v-slot:header>
							<view @click="toFriendsDetailed(toUser.id)"><image class="avatar" :src="toUser.avatar"></image></view>
						</template>
						<!-- 自定义 body -->
						<template v-slot:body>
							<text class="nickname">{{toUser.nickname}}</text>
						</template>
						<!-- 自定义 footer-->
					</uni-list-item>
			</uni-list>
<!-- 			<uni-list class="list" :border="true">
				<uni-list-item title="查看聊天记录" :clickable="true" link @click="toChat(toUserId)" />
			</uni-list> -->
		</view>
	</view>
</template>

<script>
import userApi from '../../../common/api/userApi';
import utils from '../../../common/utils/utils';
	export default {
		data() {
			return {
				toUserId:"",
				toUser:{}
			}
		},
		onLoad(e) {
			this.toUserId = e.toUserId
			this.getToUser(this.toUserId)
		},
		methods: {
			toChat(){
				// #ifndef H5
				uni.navigateBack({
					delta: 1
				})
				// #endif
				// #ifdef H5
				history.back();
				// #endif
			},
			getToUser(toUserId) {
				userApi.getUserById( toUserId).then(res => {
					utils.thenMathod(res, true)
					this.toUser = res.data.data
				}).catch(err => {
					console.log(err)
				})
			},
			toFriendsDetailed(userId){
				uni.navigateTo({
					url:"/pages/news/friends/detailed/detailed?userId="+userId
				})
			}
		}
	}
</script>

<style>
.avatar {
		width: 160rpx;
		height: 160rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
		border-radius: 10rpx;
	}
	.nickname{
		margin-top:180rpx;
		margin-left: -160rpx;
	}
	.list{
		margin-top:30rpx;
	}
</style>
