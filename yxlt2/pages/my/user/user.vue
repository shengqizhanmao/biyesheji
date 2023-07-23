<template>
	<view class="app-background-height">
		<view >
			<uni-nav-bar left-icon="left"  backgroundColor="#F8F8F8" title="个人信息" :shadow="true" :fixed="true" @clickLeft="toMy()"/>
		</view>
		<uni-list>
			<uni-list-item title="头像" link>
				<template v-slot:footer>
					<view>
						<uni-file-picker :image-styles="imagesStyle" return-type="object" file-mediatype="image" 
							:auto-upload="false" @select="updateImages" limit="1" :disable-preview="false"
							:del-icon="false" >
							<image style="width: 120rpx;height: 120rpx;"  :src="user.avatar"></image>
						</uni-file-picker>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="账号">
				<template v-slot:footer>
					<view>
						<text>{{user.userName}}</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="名字" link @click="inputDiaologTooggle('inputNickNameDiaolog')">
				<template v-slot:footer>
					<view>
						<text>{{user.nickName}}</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="性别" link @click="inputDiaologTooggle('inputGenderDiaolog')">
				<template v-slot:footer>
					<view>
						<text>{{user.gender}}</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="邮箱" link @click="inputDiaologTooggle('inputEmailDiaolog')">
				<template v-slot:footer>
					<view>
						<text>{{user.email}}</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="更改密码" link @click="inputDiaologTooggle('inputPasswordDiaolog')">
				<template v-slot:footer>
					<view>
						<text></text>
					</view>
				</template>
			</uni-list-item>
		</uni-list>

		<uni-popup ref="inputNickNameDiaolog" type="dialog">
			<uni-popup-dialog mode="input" title="更改名字" :value="user.nickName" placeholder="请输入名字"
				@confirm="dialogInputNicknameConfirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="inputGenderDiaolog" type="dialog">
			<uni-popup-dialog title="更改性别" @confirm="dialogInputGenderConfirm">
				<uni-data-checkbox v-model="updateGender" :localdata="gender"></uni-data-checkbox>
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="inputEmailDiaolog" type="dialog">
			<uni-popup-dialog title="更改邮箱">
				<uni-forms ref="emailRef" :rules="emailRules" :modelValue="emailForm">
					<uni-forms-item label="新邮箱" required name="email">
						<uni-easyinput v-model="emailForm.email" placeholder="请输入新邮箱" />
					</uni-forms-item>
					<uni-forms-item label="验证码" required name="code">
						<view class="user-popup-email-code">
							<uni-easyinput v-model="emailForm.code" placeholder="请输入验证码" />
							<button size="mini" type="warn" @click="getUpdateEmailCode('emailRef')">获取验证码</button>
						</view>
					</uni-forms-item>
					<button size="mini" type="warn" @click="updateEmail('emailRef')">修改</button>
				</uni-forms>
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="inputPasswordDiaolog" type="dialog">
			<uni-popup-dialog title="更改密码">
				<uni-forms ref="passwordRef" :rules="passwordRules" :modelValue="passwordForm">
					<uni-forms-item label="密码" required name="password">
						<uni-easyinput type="password" v-model="passwordForm.password" placeholder="输入旧密码" />
					</uni-forms-item>
					<uni-forms-item label="新密码" required name="newPassword">
						<uni-easyinput type="password" v-model="passwordForm.newPassword" placeholder="输入新密码" />
					</uni-forms-item>
					<button size="mini" type="warn" @click="updatePassword('passwordRef')">修改</button>
				</uni-forms>
			</uni-popup-dialog>
		</uni-popup>
	</view>

</template>

