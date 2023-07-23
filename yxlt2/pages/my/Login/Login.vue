<template>
	<view class="Login">
		<view >
			<uni-nav-bar left-icon="left" rightText="邮箱登录" title="账号密码登录" shadow="true" fixed="true" @clickLeft="toMy()" @clickRight="toEmailLogin()"/>
		</view>
		<uni-section class="Login-forms" title="用户登录" type="line">
			<view>
				<uni-forms ref="loginForm" :rules="loginRules" :modelValue="loginFormData">
					<uni-forms-item label="账号" required name="username">
						<uni-easyinput v-model="loginFormData.username" placeholder="请输入账号" />
					</uni-forms-item>
					<uni-forms-item label="密码" required name="password">
						<uni-easyinput type="password" v-model="loginFormData.password" placeholder="请输入密码" />
					</uni-forms-item>
					<uni-forms-item label="验证码" required name="code">
						<uni-easyinput v-model="loginFormData.code" placeholder="请输入密码" />
					</uni-forms-item>
					<image @click="getCode" class="Login-forms-codeImage" :src="codeUrl"></image>
				</uni-forms>
				<button class="Login-forms-button" plain="true" @click="toRegister()" type="warn">注册</button>
				<button class="Login-forms-button2" type="warn" @click="Login('loginForm')">登录</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import loginApi from '@/common/api/loginApi.js';
	import userApi from '@/common/api/userApi.js';
	import utils from "@/common/utils/utils.js";
	import rulesUtils from "@/common/utils/rulesUtils.js";
	export default {
		data() {
			return {
				loginFormData: {
					username: '',
					password: '',
					code:''
				},
				// 自定义表单校验规则
				loginRules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '账号不能为空'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						},{validateFunction:rulesUtils.passwordRules()}]
					},
					code:{
						rules: [{
							required: true,
							errorMessage: '验证码不能为空'
						},{
							validateFunction:rulesUtils.codeRules()
						}]
					}
				},
				codeDate:"",
				codeUrl:"",
			}
		},
		onShow() {
			this.getCode()
		},
		methods: {
			getCode() {
					this.codeDate=new Date().getTime();
					this.codeUrl =loginApi.getCode() +this.codeDate
			},//进行登录
			Login(ref) {
				let that = this;
				this.$refs[ref].validate().then(res => {
					that.LoginMethods()
				}).catch(err => {
					console.log('err', err);
					that.getCode()
				}).finally(res=>{
					utils.hideToast()
				})
			},
			LoginMethods() {
				let that = this;
				utils.showToast('loading',"登录中")
				loginApi.Login({'time':that.codeDate},that.loginFormData).then(res => {
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
					//发送登录请求失败
				}).catch(err => {
					utils.showToast('error', '验证码过期,请在一分钟内登录')
					that.getCode()
				})
			},//根据token获取用户
			UserByTokenMethods() {
				let that = this;
				//发送根据token获取用户请求成功
				userApi.getUserByToken().then(res => {
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					utils.setCookieUser(JSON.stringify(res.data.data))
					//发送根据token获取用户请求失败
				}).catch(err => {
					utils.showToast('error', '登录失败:UserByTokenMethods:',+err)
					that.getCode()
					return;
				})
			},
			toMy(){
				uni.switchTab({
					url:'/pages/my/my'
				})
			},
			toEmailLogin(){
				uni.navigateTo({
					url:'/pages/my/Login/EmailLogin'
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
		width:300rpx;
	}

	.Login-forms-button2 {
		float: right;
		width: 250rpx;
	}
	.Login-forms-codeImage{
		width: 400rpx;
		height:150rpx;
	}
</style>
