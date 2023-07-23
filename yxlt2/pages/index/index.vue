<template>
	<view>
		<!-- 导航板块 -->
		<scroll-view :scroll-x="true">
			<view class="scrollbar-flex-content">
				<view v-for="(item,index) in palteList" :key="index" @click="onPalte(index,item)">
					<button :type="item.type" :plain="item.plain"
						:class="active===index?'scrollbar-demo-item2':'scrollbar-demo-item'">
						<text class="scrollbar-text">{{ item.name }}</text>
					</button>
				</view>
			</view>
		</scroll-view>
		<scroll-view :scroll-x="true">
			<view class="scrollbar-flex-content">
				<view  v-for="item in modularsList" >
					<button class="gird-item" @click="onModeulars(item.name,item.id)">
						<text class="scrollbar-text">{{item.name}}</text>
					</button>
				</view>
			</view>
		</scroll-view>
<!-- 		<uni-card is-full>
			<uni-grid :showBorder="false" :square="false" :column="4" border-color="#03a9f4">
				<uni-grid-item v-for="item in modularsList">
					<button class="gird-item" @click="onModeulars(item.name,item.id)">
						<text class="scrollbar-text">{{item.name}}</text>
					</button>
				</uni-grid-item>
			</uni-grid>
		</uni-card> -->
		<!-- 公告   -->
		<uni-collapse ref="collapse" v-model="collapse">
			<uni-collapse-item title="公告">
				<view v-if="announcementTrue">
					<uni-notice-bar :showClose="true" single @getmore="onAnnouncement()" show-get-more show-icon
						scrollable :text="announcement" />
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<!--公告对话框-->
		<uni-popup ref="announcementDialog" type="dialog">
			<uni-popup-dialog type="info" cancelText="关闭公告栏" title="公告" :content="announcement"
				@close="closeAnnouncementpopup()" />
		</uni-popup>
		<!-- 最新,热度,评论最多,收藏数最多 -->
		<view v-for="(item,index) in sortList" @click="onSort(index)" :key="index"
			:class="active2===index?'sort2':'sort'">
			<text class="sort-text">{{item.name}}</text>
		</view>
		<!-- 贴子 -->
		<card-article-index :articleList="articleList"></card-article-index>
		<!-- 底部等待 -->
		<view style="clear: both;margin-top: 20rpx;"></view>
		<uni-load-more :status="ReachBottomStatus"></uni-load-more>
	</view>
</template>

