<template>
	<!-- 聊天界面 -->
	<view v-for="item in valueList">
		<!-- 时间 -->
		<view class="date">
			{{item.createdDate}}
		</view>
		<!-- 用户发送的信息 -->
		<view class="main-toUser" v-if="item.formUserId!=formUser.id">
			<image class="avatar" @click="toFriendsDetailed(toUser.id)" :src="toUser.avatar"></image>
			<view class="msg">
				<uni-card class="card">
					<text class="text">{{item.msg}}</text>
				</uni-card>
			</view>
		</view>
		<!-- 对方用户发送的信息 -->
		<view class="main-formUser" v-else>
			<view class="msg">
				<uni-card class="card">
					<text class="text">{{item.msg}}</text>
				</uni-card>
			</view>
			<image class="avatar" :src="formUser.avatar"></image>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			toUser: {},
			valueList: [],
			formUser: {},
		},
		name: "chatBox",
		data() {
			return {};
		},
		methods:{
			toFriendsDetailed(userId){
				uni.navigateTo({
					url:"/pages/news/friends/detailed/detailed?userId="+userId
				})
			}
		}
	}
</script>

<style>
	.text {
		direction: ltr;
		text-align: left;
		/* max-width: 95%; */
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.date {
		clear: both;
		text-align: center;
		float: center;
		font-size: 12rpx;
		color: #919191;
	}

	.main-toUser {
		clear: both;
		width: 95%;
		padding-left: 40rpx;
		padding-top: 0rpx;
		display: -webkit-box;
		padding-bottom: 40rpx;
	}

	.main-toUser .avatar {
		width: 80rpx;
		height: 80rpx;
		margin-top: 40rpx;
		border-radius: 10rpx;
	}

	.main-toUser .msg {
		max-width: 600rpx;
	}

	.main-toUser .msg-form {
		max-width: 600rpx;
	}

	.main-toUser .card {
		background-color: #1bef22;
	}

	.main-formUser {
		clear: both;
		text-align: right;
		float: right;
		padding-right: 40rpx;
		padding-top: -10rpx;
		display: -webkit-box;
		padding-bottom: 40rpx;
	}

	.main-formUser .msg {
		clear: both;
		max-width: 600rpx;
		text-align: left;
		padding: 10rpx
	}

	.main-formUser .avatar {
		width: 80rpx;
		height: 80rpx;
		margin-top: 40rpx;
		border-radius: 10rpx;
	}

	.main-formUser .msg-form {
		max-width: 600rpx;
	}

	.main-formUser .card {
		background-color: #ffffff;
	}
</style>
