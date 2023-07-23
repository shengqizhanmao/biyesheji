<template>
	<view>
		<!-- 导航栏 -->
		<uni-nav-bar left-icon="left" @clickLeft="toBack()" :title="modeularsName" :shadow="true" :fixed="true" />
		<!-- 公告 -->
		<uni-collapse ref="collapse" v-model="value">
			<uni-collapse-item title="公告">
				<view v-if="announcementTrue">
					<uni-notice-bar :showClose="true" single @getmore="onAnnouncement()" show-get-more show-icon
						scrollable :text="announcement" />
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<!-- 公告对话框 -->
		<uni-popup ref="announcementDialog" type="dialog">
			<uni-popup-dialog type="info" cancelText="关闭公告栏" title="公告" :content="announcement"
				@close="closeAnnouncementpopup()" />
		</uni-popup>
		<!-- 排序 -->
		<view v-for="(item,index) in sortList" @click="onSort(index)" :key="index"
			:class="active2===index?'sort2':'sort'">
			<text class="sort-text">{{item.name}}</text>
		</view>
		<!-- 分类 -->
		<view  style="clear: both;margin-top: 20rpx;" v-if="active2==4">
			<uni-data-select
			        v-model="categoryValue"
			        :localdata="categoryListVo"
			        @change="categoryChange"
			      ></uni-data-select>
		</view>
		<!-- 贴子 -->
		<card-article-index :articleList="articleList2" v-if="active2==4"></card-article-index>
		<card-article-index :articleList="articleList" v-else></card-article-index>
		<!-- 底部等待 -->
		<view style="clear: both;margin-top: 20rpx;"></view>
		<uni-load-more :status="ReachBottomStatus"></uni-load-more>
	</view>
</template>

<script>
	import categoryApi from "@/common/api/categoryApi.js"
	import articleApi from "@/common/api/articleApi.js"
	import announcementApi from "@/common/api/announcementApi.js"
	import utils from "@/common/utils/utils.js"
	export default {
		data() {
			return {
				//板块
				palteId: "",
				//模块
				modeularsId: "",
				modeularsName: "",
				//公告
				announcement: "",
				announcementTrue: true,
				value: ['0'],
				//排序
				active2: 0,
				sortList: [{
						name: "最新"
					}, {
						name: "点赞最多"
					},
					{
						name: "评论最多"
					}, {
						name: "收藏数最多"
					},{
						name:"分类"
					}
				],
				//分类
				categoryList:[],
				categoryListVo:[],
				categoryVo:{
					text:"",
					value:""
				},
				categoryValue:"",
				page:"1",
				pageSize:"3",
				categoryId:"",
				//帖子,分类
				articleList2: [],
				//帖子,排序
				articleList: [],
				//底部等待
				ReachBottomStatus: "more",
				//获取帖子的数据
				getArticleDate: {
					"sort": "",
					"modularsId": "",
					"palteId": "",
					"pages": 1,
					"pagesSize": 3,
				}
			}
		},
		onLoad(e) {
			this.palteId = e.palteId
			this.modeularsId = e.modeularsId
			this.modeularsName = e.modeularsName
			this.getArticleDate.modularsId = e.modeularsId
			this.getArticleDate.palteId = e.palteId
			this.getAnnouncement()
			this.getArticle()
			this.getCategory()
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh()
				location.reload()
			}, 1000);
		},
		onReachBottom() {
			this.ReachBottomStatus = "loading"
			if(this.active2===4){
				this.page =this.page+1
				this.getArticleByCategory()
			}else{
				this.getArticleDate.pages = this.getArticleDate.pages + 1
				this.getArticle()
			}
			setTimeout(() => {
				this.ReachBottomStatus = "no-more"
				//2s后执行代码执行
			}, 500) //等待2s
			setTimeout(() => {
				this.ReachBottomStatus = "more"
				//2s后执行代码执行
			}, 1000) //等待2s
		},
		methods: {
			//返回主页
			toBack() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			//获取公告
			getAnnouncement() {
				announcementApi.getByPalteIdAndModularsId(this.palteId, this.modeularsId)
					.then(res => {
						if (res.data.success === false) return this.announcement = "无公告"
						this.announcement = res.data.data.content
					}).catch(err => {
						console.log(err)
					})
			},
			//打开公告框
			onAnnouncement() {
				this.$refs.announcementDialog.open()
			},
			//关闭公告框
			closeAnnouncementpopup() {
				this.announcementTrue = false
				this.$refs.announcementDialog.close()
			},
			//排序
			onSort(index) {
				this.active2 = index
				console.log(this.active2)
				this.articleList = []
				this.getArticleDate.pages = 1
				this.getArticleDate.sort = this.active2.toString()
				this.getArticle()
			},
			//获取分类
			async getCategory(){
				let that=this
				const res=await categoryApi.getByPalteId(this.palteId);
				if(res.data.success===false) return utils.showToast('error',res.data.msg)
				that.categoryList=res.data.data
				for(let i=0;i<that.categoryList.length;i++){
					that.categoryVo.value=that.categoryList[i].id
					that.categoryVo.text=that.categoryList[i].name
					that.categoryListVo.push(that.categoryVo);
					that.categoryVo={text:"",value:""}
				}
			},
			//点击分类
			categoryChange(e){
				if(e=="") return this.getArticle()
				this.categoryId=e
				this.getArticleByCategory()
			},
			//获取文章
			getArticle() {
				let that = this
				this.getArticleDate.sort = this.active2.toString()
				articleApi.getBySortAndPalteAndModulersId(this.getArticleDate).then(res => {
					if (res.data.success === false) return;
					if (that.articleList.length === 0) {
						that.articleList = res.data.data
						if(res.data.data.length===0){
							setTimeout(() => {
								that.ReachBottomStatus="no-more"
							　　//2s后执行代码执行
							}, 1500) //等待2s
							return
						}
						return
					}
					if (res.data.data.length === 0) {
						setTimeout(() => {
							that.ReachBottomStatus = "no-more"
							//2s后执行代码执行
						}, 1500) //等待2s
						return
					}
				    //下滑，添加查询到的文章列表。
					that.articleList = that.articleList.concat(res.data.data)
				}).catch(err => {
					console.log(err)
				})
			},
			//获取帖子
			getArticleByCategory(){
				let that=this
				if(that.categoryValue!==this.categoryId){
					 that.articleList2 =[]
				}
				articleApi.getArticleByCategory(that.modeularsId,this.categoryId,this.page,this.pageSize).then(res=>{
					if (res.data.success === false) return ;
					if (that.articleList2.length === 0) {
						that.articleList2 = res.data.data
						if(res.data.data.length===0){
							setTimeout(() => {
								that.ReachBottomStatus="no-more"
							}, 1500)
							return
						}
						return
					}
					if (res.data.data.length === 0) {
						setTimeout(() => {
							that.ReachBottomStatus = "no-more"
							//2s后执行代码执行
						}, 1500) //等待2s
						return
					}
					that.articleList2 = that.articleList2.concat(res.data.data)
				}).catch(err => {
					console.log(err)
				})

			}
		}
	}
</script>

<style>
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
</style>