<script>
 	import articleApi from "@/common/api/articleApi.js"
	import palteApi from "@/common/api/palteApi.js"
	import utils from "@/common/utils/utils.js"
	import modularsApi from "@/common/api/modularsApi.js"
	import tagsApi from "@/common/api/tagsApi.js"
	import userApi from "@/common/api/userApi.js"
	import announcementApi from "@/common/api/announcementApi.js"
	export default {
		data() {
			return {
				//板块
				palteId: "",
				palteList: [],
				active: 0,
				//模块
				modularsList: [],
				//公告
				announcement: "",
				announcementTrue: true,
				collapse: ['0'],
				//排序
				active2: 0,
				sortList: [{name: "最新"}, {name: "点赞最多"}, {name: "评论最多"}, {name: "收藏数最多"}],
				//帖子
				articleList:[],
				//底部加载类型
				ReachBottomStatus:"more",
				//获取帖子的需要的数据
				getArticleDate:{
					"sort":"",
					"modularsId":"0",
					"palteId":"",
					"pages":1,
					"pagesSize":3,
				}
			}
		},
		onShow() {
			this.palteList=[]
			//初始化,获取板块=>获取模块->获取帖子
			this.getPalte();
		},
		//向下拉
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh()
				location.reload()
			}, 1000);
		},
		//向上拉
		onReachBottom() {
			this.ReachBottomStatus="loading"
			this.getArticleDate.pages=this.getArticleDate.pages+1
			this.getArticle()
			setTimeout(() => {
				this.ReachBottomStatus="no-more"
			}, 500)
			setTimeout(() => {
				this.ReachBottomStatus="more"
			}, 1000)
		},
		methods: {
			getPalte() {
				let that = this
				//获取板块
				palteApi.GetPalte().then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					let palteListLet = []
					palteListLet = res.data.data
					//进行默认的加载当前板块
					for (let i = 0; i < palteListLet.length; i++) {
						let palte = {id: "", name: "", type: "default", plain: true};
						palte.id = palteListLet[i].id
						palte.name = palteListLet[i].name
						//默认选择第一个
						if (i === 0) {
							palte.type = "primary"
							palte.plain = false
							that.onPalte(0, palte)
						}
						that.palteList.push(palte);
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//点击板块
			onPalte(index, palte) {
				this.active = index
				this.palteId = palte.id
				for (let i = 0; i < this.palteList.length; i++) {
					this.palteList[i].palte = true
					this.palteList[i].type = "default"
				}
				//板块的按钮样式
				palte.plain = false
				palte.type = "primary"
				//获取模块
				this.getMoudeliars(palte.id)
				//获取公告
				this.getAnnouncement()
				//帖子
				this.articleList=[]
				//获取帖子
				this.getArticleDate={"sort":"", "modularsId":"0", "palteId":"", "pages":1, "pagesSize":3}
				this.getArticle();
			},
			//获取模块
			getMoudeliars(palteId) {
				modularsApi.GetModulars(palteId).then(res => {
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					this.modularsList = res.data.data
				})
			},
			//点击模块
			onModeulars(modeularsName, modeularsId) {
				uni.navigateTo({
					url: "/pages/index/modulars/modulars?modeularsId=" + modeularsId + "&palteId=" + this.palteId +
						"&modeularsName=" + modeularsName
				})
			},
			//获取公告
			getAnnouncement() {
				announcementApi.getByPalteIdAndModularsId(this.palteId,"0")
					.then(res => {
						if (res.data.success === false)return this.announcement = "无公告"
						this.announcement = res.data.data.content
					}).catch(err => {
						console.log(err)
					})
			},
			//点击公告
			onAnnouncement() {
				this.$refs.announcementDialog.open()
			},
			//关闭公告
			closeAnnouncementpopup() {
				this.announcementTrue = false
				this.$refs.announcementDialog.close()
			},
			//点击排序
			onSort(index) {
				this.active2 = index
				this.articleList=[]
				this.getArticleDate={
					"sort":"",
					"modularsId":"0",
					"palteId":"",
					"pages":1,
					"pagesSize":3,
				}
				this.getArticle()
			},
			//获取帖子
			getArticle(){
				let that=this
				this.getArticleDate.sort=this.active2.toString()
				this.getArticleDate.palteId=this.palteId
				articleApi.getBySortAndPalteAndModulersId(this.getArticleDate).then(res=>{
						if (res.data.success === false) return console.log(res.data)
						//如果帖子列表为空
						if(that.articleList.length===0){
							that.articleList=res.data.data
							//获取的帖子为空则显示no-more
							if(res.data.data.length===0){
								setTimeout(() => {
									that.ReachBottomStatus="no-more"
								　　//2s后执行代码执行
								}, 1500) //等待2s
								return
							}
							return
						}
						//如果获取的帖子为空
						if(res.data.data.length===0){
							setTimeout(() => {
								that.ReachBottomStatus="no-more"
							　　//2s后执行代码执行
							}, 1500) //等待2s
							return
						}
						//都不为空则加入帖子后面
						that.articleList=that.articleList.concat(res.data.data)
					}).catch(err=>{
						console.log(err)
				})
			}
		}
	}
</script>

<style>
	.scrollbar-flex-content {
		display: flex;
	}

	.scrollbar-demo-item {
		flex-shrink: 0;
		display: flex;
		width: 170rpx;
		height: 40px;
		margin: 10px;
		text-align: center;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
	}

	.scrollbar-demo-item2 {
		flex-shrink: 0;
		display: flex;
		width: 170rpx;
		height: 45px;
		margin: 10px;
		text-align: center;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
	}

	.scrollbar-text {
		font-size: 20rpx
	}

	.gird-item {
		flex-shrink: 0;
		display: flex;
		min-width: 200rpx;
		height: 45px;
		margin: 5px;
		text-align: center;
		align-items: center;
		justify-content: center;
		border: 2px solid #ffaa7f;
		size:20rpx;
		border-radius: 40rpx;
	}

	.sort {
		float: left;
		margin-left: 20rpx;
		/* border-bottom: 2px solid #dd0000; */
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
