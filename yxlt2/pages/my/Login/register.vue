<template>
	<view class="register">
		<view >
			<uni-nav-bar left-icon="left" title="账号注册" shadow="true" fixed="true" @clickLeft="toRegister()"/>
		</view>
		<uni-section class="register-forms" title="账号注册" type="line">
			<view>
				<uni-forms ref="registerForm" :rules="registerRules" :modelValue="registerFormData">
					<uni-forms-item label="账号" required name="username">
						<uni-easyinput v-model="registerFormData.username" placeholder="请输入账号" />
					</uni-forms-item>
					<uni-forms-item label="昵称" required name="nickname">
						<uni-easyinput v-model="registerFormData.nickname" placeholder="请输入密码" />
					</uni-forms-item>
					<uni-forms-item label="密码" required name="password">
						<uni-easyinput type="password" v-model="registerFormData.password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<button class="register-forms-button" plain="true" @click="register('registerForm')" type="warn">提交</button>
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
				registerFormData: {
					username: '',
					nickname:'',
					password: '',
				},
				// 自定义表单校验规则
				registerRules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '账号不能为空'
						}]
					},
					nickname: {
						rules: [{
							required: true,
							errorMessage: '昵称不能为空'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						},{validateFunction:rulesUtils.passwordRules()}]
					},
				},
			}
		},
		methods: {
			//进行登录
			register(ref) {
				let that = this;
				this.$refs[ref].validate().then(res => {
					that.registerMethods()
				}).catch(err => {
					console.log('err', err);
				}).finally(res=>{
					utils.hideToast()
				})
			},
			registerMethods() {
				let that = this;
				utils.showToast('loading',"注册中")
				loginApi.Register(that.registerFormData).then(res => {
					console.log(res)
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					utils.showToast('success', res.data.msg)
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/my/Login/Login"
						});
					}, 500)
				}).catch(err => {
					utils.showToast('error', err)
				})
			},
			toMy(){
				uni.switchTab({
					url:'/pages/my/my'
				})
			},
			//注册
			toRegister() {
				uni.navigateTo({
					url: '/pages/my/Login/Login'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.register {
		background: #f6f6f6;
		height: 100vh;
	}
	.register-forms {
		position: relative;
		margin: 10rpx;
		top: 100px;
		background-color: #ffffff;
	}
	.register-forms-button {
		float:center;
		width:300rpx;
	}

</style>
