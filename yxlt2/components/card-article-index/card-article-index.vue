<template>
	<view>
		<uni-card v-for="item in articleList" class="articl-card" :is-shadow="true">
			<template v-slot:title>
				<view>
					<!-- 头像 -->
					<view>
						<image class="article-title-img"
							:src="item.avatar">
						</image>
					</view>
					<!-- 作者和时间 -->
					<view>
						<view class="article-title-nick">{{item.nickname}}</view>
						<view class="article-title-date">{{item.createDate}}</view>
					</view>
					<!-- 分类 -->
					<view class="article-title-category">
						<button size="mini" class="article-title-category-button">{{item.category.name}}</button>
					</view>
				</view>
			</template>
				<!-- 标题 -->
			<view @click="toLooke(item.id)" style="clear: both;">
				<view class="article-title-name">{{item.title}}</view>
				<view class="fengexian">	</view>
				<text>{{item.summary}}</text>
				<br />
				<image class="image" :src="item.frontCover"></image>
			</view>
			<!-- <view class="fengexian">/view> -->
			<!--标签  -->
			<view class="article-tille-tags" v-for="item2 in item.tagsList">
				<uni-tag class="article-tille-tags-item" :text="item2.name" inverted="true" type="success"></uni-tag>
			</view>
			<view class="fengexian"></view>
			<!-- 点赞、观看人数、评论人数、收藏 -->
			<template v-slot:actions>
				<view class="actions">
					<uni-icons type="hand-up" size="25" color="#999"></uni-icons>
					<text class="actions-text">{{item.likesCounts}}</text>
				</view>
				<view class="actions">
					<uni-icons type="eye" size="25" color="#999"></uni-icons>
					<text class="actions-text">{{item.viewCounts}}</text>
				</view>
				<view class="actions">
					<uni-icons type="chatbubble" size="25" color="#999"></uni-icons>
					<text class="actions-text">{{item.commentCounts}}</text>
				</view>
				<view class="actions">
					<uni-icons type="heart" size="25" color="#999"></uni-icons>
					<text class="actions-text">{{item.collectionCounts}}</text>
				</view>
				<view class="actions-clear"></view>
			</template>
		</uni-card>
	</view>
</template>

<script>
	export default {
		name: "card-article-index",
		props:{
			articleList:""
		},
		data() {
			return {

			};
		},
		methods:{
			toLooke(id) {
				uni.navigateTo({
					url:"/pages/index/article/article?id="+id
				})
			}
		}
	}
</script>

<style>
	.image{
		max-width: 300rpx;
		max-height: 300rpx;
	}
	.articl-card {
		float: left;
		margin-top: 20rpx;
		clear: both;
		width: 650rpx;
	}

	.article-title-img {
		float: left;
		width: 80rpx;
		height: 80rpx;
		border-radius: 45rpx;
		margin-top: 40rpx;
		margin-left: 10rpx;
	}

	.article-title-nick {
		margin-top: 40rpx;
		margin-left: 10rpx;
		float: left;
		font-size: 20rpx;
	}

	.article-title-date {
		float: left;
		margin-top: 80rpx;
		margin-left:0rpx;
		font-size: 20rpx;
		color: #a6a6a6;
	}
	.article-title-category {
		float: right;
		margin-top: 40rpx;
		margin-left:-45rpx;
		color: #1878cc
	}
	.article-title-category-button {
		max-width: 200rpx;
		font-size: 10rpx;
	}
	
	.article-tille-tags {
		float: left;
	}
	.article-tille-tags-item{
		font-size:10rpx;
		margin-left: 12rpx;
	}
	.article-title-name {
		clear: both;
		float: left;
		margin-top: 20rpx;
		margin-left: 10rpx;
		font-size: 30rpx;
	}

	.fengexian {
		clear: both;
		width: 400rpx;
		height: 2rpx;
		border-top: 1px solid #efefef;
	}

	.actions {
		float: left;
		margin-left: 60rpx;
	}

	.actions-text {
		float: right;
		margin-top: 10rpx;
		margin-left: 0rpx;
	}

	.actions-clear {
		clear: both;
		height: 40rpx;
	}
</style>
