<template>
	<view class="app-background-height">
		<!-- 导航栏 -->
		<view>
			<uni-nav-bar left-icon="left"  :title="toUser.nickname" :shadow="true"
				:fixed="true" @clickLeft="toBackChat()" right-icon="more" @clickRight="toDetailed()" />
		</view>
		<!-- 聊天界面以及聊天信息 -->
		<scroll-view class="main" :refresher-triggered="triggered" :refresher-threshold="45" @refresherrefresh="refresh"
			:refresher-enabled="true" :scroll-top="scrollTop" :scroll-y="true">
			<view>
				<chatBox :valueList="getWebSocketDataList" :toUser="toUser" :formUser="formUser"></chatBox>
			</view>
		</scroll-view>
		<!-- 聊天框 -->
		<view class="bottom">
			<uni-search-bar placeholder="发送消息" cancelText="发送" v-model="value" @cancel="send" bgColor="#EEEEEE">
				<template v-slot:searchIcon>
					<uni-icons />
				</template>
			</uni-search-bar>
		</view>
	</view>
</template>

<script>
	var isSuccess=false
	import userApi from "@/common/api/userApi.js"
	import dateFormatUtils from "@/common/utils/dateFormatUtils.js"
	import utils from "@/common/utils/utils"
	import friendsApi from "@/common/api/friendsApi.js"
	var listFormUserId=[]
	export default {
		data() {
			return {
				//是否存在listFormUserId
				isFormUserId:false,
				//界面配置
				scrollTop: 0,
				triggered: true,
				//目标用户
				toUserId: "",
				toUser: {},
				//来源
				formUserId: "",
				formUser: {},
				//初始化获取聊天记录的格式
				getFridens: {
					formUserId: "",
					toUserId: "",
					page: 1,
					size: 5,
				},

				//发送聊天记录的内容
				value: "",
				//websocker实例
				socketTask: {},
				//发送聊天记录的格式
				toWebSocketData: {
					formUserId: "",
					toUserId: "",
					msg: "",
					type: "sendMsg"
				},
				//聊天记录
				getWebSocketDataList: [],
				//获取信息的格式
				getWebSocketData: {
					formUserId: "",
					toUserId: "",
					msg: "",
					type: "",
					createdDate: "",
				},
			}
		},
		onLoad(e) {
			this.toUserId = e.toUserId
			this.formUser = utils.getCookieUser()
			this.formUserId = this.formUser.id
			this.toWebSocketData.formUserId = this.formUserId
			this.toWebSocketData.toUserId = e.toUserId
			this.getFridens.formUserId =this.formUser.id;
			this.getFridens.toUserId = e.toUserId;
			this.getFridens.page=1
			this.getTen();
			this.getToUser(e.toUserId)
			this.connectSocket()
			let that=this
			uni.$on('logout', function(data) {
				that.socketTask.close()
				// console.log(this.isSuccess)
			})
		},
		methods: {
			toBackChat() {
				uni.switchTab({
					url:"/pages/news/news"
				})
				//news.vue,对页面进行更新
				uni.$emit('toBackChat',{msg:'页面更新'})
			},
			toDetailed(){
				uni.navigateTo({
					url:"/pages/news/chat/chatDetailed?toUserId="+this.toUserId
				})
			},
			getToUser(toUserId) {
				userApi.getUserById( toUserId).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					this.toUser = res.data.data
				}).catch(err => {
					console.log(err)
				})
			},
			getTen() {
				friendsApi.getTen(this.getFridens).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					
					let dataList=res.data.data
					//循环遍历时间转换
					for(let i=0;i<dataList.length;i++){
					    dataList[i].createdDate=dateFormatUtils.friendlyDate(dataList[i].createdDate)
					}
				    // console.log(this.getWebSocketDataList)
					//让后面加入的数据，排在前面
					for(let i=0;i<this.getWebSocketDataList.length;i++){
						dataList.push(this.getWebSocketDataList[i])
					}
					this.getWebSocketDataList=dataList
				
				}).catch(err => {
					console.log(err)
				})
			},
			refresh(e) {
				// console.log("下拉:")
				// console.log(this.getFridens.page + 1)
				setTimeout(() => {
					this.triggered = false;
				}, 1000)
				this.getFridens.page=this.getFridens.page + 1
				this.getTen()
			},
			send(e) {
				console.log(e.value)
				this.toWebSocketData.msg = e.value
				this.sendSocketMessage(this.toWebSocketData)
			},
			//webSocket
			//连接websocket
			connectSocket() {
				for(let i=0;i<listFormUserId.length;i++){
					if(listFormUserId[i]===this.formUserId) return this.isFormUserId=true
				}
				if (isSuccess && this.isFormUserId) return console.log("已连接")
				let that = this;
				console.log('调用连接websocket')
				this.socketTask = uni.connectSocket({
					url: 'ws://127.0.0.1:8100/yxlt/websocket/' + that.formUserId,
					success(res) {
						console.log("websocket连接成功");
						isSuccess = true
						listFormUserId.push(this.formUserId)
					},
					fail(err) {
						console.log("报错", err);
					}
				});
				this.socketTask.onOpen(function(res) {
					console.log('WebSocket连接已打开！');
					isSuccess= true
					that.heart()
				})
				this.socketTask.onMessage(function(res) {
					that.getWebSocketData = JSON.parse(res.data)
					if (that.getWebSocketData.type === "heartbeat") return;
					//news.vue,对页面进行更新
					uni.$emit('toBackChat',{msg:'页面更新'})

					console.log('收到服务器内容：' + that.getWebSocketData.msg);
					// console.log(that.getWebSocketData)
					that.getWebSocketData.createdDate = dateFormatUtils.friendlyDate(that.getWebSocketData
						.createdDate)
					that.getWebSocketDataList.push(that.getWebSocketData);
					setTimeout(() => {
						that.scrollTop = that.scrollTop + 500
					}, 500)
				});
				this.socketTask.onError(function(res) {
					console.log('WebSocket连接打开失败，请检查！');
					console.log(res);
					isSuccess = false
				})
				// // 监听连接关闭 -
				this.socketTask.onClose((e) => {
					console.log('WebSocket连接关闭！');
					clearInterval(that.timer)
					that.timer = ''
					isSuccess = false
					listFormUserId=[]
					// console.log(isSuccess)
				})
			},
			//进入重新连接
			reconnect() {
				console.log('进入断线重连');
				this.socketTask.close();
				this.socketTask = null;
				isSuccess = false
				this.connectSocket()
			},
			//发送消息
			sendSocketMessage(msg) {
				let that=this
				console.log('发送信息')
				msg = JSON.stringify(msg)
				return new Promise((reslove, reject) => {
					that.socketTask.send({
						data: msg,
						success(res) {
							console.log('发送成功')
							reslove(res)
						},
						fail(res) {
							console.log('发送失败')
							console.log(res)
							reject(res)
						}
					});
				})
			},
			//心跳
			heart() {
				let that = this;
				clearInterval(this.timer);
				this.timer = '';
				let msg = {
					"type": "heartbeat",
				}
				this.timer = setInterval(() => {
					that.sendSocketMessage(msg).then(res => {
						console.log('心跳成功')
					}).catch(res => {
						console.log('发送失败')
						console.log((res))
					})
				}, 1000 * 60 * 2)
			},

		}
	}
</script>

<style>
	.main {
		max-height: 1200rpx;
	}


	.card {
		background-color: #1bef22;
	}

	.bottom {
		clear: both;
		bottom: 10rpx;
		width: 100%;
		position: absolute;
	}
</style>
