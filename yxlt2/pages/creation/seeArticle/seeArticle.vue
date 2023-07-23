<template>
	<view class="app-background-height">
		<!-- 导航栏 -->
		<view>
			<uni-nav-bar left-icon="left" 
			@clickLeft="toBack()" 
			title="查看帖子" 
			rightText="管理" 
			@clickRight="manage()"
			:shadow="true" :fixed="true" />
		</view>
		<!-- 板块 -->
		<view class="tabs">
			<scroll-view :scroll-x="true">
				<view class="scrollbar-flex-content">
					<view @click="ontabtap1(0)">
						<button type="default" plain="true" :class="active===0?'scrollbar-demo-item2':'scrollbar-demo-item'">
							<text style="font-size: 20rpx;">全部</text>
						</button>
					</view>
					<view v-for="(item,index) in palteList" :key="index+1" @click="ontabtap(index+1,item.id)">
						<button type="default" plain="true" :class="active===index+1?'scrollbar-demo-item2':'scrollbar-demo-item'">
							<text style="font-size: 20rpx;">{{ item.name }}</text>
						</button>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 审核 -->
		<view v-for="(item,index) in sortList" @click="onSort(index)" :key="index"
			:class="active2===index?'sort2':'sort'">
			<text class="sort-text">{{item.name}}</text>
		</view>
		<!-- 帖子 -->
		<uni-card style="clear: both;" v-if="articleList.length===0">
			无数据
		</uni-card>
		<card-article style="clear: both;"  
		@delete-article="deleteArticle(item.id)"
		@revise="revise(item.id)"
		@to-looke="toDetailed(item)" 
		v-for="item in articleList" 
		:manageDate="manageDate" 
		:article="item" ></card-article>
	</view>
</template>

<script>
	import articleApi from "@/common/api/articleApi.js"
	import palteApi from "@/common/api/palteApi.js"
	import utils from "@/common/utils/utils.js"
	export default {
		data() {
			return {
				palteId:"",
				status:"",
				articleList: [],
				palteList: [],
				active: 0,
				active2: 0,
				manageDate:false,
				sortList: [
					{
						name: "审核失败",
					},{
						name: "审核中"
					}, {
						name: "审核通过"
					}
				],
			}
		},
		onLoad() {
			if (utils.getCookieUser() == null) {
				utils.showToast('error', "未登录")
				return;
			}
			this.getPalte();
			this.status="-1"
			this.getArticleByStatus();
		},
		methods: {
			manage(){
				this.manageDate=!this.manageDate
			},
			//跳转详情页
			toDetailed(item) {
				console.log(item)
				uni.navigateTo({
					url:"/pages/creation/seeArticle/article?id="+item.id+"&status="+item.status
				})
			},
			//修改
			revise(id){
				uni.navigateTo({
					url:"/pages/creation/seeArticle/reviserArticle?articleId="+id
				})
				console.log("修改")
			},
			//删除
			deleteArticle(id){
				let that=this
				articleApi.deleteByArticleId(id).then(res=>{
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					utils.showToast("success","删除成功")
					setTimeout(() => {
						that.$router.go(0)
					}, 500)
				}).catch(err=>{
					console.log(err)
				})
			},
			toBack() {
				uni.switchTab({
					url: "/pages/creation/creation"
				})
			},
			ontabtap1(index){
				this.active = index
				this.palteId=""
				this.getArticleByStatus()
			},
			ontabtap(index, palteId) {
				this.active = index
				this.palteId=palteId
				this.getArticleByPalteIdAndStatus()
			},
			onSort(index) {
				this.active2 = index
				this.articleList = []
				this.status=(index-1).toString()
				if(this.palteId==="") return this.getArticleByStatus()
				this.getArticleByPalteIdAndStatus()
			},
			getPalte() {
				palteApi.GetPalte().then(res => {
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					this.palteList = res.data.data
				}).catch(err => {
					console.log(err)
				})
			},
			getArticleByPalteIdAndStatus(){
				articleApi.getArticleByPalteIdAndStatus(this.palteId,this.status).then(res => {
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					this.articleList = res.data.data
				}).catch(err => {
					console.log(err)
				})
			},
			getArticleByStatus() {
				articleApi.getArticleByStatus(this.status).then(res => {
					if (res.data.success === false)return utils.showToast('error', res.data.msg)
					this.articleList = res.data.data
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style>
	/*  */
	.scrollbar-flex-content {
		display: flex;
	}

	.scrollbar-demo-item {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200rpx;
		height: 50px;
		margin: 10px;
		text-align: center;
		background-color: #c2c2c2;
		/* text-shadow: 1px 1px 2px #43d9c0, 0 0 25px #0bf0e9, 0 0 5px #0ac26f; */
	}

	.scrollbar-demo-item2 {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200rpx;
		height: 50px;
		margin: 10px;
		text-align: center;
		background-color: #23c10b;
		text-shadow: 1px 1px 2px #0484e6, 0 0 25px #cf11f0, 0 0 5px #987bc2;

	}

	.sort {
		float: left;
		margin-left: 20rpx;
	}

	.sort2 {
		float: left;
		margin-left: 20rpx;
		border-bottom: 2px solid #dd0000;
	}

	.sort-text {
		font-size: 20rpx;
		/* text-decoration:underline */
	}
	/*  */
/* 	.image {
		width: 400rpx;
		height: 400rpx;
	}
 */
	.actions {
		float: left;
		margin-left: 60rpx;
	}

	.actions-text {
		float: right;
		margin-top: 10rpx;
		margin-left: 0rpx;
	}
</style>
