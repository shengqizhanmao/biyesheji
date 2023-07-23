//时间转换,formatDateMethod(new Date(), "yyyy-MM-dd hh:mm:ss");
export default {
	/**
	 * 日期格式转换
	 *   */
	formatDate(timestamp) {
		return this.formatDateMethod(timestamp, "yyyy-MM-dd hh:mm:ss");
	},
	//日期格式转换
	formatDateMethod(timestamp, fmt) {
		let date = new Date(timestamp);
		if (!date) {
			return '';
		}
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		};
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + '';
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
			}
		}
		return fmt;
	},
	padLeftZero(str) {
		return ('00' + str).substr(str.length);
	},
	/**
	 * 根据当前时间,显示时间
	   */
	friendlyDate(timestamp) {
		//现在的时间
		let now = this.formatDateMethod(new Date(), "yyyy-MM-dd hh:mm:ss");
		//传输过来的时间
		let now2 = this.formatDateMethod(timestamp, "yyyy-MM-dd hh:mm:ss");
		//现在的时间
		//4,7,13,16是分隔符-,10是空格
		let years2 = now[0] + now[1] + now[2] + now[3];
		let months2 = now[5] + now[6];
		let days2 = now[8] + now[9];
		let hours2 = now[11] + now[12];
		let minutes2 = now[14] + now[15];
		let seconds2 = now[17] + now[18];
		//传输过来的时间
		let years3 = now2[0] + now2[1] + now2[2] + now2[3];
		let months3 = now2[5] + now2[6];
		let days3 = now2[8] + now2[9];
		let hours3 = now2[11] + now2[12];
		let minutes3 = now2[14] + now2[15];
		let seconds3 = now2[17] + now2[18];
		if (years2 != years3) { //不是本年份,直接显示时间
			return now2
		} 
		if (months2 != months3) { //不是本月份,直接显示时间
			if(now2[5]==0) return now2[6]+ "月" + days3 + "日 " + hours3 + ":" + minutes3 
			return  months3 + "月" + days3 + "日 " + hours3 + ":" + minutes3 
		} 
		if(days2 != days3){ //不是本日,显示月份
			if(now2[5]==0) return now2[6]+ "月" + days3 + "日 " + hours3 + ":" + minutes3 
			return  months3 + "月" + days3 + "日 " + hours3 + ":" + minutes3 
		}
		return  hours3 + ":" + minutes3 
	}
}