<script>
	import utils from "@/common/utils/utils.js"
	import userApi from "@/common/api/userApi.js"
	import rulesUtils from "@/common/utils/rulesUtils.js";
	export default {
		data() {
			return {
				uploadUpdateImages:{
					id:"",
					file:{}
				},
				imagesStyle: {
					"height":80, // 边框高度
					"width":80, // 边框宽度
				},
				imagesListStyle: {
					"borderStyle": {
						"color": "#eee", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "5px" // 边框圆角，不支持百分比
					},
					"border": false, // 是否显示边框
					"dividline": false // 是否显示分隔线
				},
				user: {},
				updateGender: '',
				gender: [{
					text: '男',
					value: '男'
				}, {
					text: '女',
					value: '女'
				}, {
					text: '未知',
					value: '未知'
				}],
				emailForm: {
					id: "",
					email: "",
					code: ""
				},
				emailRules: {
					email: {
						rules: [{
							required: true,
							errorMessage: '请输入新邮箱',
							trigger: 'blur'
						}, {
							validateFunction: rulesUtils.emailRules()
						}]
					},
					code: {
						rules: [{
							required: true,
							errorMessage: '请输入验证码',
							trigger: 'blur'
						}, {
							validateFunction: rulesUtils.emailCodeRules()
						}]
					},
				},
				passwordForm: {
					id: "",
					password: "",
					newPassword: ""
				},
				passwordRules: {
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入旧密码',
							trigger: 'blur'
						}, {
							validateFunction: rulesUtils.passwordRules()
						}],
					},
					newPassword: {
						rules: [{
							required: true,
							errorMessage: '请输入新密码',
							trigger: 'blur'
						}, {
							validateFunction: rulesUtils.passwordRules()
						}]
					},
				}

			}
		},
		onLoad() {
			this.user = utils.getCookieUser()
			this.updateGender = this.user.gender
			this.emailForm.id = this.user.id
			this.passwordForm.id = this.user.id
			this.uploadUpdateImages.id=this.user.id
		},
		methods: {
			toMy(){
				uni.switchTab({
					url:'/pages/my/my'
				})
			},
			updateImages(e) {
				let that=this
				// let tempFilePath = e.tempFilePaths[0];
				// console.log(tempFilePath)
				// // 将blob转换为base64字符串
				// let xhr = new XMLHttpRequest();
				// xhr.open('GET',tempFilePath);
				// xhr.responseType = 'blob';
				// xhr.onload = function () {
				// 	let blob = xhr.response;
				// 	let reader = new FileReader();
				// 	reader.readAsDataURL(blob);
				// 	reader.onloadend = function () {
				// 	   let base64Str = reader.result;
				// 			uni.uploadFile({
				// 			  url: 'http://127.0.0.1:8100/yxlt/user/updateUserAvatar',
				// 			  filePath: tempFilePath,
				// 			  name: 'file',
				// 			  formData: {
				// 				'imgurl':base64Str,
				// 				"id":that.uploadUpdateImages.id
				// 			  },
				// 			  success: function (res) {
				// 				if (JSON.parse(res.data).success === false) return utils.showToast('error', JSON.parse(res.data).msg)
				// 			    console.log(res)
				// 				that.getNewUserRmCookies();
				// 			  },
				// 			  fail: function (err) {
				// 				console.log('upload fail', err);
				// 			  }
				// 			});
				// 		}
				// }
				// xhr.send();
				
				
				this.uploadUpdateImages.file=e.tempFiles[0].file
				userApi.uploadUpdateImages(this.uploadUpdateImages).then(res=>{
					console.log(res)
					this.getNewUserRmCookies();
				}).catch(err=>{
					console.log(err)
				})
			},
			inputDiaologTooggle(diaolog) {
				this.$refs[diaolog].open()
			},
			dialogInputNicknameConfirm(val) {
				utils.showLoading('修改中')
				setTimeout(() => {
					utils.hideLoading()
					userApi.updateUser({
						"id": this.user.id,
						"nickname": val
					}).then(res => {
						this.thenMathod(res)
					}).catch(err => {
						utils.showToast("error", "修改失败")
						setTimeout(() => {
							this.$refs.inputGenderDiaolog.close()
							utils.hideToast();
						}, 1000)
					})
				}, 500)
			},
			dialogInputGenderConfirm(val) {
				utils.showLoading('修改中')
				setTimeout(() => {
					utils.hideLoading()
					userApi.updateUser({
						"id": this.user.id,
						"gender": this.updateGender
					}).then(res => {
						this.thenMathod(res)
					}).catch(err => {
						utils.showToast("error", "修改失败")
						setTimeout(() => {
							this.$refs.inputGenderDiaolog.close()
							utils.hideToast();
						}, 1000)
					})
				}, 500)
			},
			getUpdateEmailCode(ref) {
				this.$refs[ref].validateField(['email']).then(res => {
					if (that.user.email === that.emailForm.email) {
						utils.showToast('error', '新邮箱不能与旧邮箱相同')
						return;
					}
					userApi.getUpdateEmailCode({
						'email': that.emailForm.email
					}).then(res => {
						if (res.data.success === false) {
							utils.showToast('error', res.data.msg)
							return;
						}
						utils.showToast('success', res.data.msg)
					}).catch(err => {
						console.log(err)
						utils.showToast('error', err)
					})
				}).catch(err => {
					console.log(err)
				})
			},
			updateEmail(ref) {
				this.APiMethod(ref, userApi.updateEmail, this.emailForm, this.$refs.inputEmailDiaolog)
			},
			updatePassword(ref) {
				this.APiMethod(ref, userApi.updatePassword, this.passwordForm, this.$refs.inputPasswordDiaolog)
			},
			APiMethod(ref, apiNameMethod, data, resDiaolog) {
				utils.showLoading('修改中')
				let that = this;
				this.$refs[ref].validate().then(res => {
					apiNameMethod(data).then(res => {
						this.thenMathod(res)
					}).catch(err => {
						utils.showToast("error", "修改失败")
					}).finally(res => {
						setTimeout(() => {
							resDiaolog.close()
							utils.hideToast();
							utils.hideLoading();
						}, 1000)
					})
				}).catch(err => {
					console.log('err', err);
				})
				utils.hideLoading();
			},
			getNewUserRmCookies() {
				userApi.getNewCookie().then(res => {
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						setTimeout(() => {
							this.$refs.inputGenderDiaolog.close()
							utils.hideToast();
						}, 1000)
						return;
					}
					// utils.showToast('success', res.data.msg)
					utils.deleteCookieUser()
					utils.setCookieUser(JSON.stringify(res.data.data))
					uni.redirectTo({
						url: "/pages/my/user/user"
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
			thenMathod(res) {
				if (res.data.success === false) return utils.showToast('error', res.data.msg)
				utils.showToast('success', res.data.msg)
				this.getNewUserRmCookies();
			},
		}
	}
</script>

<style>
	.user-popup-email-code {
		display: flex;
		align-items: center;
	}
</style>
