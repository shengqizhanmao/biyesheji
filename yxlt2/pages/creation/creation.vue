<template>
	<view class="app-background-height">
		<view>
			<uni-nav-bar title="创作中心" :shadow="true" :fixed="true" />
		</view>
		<!-- 是作者的页面 -->
		<view v-if="isAuthorData">
			<uni-section title="创作者服务" type="line">
				<uni-collapse v-model="value">
					<uni-collapse-item title="帖子管理">
						<uni-grid :column="4" :showBorder="false" :square="true">
							<uni-grid-item v-for="(item,index) in gridList" @click="changeTo(item.to)" :key="index">
								<uni-icons class="icons" color="#061fff" :type="item.icon" size="26"></uni-icons>
								<text class="text">{{item.text}}</text>
							</uni-grid-item>
						</uni-grid>
					</uni-collapse-item>
				</uni-collapse>
			</uni-section>
		</view>
		<!-- 非作者的页面 -->
		<view v-else class="app-list">
			<button class="button" @click="apply()">申请成为作者</button>
		</view>
	</view>
</template>

<script>
	import authorApi from '../../common/api/authorApi'
	import utils from '../../common/utils/utils'
	export default {
		data() {
			return {
				userInfo: {},
				isAuthorData: false,
				value: ['0'],
				gridList: [{
						"text": "查看帖子",
						"icon": "search",
						"to":"/pages/creation/seeArticle/seeArticle"
					},
					{
						"text": "创作帖子",
						"icon": "compose",
						"to":"/pages/creation/creationArticle/creationArticle"
					}
				],
			}
		},
		onShow(){
			if (!utils.getCookieUser()) return utils.showToast("error", "未登录")
			this.userInfo = utils.getCookieUser()
			this.isAuthor()
		},
		reload() {
			location.reload()
		},
		methods: {
			//判断是否是作者
			isAuthor() {
				authorApi.isAuthor().then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					this.isAuthorData = res.data.data
				}).catch(err => {
					console.log(err)
				})
			},
			//申请作者
			apply() {
				authorApi.applyAuthot().then(res => {
					utils.thenMathod(res)
				}).catch(err => {
					console.log(err)
				})
			},
			changeTo(item) {
				uni.navigateTo({
					url: item
				})
			}
		}
	}
</script>

<style>
	.button {
		background-color: #ffffff;
	}
	.icons{
		margin-top: 30rpx;
		margin-right: 0rpx;
	}
	.text{
		margin-top: 20rpx;
		margin-left: 40rpx;
	}
</style>
