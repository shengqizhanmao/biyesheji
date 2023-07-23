
const token='yxlt_token'
const user='user'
export default
{
	//uni的方法,error,success是错误还是正确的提示框,title为提示内容
	showToast(inputIcon,inputTitle){
		uni.showToast({
			title:inputTitle,
			icon:inputIcon
		})
	},
	//隐藏提示框
	hideToast(){
		uni.hideToast();
	},
	//加载提示框
	showLoading(inputTitle){
		uni.showLoading({
			title: inputTitle
		})
	},
	//加载提示框结束
	hideLoading(){
		uni.hideLoading();
	},
	//统用的回调函数
	thenMathod(res) {
		if (res.data.success === false) {
			return this.showToast('error', res.data.msg)
		}
		this.showToast('success', res.data.msg)
	},
	setCookie(key,data){
		window.$cookies.set(key, data)
	},
	setCookieToken(data){
		window.$cookies.set(token, data)
	},
	setCookieUser(data){
		window.$cookies.set(user, data)
	},
	getCookie(key){
		return window.$cookies.get(key)
	},
	getCookieUser(){
		return window.$cookies.get(user)
	},
	deleteCookie(key){
		window.$cookies.remove(key)
	},
	deleteCookieToken(){
		window.$cookies.remove(token)
	},
	deleteCookieUser(){
		window.$cookies.remove(user)
	}

}