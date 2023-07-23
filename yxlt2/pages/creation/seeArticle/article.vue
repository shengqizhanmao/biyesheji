<template>
	<view>
		<!-- 页面 -->
		<view class="view">
			<scroll-view :scroll-top="scrollTop" :scroll-y="true" class="scroll-Y">
				<!-- 头像和作者 -->
				<view class="view-item">
					<view>
						<image class="avatar" :src="article.avatar"></image>
					</view>
					<view class="nickname">{{article.nickname}}</view>
					<button class="category" size="mini">{{category.name}}</button>
				</view>
				<!-- 文章和文章内容 -->
				<view style="clear: both;">
					<!-- 标题 -->
					<view class="title">{{article.title}}</view>
					<!-- 时间 -->
					<view class="date">{{article.createDate}}</view>
					<!-- 文章内容 -->
					<view class="content">
						<mp-html :content="body.contentHtml" />
					</view>
				</view>
				<!-- 标签 -->
				<view class="tags" v-for="item in article.tagsList">
					<uni-tag class="tags-item" :text="item.name" inverted="true" type="success"></uni-tag>
				</view>
				<!-- 分割线 -->
				<view class="fengexian"></view>
				<!-- 观看人数和评论人数 -->
				<view style="clear: both;">
					<view class="floatLeft">
						<uni-icons type="eye" size="25" color="#000000"></uni-icons>
						<view class="collectionCounts">{{article.viewCounts}}</view>
					</view>
					<view class="floatLeft">
						<uni-icons type="chatbubble" size="25" color="#000000"></uni-icons>
						<view class="collectionCounts">{{article.commentCounts}}</view>
					</view>
				</view>
				<!-- 评论区 -->
				<view style="clear: both;">
					<comment-article @deleteComment="deleteComment" @reply="reply" :userInfo="userInfo" :commentList="commentList"></comment-article>
				</view>
			</scroll-view>
		</view>
		<!-- 发表评论框,点赞收藏 -->
		<view class="plk">
			<!-- 评论框 -->
			<view class="easyinput">
				<uni-easyinput class="easyinput-item" @focus="focus()" placeholder="评论"></uni-easyinput>
			</view>
			<!-- 收藏 -->
			<view class="collectionCounts">
				<uni-fav class="fav" :checked="collection" @click="collectionClick()" />
				<view class="collectionCounts-item">{{article.collectionCounts}}</view>
			</view>
			<!-- 点赞 -->
			<view class="likesCount">
				<uni-fav class="fav" :star="false" :content-text="likesText" :checked="likes" @click="likesClick()" />
				<view class="likesCount-item">{{article.likesCounts}}</view>
			</view>
		</view>
		<!-- 评论弹出框 -->
		<uni-popup ref="inputDialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入评论" value="" placeholder="请输入内容"
				@confirm="commentInputSubmit"></uni-popup-dialog>
		</uni-popup>
		<!-- 第一层回复 -->
		<uni-popup ref="inputDialog2">
			<uni-popup-dialog ref="inputClose2" mode="input" title="输入评论" value="" placeholder="请输入内容"
				@confirm="commentInputSubmit"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import articleLikesCollectionApi from "@/common/api/articleLikesCollectionApi.js"
	import articleApi from "@/common/api/articleApi.js"
	import commentAPi from "@/common/api/commentApi.js"
	import utils from "@/common/utils/utils.js"
	import dateUtils from "@/common/utils/dateFormatUtils.js"
	export default {
		data() {
			return {
				userInfo:{},//登录用户
				scrollTop: -100,//初始位置
				id: "",//文章id
				status:"",
				article: {},//文章
				body: {},//文章内容
				category: {},//分类
				//点赞收藏
				collection: false,
				likes: false,
				likesText: {
					contentDefault: '点赞',
					contentFav: '已点赞'
				},
				updateLikesCollectionData:{
					"articleId": "",
					"likes": "0",
					"collection": "0"
				},
				LikesCollectionData:{},
				//评论
				commentInput: "",
				//初始评论
				commentSummit: {
					"articleId": "",
					"content": "",
					"parentId": "0",
					"toUserId": "0"
				},
				commentList:[],//评论列表
			}
		},
		onLoad(e) {
			this.id = e.id
			this.status = e.status
			this.commentSummit.articleId = e.id
			this.updateLikesCollectionData.articleId=e.id
			this.getArticle(e.id)
			this.getComment(e.id)
			this.getArticleLikesCollection(e.id)
			this.userInfo=utils.getCookieUser();
		},
		methods: {
			//获取帖子详细内容
			getArticle(id) {
				let that = this
				articleApi.getById(id).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg);
					that.article = res.data.data
					that.body = that.article.body
					that.category = that.article.category
				}).catch(err => {
					console.log(err)
				})
			},
			//点赞
			likesClick() {
				if(this.status!=="1") return utils.showToast('error', "帖子状态不能点赞");
				this.likes = !this.likes
				if(this.likes){
					this.updateLikesCollectionData.likes="1"
				}else{
					this.updateLikesCollectionData.likes="0"
				}
				let that=this
				articleLikesCollectionApi.updateByArticleId(this.updateLikesCollectionData).then(res=>{
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						that.likes = !that.likes
						return;
					}
					that.getArticle(that.id)
					that.getArticleLikesCollection(that.id)
				}).catch(err=>{
					console.log(err)
				})
			},
			//收藏
			collectionClick() {
				if(this.status!=="1"){
					 utils.showToast('error', "帖子状态不能收藏");
					return;
				} 
				this.collection = !this.collection
				if(this.collection){
					this.updateLikesCollectionData.collection="1"
				}else{
					this.updateLikesCollectionData.collection="0"
				}
				let that=this
				articleLikesCollectionApi.updateByArticleId(this.updateLikesCollectionData).then(res=>{
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						that.collection = !that.collection
						return;
					}
					that.getArticle(that.id)
					that.getArticleLikesCollection(that.id)
				}).catch(err=>{
					console.log(err)
				})
			},
			//获取当前点赞收藏信息
			getArticleLikesCollection(id){
				if(this.status!=="1") return ;
				let that=this
				articleLikesCollectionApi.getByArticleId(id).then(res=>{
					if (res.data.success === false) {
						// utils.showToast('error', res.data.msg)
						return;
					}
					that.LikesCollectionData=res.data.data
					if(that.LikesCollectionData==null){
						return;
					}
					if(that.LikesCollectionData.collection=="1"){
						that.updateLikesCollectionData.collection="1"
						that.collection=true
					}
					if(that.LikesCollectionData.likes=="1"){
						that.updateLikesCollectionData.likes="1"
						that.likes=true
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//评论
			focus() {
				this.$refs.inputDialog.open()
			},
			//评论创建
			commentInputSubmit(val) {
				if(this.status!=="1") return utils.showToast('error', "帖子状态不能收评论");
				let that=this
				this.commentSummit.content = val
				commentAPi.createComment(this.commentSummit).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					utils.showToast('success', res.data.msg)
					that.getComment(that.id)
				}).catch(err => {
					console.log(err)
				}).finally(res=>{
					that.commentSummit={"articleId": that.id,"content": "","parentId": "0","toUserId": "0"}
				})
			},
			//获取评论内容
			getComment(id){
				if(this.status!=="1") return ;
				let that=this
				commentAPi.getComment(id).then(res=>{
					if (res.data.success === false) return;
					that.commentList=res.data.data
					for(let i=0;i<that.commentList.length;i++){
						that.commentList[i].createDate=dateUtils.friendlyDate(that.commentList[i].createDate)
						for(let j=0;j<that.commentList[i].childrens.length;j++){
							that.commentList[i].childrens[j].createDate=dateUtils.friendlyDate(that.commentList[i].childrens[j].createDate)
							console.log(that.commentList[i].createDate)
						}
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//回复评论
			reply(parentId,userId){
				this.commentSummit.parentId=parentId
				this.commentSummit.toUserId=userId;
				this.$refs.inputDialog2.open()
			},
			//删除评论
			deleteComment(parentId){
				let that=this
				commentAPi.deleteComment(parentId).then(res=>{
				     if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					that.getComment(that.id)
				}).catch(err=>{
					console.log(err)
				})
			},
		}
	}
</script>

<style>
	.view {
		width: 650rpx;
		float: left;
		margin-left: 40rpx;
		margin-top: 40rpx;
		background-color: #FFFFFF;
	}

	.avatar {
		float: left;
		width: 80rpx;
		height: 80rpx;
		/* margin-top: 40rpx; */
		border-radius: 45rpx;
	}

	.nickname {
		float: left;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}

	.category {
		float: right;
	}

	.title {
		clear: both;
		font-size: 40rpx;
		text-align: center;
		align-items: center;
		justify-content: center;
	}

	.date {
		font-size: 20rpx;
		text-align: center;
		align-items: center;
		justify-content: center;
		color: #a6a6a6;
	}

	.content {
		min-height: 600rpx;
	}

	.tags {
		float: left;
		margin-top: 30rpx;
	}

	.tags-item {
		font-size: 10rpx;
		margin-left: 12rpx;
	}

	.fengexian {
		float: left;
		margin-top: 30rpx;
		clear: both;
		width: 650rpx;
		height: 10rpx;
		border-top: 10rpx solid #cacaca;
	}

	.fengexian2 {
		clear: both;
		width: 650rpx;
		height: 2rpx;
		border-top: 2rpx solid #cacaca;
		float: left;
		margin-bottom: 100rpx;
	}

	.plk {
		bottom: 0px;
		position: fixed;
		background-color: #f1f1ed;
		width: 100%;
		min-height: 100rpx;
	}

	.easyinput {
		margin-left: 10rpx;
		margin-top: 10rpx;
		float: left;
		width: 400rpx;
		text-align: center;
		align-items: center;
		justify-content: center;
	}

	.easyinput-item {
		height: 4rpx;
	}

	.fav {
		float: left;
	}

	.floatLeft {
		float: left;

	}

	.likesCount {
		float: right;
		margin-right: 30rpx;
	}

	.likesCount-item {
		font-size: 20rpx;
		color: #000;
		text-align: center;
	}

	.collectionCounts {
		float: right;
		margin-right: 30rpx;
	}

	.collectionCounts-item {
		font-size: 20rpx;
		color: #000;
		text-align: center;
	}
</style>
