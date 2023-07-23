<template>
	<view class="app-background-height">
		<view>
			<uni-nav-bar title="消息" :shadow="true" :fixed="true" />
		</view>
		<uni-list :border="true" v-for="friendsUser in friendsVoList">
			<uni-list-chat  :clickable="true" :note="friendsUser.msg" :time="friendsUser.createDate"
				:title="friendsUser.nickname" :avatar="friendsUser.avatar" @click="toChat(friendsUser.toUserId)" />
		</uni-list>
	</view>
</template>

<script>
	import friendsApi from "@/common/api/friendsApi.js"
	import utils from "../../common/utils/utils"
		import dateUtils from "../../common/utils/dateFormatUtils.js"
	export default {
		data() {
			return {
				friendsVoList: [],
			}
		},
		onShow(){
			if (utils.getCookieUser()) {
				this.getVo()
				let that = this
				//webSocket收到消息时,进行调用
				uni.$on('toBackChat', function(data) {
					that.getVo()
				})
			}else{
				utils.showToast("error","未登录")
			}
		},
		reload() {
			location.reload()
		},
		methods: {
			getVo() {
				let that=this
				friendsApi.getVo().then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					that.friendsVoList = res.data.data;
					for(let i=0;i<that.friendsVoList.length;i++){
						that.friendsVoList[i].createDate=dateUtils.friendlyDate(that.friendsVoList[i].createDate)
					}
					that.friendsVoList
				}).catch(err => {
					console.log(err)
				})
			},
			toChat(toUserId) {
				uni.navigateTo({
					url: "/pages/news/chat/chat?toUserId=" + toUserId
				})
			}
		}
	}
</script>

<style>

</style>
