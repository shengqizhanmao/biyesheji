<template>
	<view>
		<scroll-view :scroll-y="true" >
			<view class="scrollbar-flex-content">
				<view v-for="(item,index) in palteList" :key="index" @click="onPalte(index,item)">
					<button :type="item.type" :plain="item.plain"
						:class="active===index?'scrollbar-demo-item2':'scrollbar-demo-item'">
						<text class="scrollbar-text">{{ item.name }}</text>
					</button>
				</view>
			</view>
		</scroll-view>
		<view v-if="articleList.length==0">
			无数据
		</view>
		<card-article-index :articleList="articleList"></card-article-index>
	</view>
</template>

<script>
	import articleApi from "@/common/api/articleApi.js"
	import palteApi from "@/common/api/palteApi.js"
	export default {
		data() {
			return {
				palteId: "",
				palteList: [],
				articleList:[]
			}
		},
		onLoad() {
			this.getPalte();
		},
		methods: {
			getPalte() {
				let that = this
				palteApi.GetPalte().then(res => {
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					let palteListLet = res.data.data
					for (let i = 0; i < palteListLet.length; i++) {
						let palte = {
							id: "",
							name: "",
							type: "default",
							plain: true
						};
						palte.id = palteListLet[i].id
						palte.name = palteListLet[i].name
						if (i == 0) {
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
			onPalte(index, palte) {
				this.active = index
				this.palteId = palte.id
				for (let i = 0; i < this.palteList.length; i++) {
					this.palteList[i].palte = true
					this.palteList[i].type = "default"
				}
				palte.plain = false
				palte.type = "primary"
				this.articleList=[]
				this.getArticle();
			},
			getArticle(){
				let that=this
				articleApi.getArticleByUserCollect(this.palteId).then(res=>{
					if (res.data.success === false) return;
					that.articleList=res.data.data
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

</style>
