<template>
	<view class="app-background-height">
		<view >
			<uni-nav-bar left-icon="left" right-icon="personadd" @clickRight="toAdd()" title="好友" :shadow="true" :fixed="true" @clickLeft="toMy()"/>
		</view>
		<view class="uni-search-bar">
			<uni-search-bar placeholder="搜索好友" v-model="searchUser" bgColor="#EEEEEE" @input="searchInput" />
			<uni-list>
				<uni-list-item title="添加好友" @click="toAdd()" link badge-positon="left" >
				</uni-list-item>
			</uni-list>
		</view>
		<uni-list class="list" :border="true" >
			<uni-list-chat v-for="friendsUser in friendsUserList" clickable=true :title="friendsUser.nickname" :avatar="friendsUser.avatar" @click="toDetailed(friendsUser.toUserId)"/>
		</uni-list>
	</view>
</template>

<script>
	import friendsUserAPi from "@/common/api/friendsUserApi.js"
	import utils from "@/common/utils/utils.js"
	export default {
		data() {
			return {
				addAvatar:[{url:"../../../static/img/1.jpg"}],
				searchUser:'',
				userInfo:{},
				friendsUserList:[],
				friendsUserListSearch:[]
			}
		},
		onShow() {
			this.getFriendsUserApi();
		},
		methods: {
			toDetailed(userId){
				uni.navigateTo({
					url:"/pages/news/friends/detailed/detailed?userId="+userId
				})
			},
			toMy(){
				uni.switchTab({
					url:'/pages/my/my'
				})
			},
			toAdd(){
				uni.navigateTo({
					url:"/pages/news/friends/add/add"
				})
			},
			getFriendsUserApi(){
				this.userInfo=utils.getCookieUser()
				friendsUserAPi.getFriendsUserList(this.userInfo.id).then(res=>{
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					this.friendsUserList=res.data.data
					this.friendsUserListSearch=res.data.data
				}).catch(err=>{
					console.log('error', err)
				})
			},
			searchInput(e){
				let friendsUserList2=[]
				this.friendsUserListSearch.forEach(friendsUser=>{
					if(friendsUser.nickname.indexOf(e)!== -1){
						friendsUserList2.push(friendsUser)
					}
				})
				this.friendsUserList=friendsUserList2
				console.log(e)
			}
		}
}
</script>

<style>
	.uni-search-bar{
		background-color: #ffffff;
	}
.list{
	margin-top: 20rpx;
}
</style>
