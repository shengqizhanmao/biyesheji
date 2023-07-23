<template>
	<!-- 卡片文章,作者查看自己帖子 -->
	<view>
		<uni-card class="card" :sub-title="article.createDate" :title="article.title" :extra="article.nickname"
			:is-shadow="true">
			<view @click="toLooke">
				<text>{{article.summary}}</text>
				<br />
				<image class="image" :src="article.frontCover"></image>
			</view>
			<template v-slot:actions>
				<view class="actions">
					<uni-icons type="hand-up" size="25" color="#999"></uni-icons>
					<text class="actions-text">{{article.likesCounts}}</text>
				</view>
				<view class="actions">
					<uni-icons type="eye" size="25" color="#999"></uni-icons>
					<text class="actions-text">{{article.viewCounts}}</text>
				</view>
				<view class="actions">
					<uni-icons type="chatbubble" size="25" color="#999"></uni-icons>
					<text class="actions-text">{{article.commentCounts}}</text>
				</view>
				<view class="actions">
					<uni-icons type="heart" size="25" color="#999"></uni-icons>
					<text class="actions-text">{{article.collectionCounts}}</text>
				</view>
				<view v-if="manageDate" class="actions-clear" style="">
					<button @click="revise" class="mini-btn" type="primary"><text class="button-text">修改</text></button>
					<button @click="deleteArticle" class="mini-btn2" type="warn"><text class="button-text">删除</text></button>
				</view>
				<view class="actions-clear" style=""></view>
			</template>
		</uni-card>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog
			 type="success"
			  cancelText="取消" 
			  confirmText="确实" 
			  content="确定删除吗" 
			  @confirm="dialogConfirm()">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "card-article",
		props: {
			article: {},
			manageDate: false,
		},
		emits:['to-looke','revise','delete-article'],
		data() {
			return {

			};
		},
		methods: {
			toLooke() {
				this.$emit('to-looke')
			},
			revise(){
				this.$emit('revise')
			},
			deleteArticle(){
				this.$refs.alertDialog.open()
			},
			dialogConfirm(){
				this.$emit('delete-article')
			}
		}
	}
</script>

<style>
	.image {
		width: 350rpx;
		height: 450rpx;
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

	.mini-btn {
		float: left;
		max-width: 200rpx;
		/* height: 100rpx; */
		margin-left: 100rpx;
	}

	.mini-btn2 {
		float: left;
		max-width: 200rpx;
		/* height: 100rpx; */
		margin-left: 100rpx;
	}

	.button-text {
		float: left;
		font-size: 30rpx;
	}
</style>
