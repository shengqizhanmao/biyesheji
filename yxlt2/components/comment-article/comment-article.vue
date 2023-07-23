<template>
	<!-- 评论区 -->
	<view v-for="item in commentList">
		<!-- 头像、昵称、层数、删除按钮 -->
		<view>
			<view class="avatar">
				<image class="image" :src="item.author.avatar"></image>
			</view>
			<view class="nicknameLeft">
				<view class="nickname">{{item.author.nickname}}</view>
				<view class="layer">{{item.layer}}F</view>
			</view>
			<view class="delete" v-if="userInfo && userInfo.id===item.author.id"><button class="delete-button" size="mini" @click="deleteComment(item.id)">删除</button></view>
		</view>
		<!-- 评论内容 -->
		<view class="content">{{item.content}}</view>
		<!-- 子评论 -->
		<view v-if="item.childrens.length!=0">
			<view class="child" >
				<view v-for="item2 in item.childrens">
					<!-- 评论人的信息,头像、昵称、回复用户昵称、删除按钮、评论内容、回复 -->
					<view class="child-image"><image class="image2" :src="item2.author.avatar"></image> </view>
					<view class="child-nickname" v-if="item2.parentId==item.id">{{item2.author.nickname}}:</view>
					<view class="child-nickname" v-else>{{item2.author.nickname}}回复{{item2.toUser.nickname}}</view>
					<view class="child-delete"   v-if="userInfo &&userInfo.id===item2.author.id"><button class="child-delete-button" size="mini" @click="deleteComment(item2.id)">删除</button></view>
					<view class="child-content">{{item2.content}}</view>
					
					<view class="child-pl">
						<view class="child-createDate">{{item2.createDate}}</view>
						<button class="child-pl-button" size="mini" @click="reply(item2.id,item2.author.id)">回复</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 回复、评论时间 -->
		<view class="pl">
			<view class="pl-createDate">{{item.createDate}}</view>
			<button class="pl-button" size="mini" @click="reply(item.id,item.author.id)">回复</button>
		</view>
		<!-- 下划线 -->
		<view class="fengexian2"></view>
	</view>
</template>

<script>
	export default {
		name: "comment-article",
		props: {
			commentList: {},
			userInfo:{},
		},
		emits: ['reply','deleteComment'],
		data() {
			return {
			};
		},
		methods: {
			//回复评论
			reply(parentId, userId) {
				this.$emit('reply', parentId, userId)
			},
			//删除评论
			deleteComment(parentId){
				this.$emit('deleteComment', parentId)
			}
		}
	}
</script>

<style>
	.fengexian2 {
		clear: both;
		width: 650rpx;
		height: 2rpx;
		border-top: 2rpx solid #cacaca;
		float: left;
		margin-bottom: 100rpx;
	}

	.image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 45rpx;
	}
	.image2{
		width: 50rpx;
		height: 50rpx;
		border-radius: 45rpx;
	}
	.avatar {
		float: left;
	}

	.nicknameLeft {
		float: left;
		margin-left: 20rpx;
	}

	.nickname {
		float: left;
	}
	.delete {
		color: #00aaaa;
		margin-left: 10rpx;
		margin-top: 10rpx;
		float: right;
	}
	.delete-button {
		float: right;
		font-size: 12rpx;
	}
	.layer {
		clear: both;
		/* float: left; */
		font-size: 19rpx;
	}

	.content {
		clear: both;
		margin-left: 95rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	/* 子评论 */
	.child {
		clear: both;
		background-color: #e2e2e2;
		min-width: 450rpx;
		min-height: 70rpx;
		margin-left: 100rpx;
		float: left;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}
	.child-image{
		clear: both;
		color: #00aaaa;
		margin-left: 10rpx;
		margin-top: 10rpx;
		float: left;
	}
	.child-nickname {
		color: #00aaaa;
		margin-left: 10rpx;
		margin-top: 10rpx;
		float: left;
	}
	.child-delete {
		color: #00aaaa;
		margin-left: 10rpx;
		margin-top: 10rpx;
		float: right;
	}
	.child-delete-button {
		float: right;
		font-size: 12rpx;
	}
	
	.child-content {
		float: left;
		clear: both;
		margin-left: 40rpx;
		/* margin-top: 10rpx; */
	}

	.child-pl {
		margin-top: 10rpx;
		clear: both;
		/* float: right; */
	}

	.child-createDate{
		float: left;
		font-size: 12rpx;
		margin-bottom: 20rpx;
	}

	.child-pl-button {
		float: right;
		font-size: 12rpx;
	}

	/* 评论按钮 */

	.pl {
		clear: both;
		margin-top: 20rpx;
	}

	.pl-button {
		float: right;
		font-size: 12rpx;
	}

	.pl-createDate {
		float: left;
		font-size: 12rpx;
	}
</style>
