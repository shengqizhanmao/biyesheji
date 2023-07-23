<template>
	<view class="app-background-height">
		<view>
			<uni-nav-bar left-icon="left" @clickLeft="toBack()" title="添加好友" :shadow="true" :fixed="true" />
		</view>
		<view class="uni-search-bar">
			<uni-search-bar placeholder="搜索根据用户名或者账号" cancelText="搜索" v-model="searchAddUser" @cancel="searchAddCancel"
				bgColor="#EEEEEE" />
		</view>
		<uni-section class="list"  title="搜索到的用户" type="line">
			<uni-list :border="true" v-for="friendsUser in friendsUserListSearch">
				<uni-list-chat :clickable="true" :title="friendsUser.nickname" :avatar="friendsUser.avatar"
					@click="toDetailed(friendsUser.id)" />
			</uni-list>
		</uni-section>
		<uni-section class="list"  title="好友申请" type="line">
			<uni-list :border="true" v-for="friendsUser in friendsUserList">
				<uni-list-chat v-if="friendsUser.formUserId==infoUserId" :title="friendsUser.nickname" :avatar="friendsUser.avatar" >
				<text >申请中</text>
				</uni-list-chat>
				<uni-list-chat v-else :clickable="true" :title="friendsUser.formNickname" :avatar="friendsUser.formAvatar" >
					<button @click="updateFriendsUser(friendsUser.toUserId,friendsUser.formUserId,'1')">同意</button>	
					<button @click="updateFriendsUser(friendsUser.toUserId,friendsUser.formUserId,'-2')">拒绝</button>
				</uni-list-chat>
			</uni-list>
		</uni-section>
		<uni-section title="好友删除通知" type="line">
			<uni-list :border="true"  v-for="friendsUser in listDeleteFriendsUser">
				<uni-list-chat :clickable="true" :title="friendsUser.nickname" :avatar="friendsUser.avatar" >
				<button @click="deleteFriends(friendsUser.formUserId,friendsUser.toUserId)">清除</button>
				</uni-list-chat>
			</uni-list>
		</uni-section>
		<uni-section title="好友拒绝通知" type="line">
			<uni-list :border="true"  v-for="friendsUser in friendsUserRefuseList">
				<uni-list-chat v-if="friendsUser.formUserId==infoUserId" :title="friendsUser.nickname" :avatar="friendsUser.avatar" >
					<text >已拒绝</text>
				</uni-list-chat>
				<uni-list-chat v-else :clickable="true" :title="friendsUser.formNickname" :avatar="friendsUser.formAvatar" >
				   <button  @click="deleteFriends(friendsUser.formUserId,friendsUser.toUserId)">清除</button>
				</uni-list-chat>
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	import utils from "@/common/utils/utils.js"
	import friendsUserApi from "@/common/api/friendsUserApi.js"
	export default {
		data() {
			return {
				searchAddUser: "",
				friendsUserListSearch: [],
				friendsUserList: [],
				friendsUserRefuseList: [],
				listDeleteFriendsUser:[],
				infoUserId:"",
				updateFriendsUserData:{
					formUserId:"",
					toUserId:"",
					status:"",
				},
				deleteFriendsData:{
					formUserId:"",
					toUserId:""
				},
			}
		},
		onShow() {
			if(utils.getCookieUser()===null){
				this.toLogin()
			}
			this.infoUserId=utils.getCookieUser().id
			this.friendsUserApplyList(this.infoUserId)
			this.getListDeletefriendsUser(this.infoUserId)
			this.getListRefusefriendsUser(this.infoUserId)
		},
		methods: {
			toBack() {
				// #ifndef H5
				uni.navigateBack({
					delta: 1
				})
				// #endif
				// #ifdef H5
				history.back();
				// #endif
			},
			//搜索
			searchAddCancel(e) {
				friendsUserApi.getListSearchAddByUsernameOrNickname(e.value).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					this.friendsUserListSearch = res.data.data
				}).catch(err => {
					console.log('error', err)
				})
			},
			//跳转好友详情页
			toDetailed(userId) {
				uni.navigateTo({
					url: "/pages/news/friends/add/addDetailed?userId=" + userId
				})
			},
			//跳转登录页
			toLogin() {
				uni.navigateTo({
					url: "/pages/my/Login/Login"
				})
			},
			//获取添加好友列表
			friendsUserApplyList(userId) {
				friendsUserApi.getFriendsUserApplyList(userId).then(res => {
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					this.friendsUserList = res.data.data
					console.log(this.friendsUserList)
				}).catch(err => {
					console.log('error', err)
				})
			},
			//获取拒绝好友列表
			getListRefusefriendsUser(userId) {
				let that=this
				friendsUserApi.getListRefusefriendsUser(userId).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					that.friendsUserRefuseList = res.data.data
					console.log(that.friendsUserRefuseList)
				}).catch(err => {
					console.log('error', err)
				})
			},
			//修改好友状态
			updateFriendsUser(toUserId,formUserId,status){
				let that=this
				this.updateFriendsUserData.formUserId=formUserId
				this.updateFriendsUserData.toUserId=toUserId
				this.updateFriendsUserData.status=status
				friendsUserApi.updateStatus(this.updateFriendsUserData).then(res=>{
					utils.thenMathod(res)
					that.onShow()
				}).catch(err=>{
					console.log(err)
				})
			},
			//查询被好友删除的通知列表
			getListDeletefriendsUser(userId){
				friendsUserApi.getListDeletefriendsUser(userId).then(res=>{
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					this.listDeleteFriendsUser=res.data.data
				}).catch(err=>{
					console.log(err)
				})
			},
			//删除通知
			deleteFriends(formUserId,toUserId){
				this.deleteFriendsData.formUserId=formUserId
				this.deleteFriendsData.toUserId=toUserId
				friendsUserApi.deleteFriendsUser(this.deleteFriendsData).then(res=>{
					utils.thenMathod()
					this.onShow()
				}).catch(err=>{
					console.log(err)
				})
			},
		}
	}
</script>

<style>
	.uni-search-bar {
		background-color: #ffffff;
	}
	.list{
		margin-top: 30rpx;
	}
</style>
