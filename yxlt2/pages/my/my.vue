<template>
	<view class="center">

		<view class="userInfo">
			<image class="user-img-avatar" v-if="userInfo.avatar" :src="userInfo.avatar"></image>
			<image class="user-img-avatar" v-else-if="userInfo.userName" src="@/static/uni-center/defaultAvatarUrl.png"></image>
			<image v-else class="user-img-noAvatar" src="@/static/uni-center/defaultAvatarUrl.png" @click="toUserInfo()"></image>
			<view >
				<view class="user-name-nick" v-if="userInfo.nickName">{{userInfo.nickName}}</view>
				<view class="user-name-nick" v-else-if="userInfo.userName">无昵称</view>
				<view class="user-name" v-else>未登录</view>
				<view class="user-name-user" v-if="userInfo.userName">账号:{{userInfo.userName}}</view>
				<uni-icons class="user-icons" v-if="userInfo.userName" type="forward" size="30" @click="toUser()">
				</uni-icons>
			</view>
		</view>

		<uni-grid class="grid" :column="4" :showBorder="false" :square="true">
			<uni-grid-item class="item" v-if="userInfo.userName" v-for="(item,index) in noGridList"
				@click="tapGrid(item.to)" :key="index">
				<uni-icons class="icon" color="#007AFF" :type="item.icon" size="26"></uni-icons>
				<text class="text">{{item.text}}</text>
			</uni-grid-item>
		</uni-grid>
		<uni-list class="center-list">
			<uni-list-item v-if="userInfo.userName" v-for="(item,i) in noUcenterList" :title="item.title" link :key="i"
				:clickable="true" :to="item.to" :show-extra-icon="true" :extraIcon="{type:item.icon,color:'#999'}">
				<template v-slot:footer>
					<view v-if="item.showBadge" class="item-footer">
						<text class="item-footer-text"></text>
						<view class="item-footer-badge"></view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import utils from "@/common/utils/utils.js"
	export default {
		data() {
			return {
				userInfo: {
					avatar: "",
					userName: "",
					nickName: ""
				},
				noGridList: [{
						"text": "个人信息",
						"icon": "chat",
						"to":"/pages/my/user/user"
					},
					{
						"text": "好友",
						"icon": "contact",
						"to": "/pages/news/friends/friends"
					},
					{
							"text": "收藏",
							"icon": "starhalf",
							"to":"/pages/my/collect/collect"
						}
				],

				noUcenterList: [{
					"title": "设置",
					"to": "/pages/my/config/config",
					"icon": "gear"
				}],
				listStyles: {
					"height": "150rpx", // 边框高度
					"width": "150rpx", // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#eee", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "100%" // 边框圆角，支持百分比
					}
				},
			}
		},
		onShow() {
			if (utils.getCookieUser()) {
				this.userInfo = utils.getCookieUser()
			} else {
				this.userInfo = {
					avatar: "",
					userName: "",
					nickName: ""
				}
			}
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh()
				location.reload()
			}, 1000);
		},
		computed: {},
		methods: {
			toUserInfo() {
				uni.navigateTo({
					url: "/pages/my/Login/Login"
				})
			},
			tapGrid(item) {
				console.log(item)
				uni.navigateTo({
					url: item
				})
			},
			toUser() {
				uni.navigateTo({
					url: "/pages/my/user/user"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

	.center {
		background-color: #f8f8f8;
		height: 100vh;

	}

	.userInfo {
		width: 750rpx;
		padding: 20rpx;
		padding-top: 80rpx;
		background-image: url(../../static/uni-center/headers.png);
		align-items: center;
		height: 240rpx;
	}

	.user-img-avatar {
		width: 130rpx;
		height: 130rpx;
		float: left;
		padding-left: 40rpx;
	}
	
	.user-img-noAvatar {
		float: left;
		width: 130rpx;
		height: 130rpx;
		border-radius: 150rpx;
		padding-left: 270rpx;
		
	}
	
	.user-name {
		clear: both;
		float: left;
		padding-left: 270rpx;
		font-size: 38rpx;
		color: #FFFFFF;
	}

	.user-name-nick {
		height: 50rpx;
		width: 300rpx;
		font-size: 30rpx;
		color: #000000;
		padding-left: 200rpx;
	}

	.user-name-user {
		padding-left: 30rpx;
		float: left;
		font-size: 25rpx;
		color: #434343;
	}

	.user-icons {
		position: relative;
		top: -20rpx;
		left: 300rpx;
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

	.grid {

		background-color: #FFFFFF;
		margin-bottom: 20rpx;
	}

	.uni-grid .text {
		font-size: 30rpx;
		line-height: 50rpx;
		color: #817f82;
	}

	.uni-grid .item ::v-deep .uni-grid-item__box {
		justify-content: center;
		align-items: center;
	}


	/*修改边线粗细示例*/
	/* #ifndef APP-NVUE */
	.center-list ::v-deep .uni-list--border:after {
		-webkit-transform: scaleY(0.2);
		transform: scaleY(0.2);
		margin-left: 80rpx;
	}

	.center-list ::v-deep .uni-list--border-top,
	.center-list ::v-deep .uni-list--border-bottom {
		display: none;
	}

	/* #endif */
	.item-footer {
		flex-direction: row;
		align-items: center;
	}

	.item-footer-text {
		color: #999;
		font-size: 24rpx;
		padding-right: 10rpx;
	}

	.item-footer-badge {
		width: 20rpx;
		height: 20rpx;
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-radius: 10rpx;
		/* #endif */
		background-color: #DD524D;
	}
</style>
