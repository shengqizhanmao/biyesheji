//效验工具
export default {
	emailRules() {
		return (rule, value, data, callback) => {
			let emailDreg =
				/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
			if (!emailDreg.test(value)) {
				callback("邮箱格式不对,如:xxx@163.com")
			}
			return true
		};
	},
	emailCodeRules(){
		return (rule, value, data, callback) => {
			let codeDreg =/^[0-9A-Za-z]{6}$/
			if (!codeDreg.test(value)) {
				callback("请输入6位数字或者字母")
			}
			return true
		};
	},
	codeRules(){
		(rule, value, data, callback) => {
			let codeDreg =/^[a-zA-Z0-9]{4}$/
			if (!codeDreg.test(value)) {
				callback("请输入4位数字或者字母")
			}
			return true
		};
	},
	passwordRules(){
		return (rule, value, data, callback) => {
			let codeDreg =/^[a-zA-Z0-9]{5,17}$/
			if (!codeDreg.test(value)) {
				callback("请输入5-17位数字或者字母")
			}
			return true
		};
	}
}
