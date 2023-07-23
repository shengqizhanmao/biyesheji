<template>
	<view class="Login">
		<view>
			<uni-nav-bar left-icon="left" rightText="账号登录" title="邮箱登录" shadow="true" fixed="true" @clickLeft="toMy()"
				@clickRight="toLogin()" />
		</view>
		<uni-section class="Login-forms" title="邮箱登录" type="line">
			<view>
				<uni-forms ref="emailForm" :rules="emailRules" :modelValue="emailForm">
					<uni-forms-item label="邮箱" required name="email">
						<uni-easyinput v-model="emailForm.email" placeholder="请输入邮箱" />
					</uni-forms-item>
					<uni-forms-item label="验证码" required name="code">
						<view class="Login-forms-item-code">
							<uni-easyinput v-model="emailForm.code" placeholder="请输入验证码" />
							<button size="mini" type="warn" @click="getLoginEmailCode('emailForm')">获取验证码</button>
						</view>
					</uni-forms-item>
				</uni-forms>
				<button class="Login-forms-button" plain="true" type="warn" @click="toRegister()">注册</button>
				<button class="Login-forms-button2" type="warn" @click="loginEmail('emailForm')">登录</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import userApi from "@/common/api/userApi.js"
	import loginApi from "@/common/api/loginApi.js"
	import utils from "@/common/utils/utils"
	import rulesUtils from "@/common/utils/rulesUtils.js"
	export default {
		data() {
			return {
				emailForm: {
					email: '',
					code: ''
				},
				emailRules: {
					email:{
						rules:[{
							required: true,
							errorMessage: '请输入邮箱',
						},{validateFunction:rulesUtils.emailRules()}
						],
					},
					code:{ 
						rules:[{
							required: true,
							errorMessage: '请输入验证码',
						},
						{validateFunction:rulesUtils.emailCodeRules()}
						],
					}
				},
			}
		},
		methods: {
			getLoginEmailCode(ref) {
				this.$refs[ref].validateField(['email']).then(res=>{
					loginApi.getEmailCode({'email': this.emailForm.email}).then(res => {
						utils.thenMathod(res)
					}).catch(err => {
						console.log("err", err)
					})
				}).catch(err=>{
					console.log(err)
				})
			},
			//效验
			loginEmail(ref) {
				let that=this
				that.$refs[ref].validate().then(res => {
					that.loginEmailMethod()
				}).catch(err => {
					console.log('err', err);
				})
			},
			loginEmailMethod(){
				let that=this
				loginApi.LoginEmail(that.emailForm).then(res => {
					console.log(res)
					console.log(res.data.msg)
					utils.showToast('error', res.data.msg)
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					that.UserByTokenMethods();
					utils.setCookieToken(res.data.data)
					utils.showToast('success', res.data.msg)
					setTimeout(() => {
						uni.switchTab({
							url: "/pages/my/my"
						});
					}, 500)
				}).catch(err => {
					console.log("err", err)
				})
			}
			,//根据token获取用户
			UserByTokenMethods() {
				let that = this;
				//发送根据token获取用户请求成功
				userApi.getUserByToken().then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					utils.setCookieUser(JSON.stringify(res.data.data))
					//发送根据token获取用户请求失败
				}).catch(err => {
					utils.showToast('error', '登录失败:UserByTokenMethods:',+err)
					return;
				})
			},
			toMy() {
				uni.switchTab({
					url: '/pages/my/my'
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/my/Login/Login'
				})
			},
			//注册
			toRegister(){
				uni.navigateTo({
					url:'/pages/my/Login/register'
				})
			},
		}
	}
</script>


<style lang="scss" scoped>
	.Login {
		background: #f6f6f6;
		height: 100vh;
	}

	.Login-forms {
		position: relative;
		margin: 10rpx;
		top: 100px;
		background-color: #ffffff;
	}

	.Login-forms-button {
		float: left;
		width: 300rpx;
	}

	.Login-forms-button2 {
		float: right;
		width: 250rpx;
	}

	.Login-forms-item-code {
		display: flex;
		align-items: center;
	}
</style>
