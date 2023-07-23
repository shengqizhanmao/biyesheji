<template>
	<view class="container">
		<view>
			<uni-nav-bar left-icon="left" @clickLeft="toBack()" title="创作帖子" :shadow="true" :fixed="true" />
		</view>
		<view>
			<view class="view">
				<view class="view-item">
					<uni-forms-item label="标题" required>
						<uni-easyinput v-model="articleFormData.title" focus placeholder="请输入标题" />
					</uni-forms-item>
				</view>
			</view>
			<view class="view">
				<view class="view-item2">
					<uni-forms-item label="简介" required>
						<uni-easyinput v-model="articleFormData.summary" focus placeholder="请输入简介" />
					</uni-forms-item>
				</view>
			</view>
			<uni-section title="封面" padding>
				<view class="img">
					<uni-file-picker :disable-preview="true" :del-icon="false" :image-styles="imagesStyle"
						file-mediatype="image" :auto-upload="false" @select="updateImages" limit="1">
						<image style="width: 120rpx;height: 120rpx;" :src="articleFormData.frontCover"></image>
					</uni-file-picker>
				</view>
			</uni-section>
			<uni-grid :column="3" :square="false" :showBorder="false">
				<uni-grid-item>
					<uni-section title="板块" padding>
						<uni-data-select v-model="value" :localdata="palteListRange" @change="changePalte" />
					</uni-section>
				</uni-grid-item>
				<uni-grid-item>
					<uni-section title="模块" padding :square="false">
						<uni-data-select v-model="value2" :localdata="modularsListRange" @change="changeModulars" />
					</uni-section>
				</uni-grid-item>
				<uni-grid-item>
					<uni-section title="分类" padding :square="false">
						<uni-data-select v-model="value3" :localdata="categoryListRange" @change="changeCategory" />
					</uni-section>
				</uni-grid-item>
			</uni-grid>
			<uni-section title="请选择标签" padding>
				<view class="tags-view" v-for="item in TagsList" :key="item.id">
					<uni-tag @click="setType(item)" :inverted="item.inverted" :text="item.name" :type="item.type" />
				</view>
			</uni-section>
			<uni-section class="body-section" title="请输入内容" padding>
				<view class='wrapper'>
					<editor id="editor"  class="ql-container" placeholder="请输入帖子内容" showImgSize showImgToolbar
						showImgResize @statuschange="onStatusChange" :read-only="false" @ready="onEditorReady">
					</editor>
					<!-- 工具栏 -->
					<view class='toolbar' @tap="format">
						<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold">
						</view>
						<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti"
							data-name="italic"></view>
						<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian"
							data-name="underline"></view>
						<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian"
							data-name="strike"></view>
						<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi"
							data-name="align" data-value="left"></view>
						<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi"
							data-name="align" data-value="center"></view>
						<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi"
							data-name="align" data-value="right"></view>
						<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi"
							data-name="align" data-value="justify"></view>
						<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height"
							data-name="lineHeight" data-value="2"></view>
						<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing"
							data-name="letterSpacing" data-value="2em"></view>
						<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju"
							data-name="marginTop" data-value="20px"></view>
						<view :class="formats.previewarginBottom ? 'ql-active' : ''"
							class="iconfont icon-723bianjiqi_duanhouju" data-name="marginBottom" data-value="20px">
						</view>
						<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
						<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font"
							data-name="fontFamily" data-value="Pacifico"></view>
						<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize"
							data-name="fontSize" data-value="24px"></view>

						<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color"
							data-name="color" data-value="#0000ff"></view>
						<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''"
							class="iconfont icon-fontbgcolor" data-name="backgroundColor" data-value="#00ff00"></view>

						<view class="iconfont icon-date" @tap="insertDate"></view>
						<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
						<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie"
							data-name="list" data-value="ordered"></view>
						<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie"
							data-name="list" data-value="bullet"></view>
						<view class="iconfont icon-undo" @tap="undo"></view>
						<view class="iconfont icon-redo" @tap="redo"></view>

						<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
						<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
						<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
						<view class="iconfont icon-charutupian" @tap="insertImage"></view>
						<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1"
							data-name="header" :data-value="1"></view>
						<view :class="formats.header === 2 ? 'ql-active' : ''" class="iconfont icon-format-header-2"
							data-name="header" :data-value="2"></view>
						<view :class="formats.header === 3 ? 'ql-active' : ''" class="iconfont icon-format-header-3"
							data-name="header" :data-value="3"></view>
						<view :class="formats.header === 4 ? 'ql-active' : ''" class="iconfont icon-format-header-4"
							data-name="header" :data-value="4"></view>
						<view :class="formats.header === 5 ? 'ql-active' : ''" class="iconfont icon-format-header-5"
							data-name="header" :data-value="5"></view>
						<view :class="formats.header === 6 ? 'ql-active' : ''" class="iconfont icon-format-header-6"
							data-name="header" :data-value="6"></view>
						<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao"
							data-name="script" data-value="sub"></view>
						<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao"
							data-name="script" data-value="super"></view>
						<view class="iconfont icon-shanchu" @tap="clear"></view>
						<view :class="formats.direction === 'rtl' ? 'ql-active' : ''"
							class="iconfont icon-direction-rtl" data-name="direction" data-value="rtl"></view>
					</view>
				</view>
			</uni-section>
			<button @click="summit()">提交</button>
		</view>
	</view>
</template>

<script>
	import palteApi from '../../../common/api/palteApi';
	import modularsApi from "@/common/api/modularsApi.js"
	import catgoryApi from "@/common/api/categoryApi.js"
	import utils from '../../../common/utils/utils';
	import articleApi from "@/common/api/articleApi.js"
	import tagsApi from "@/common/api/tagsApi.js"
	export default {
		data() {
			return {
				//提交文章的表单
				articleFormData: {
					palteId: "",
					modularsId: "",
					categoryId: "",
					frontCover: "",
					title: "",
					summary: "",
					tagsList: [],
					content: "",
					contentHtml: ""
				},
				//板块模块分类选择器
				value: "",
				value2: "",
				value3: "",
				// 板块数据
				palteListRange: [],
				palteList: [],
				//模块数据
				modularsListRange: [],
				modularsList: [],
				//分类数据
				categoryListRange: [],
				categoryList: [],
				//封面
				Img: {
					file: {}
				},
				//文章里面的图片
				articleImg:{
					file: {}
				},
				//图片大小
				imagesStyle: {
					"height": 80, // 边框高度
					"width": 80, // 边框宽度
				},
				//图片样式
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
				//标签
				searchTags: "",
				TagsList: [],
				value4: "",
				//内容,富文本
				formats: {},
				editorCtx: {},
				html: "",
				text: "",
			}
		},
		onShow() {
			this.getPalte();
		},
		methods: {
			//返回
			toBack() {
				uni.switchTab({
					url: "/pages/creation/creation"
				})
			},
			//板块
			getPalte() {
				palteApi.GetPalte().then(res => {
					if (res.data.success === false) {
						utils.showToast('error', res.data.msg)
						return;
					}
					this.palteList = res.data.data
					for (let i = 0; i < this.palteList.length; i++) {
						this.palteListRange[i] = {
							text: "",
							value: ""
						}
						this.palteListRange[i].text = this.palteList[i].name
						this.palteListRange[i].value = this.palteList[i].id
					}
				}).catch(err => {
					console.log(err)
				})
			},
			changePalte(e) {
				if (e === "") {
					this.modularsListRange = []
					this.articleFormData.modularsId = ""
					this.value2 = ""
					this.categoryListRange = []
					this.articleFormData.categoryId = ""
					this.value3 = ""
					this.TagsList = []
					this.articleFormData.tagsList = []
					return
				}
				this.articleFormData.palteId = e
				this.getModulars(e)
				this.getCategorys(e)
				this.getTags(e)
			},
			//模块
			getModulars(palteId) {
				modularsApi.GetModulars(palteId).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					this.modularsList = res.data.data
					for (let i = 0; i < this.modularsList.length; i++) {
						this.modularsListRange[i] = {
							text: this.modularsList[i].name,
							value: this.modularsList[i].id
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//点击模块
			changeModulars(e) {
				if (e === "") return this.articleFormData.modularsId = ""
				this.articleFormData.modularsId = e
			},
			//获取分类
			getCategorys(palteId) {
				catgoryApi.getByPalteId(palteId).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					this.categoryList = res.data.data
					for (let i = 0; i < this.categoryList.length; i++) {
						this.categoryListRange[i] = {
							text: this.categoryList[i].name,
							value: this.categoryList[i].id
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			changeCategory(e) {
				if (e === "") return this.articleFormData.categoryId = ""
				this.articleFormData.categoryId = e
			},
			//封面
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
				// 			  url: 'http://127.0.0.1:8100/yxlt/article/img',
				// 			  filePath: tempFilePath,
				// 			  name: 'file',
				// 			  formData: {
				// 				'imgurl':base64Str
				// 			  },
				// 			  success: function (res) {
				// 				if (JSON.parse(res.data).success === false) return utils.showToast('error', JSON.parse(res.data).msg)
				// 				that.articleFormData.frontCover = JSON.parse(res.data).data
				// 				console.log(that.articleFormData.frontCover)
				// 			  },
				// 			  fail: function (err) {
				// 				console.log('upload fail', err);
				// 			  }
				// 			});
				// 		}
				// }
				// xhr.send();
				that.Img.file = e.tempFiles[0].file
				articleApi.Img(that.Img).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					that.articleFormData.frontCover = res.data.data
				}).catch(err => {
					console.log(err)
				})
			},
			//标签：
			getTags(palteId) {
				tagsApi.getByPalteId(palteId).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					let TagsListRes = res.data.data;
					for (let i = 0; i < TagsListRes.length; i++) {
						this.TagsList[i] = {
							"id":  TagsListRes[i].id,
							"name": TagsListRes[i].name,
							"type": "default",
							"inverted": false
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			setType(item) {
				if (item.inverted) {
					item.type = "default"
					item.inverted = false
					for (let i = 0; i < this.articleFormData.tagsList.length; i++) {
						if (item.id === this.articleFormData.tagsList[i]) {
							this.articleFormData.tagsList.splice(i, 1);
						}
					}
					return;
				}
				item.type = "success"
				item.inverted = true
				this.articleFormData.tagsList.push(item.id);
			},
			change4(e) {
				console.log(e)
			},
			//内容
			onEditorReady() {
				//初始化
				let that = this
				uni.createSelectorQuery().select('#editor').context((res) => {
					that.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				this.editorCtx.format(name, value)
			},
			onStatusChange(e) {
				this.formats = e.detail
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("清空成功")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				let date = new Date()
				let formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				let that=this
				uni.chooseImage({
					count: 1,
					success: (res) => {
						articleApi.Img({file:res.tempFiles[0]}).then(res => {
							console.log(res)
							if (res.data.success === false) return utils.showToast('error', res.data.msg)
							that.editorCtx.insertImage({
								src: res.data.data,
								alt: '图像',
								success: function() {
									console.log('插入图片成功')
								}
							})
						}).catch(err => {
							console.log(err)
						})
					}
				})
				// uni.chooseImage({
				// 	  count: 1,
				// 	  success: function (res) {
				// 	    var tempFilePath = res.tempFilePaths[0];
				// 		// 将blob转换为base64字符串
				// 		var xhr = new XMLHttpRequest();
				// 		xhr.open('GET',tempFilePath);
				// 		xhr.responseType = 'blob';
				// 		xhr.onload = function () {
				// 		  var blob = xhr.response;
				// 		  var reader = new FileReader();
				// 		  reader.readAsDataURL(blob);
				// 		  reader.onloadend = function () {
				// 		    var base64Str = reader.result;
				// 			// 上传图片文件到后端
				// 			uni.uploadFile({
				// 			  url: 'http://127.0.0.1:8100/yxlt/article/img',
				// 			  filePath: tempFilePath,
				// 			  name: 'file',
				// 			  formData: {
				// 			    'imgurl':base64Str
				// 			  },
				// 			  success: function (res) {
				// 				if (res.data.success === false) return utils.showToast('error', res.data.msg)
				// 				that.editorCtx.insertImage({
				// 				src: JSON.parse(res.data).data,
				// 				alt: '图像',
				// 				success: function() {
				// 				  	console.log('插入图片成功')
				// 				  	}
				// 				})
				// 			  },
				// 			  fail: function (err) {
				// 			    console.log('upload fail', err);
				// 			  }
				// 			});
				// 		  };
				// 		};
				// 		xhr.send();
				// 	  }
				// 	});
			},
			summit() {
				let that = this
				this.editorCtx.getContents({
					success: function(res) {
						that.articleFormData.contentHtml= res.html
						that.articleFormData.content = res.text
					},
					fail: function(error) {
						console.log(error) 
						return;
					}
				});
				console.log(that.articleFormData.contentHtml)
				let isRead = this.isRead();
				if (!isRead) return console.log("验证失败")
				console.log("验证通过")
				articleApi.applyArticle(this.articleFormData).then(res => {
					utils.thenMathod(res)
				}).catch(err => {
					console.log(err);
				})
				//
				uni.switchTab({
					url: "/pages/creation/creation"
				})
			},
			isRead() {
				let isRead = true;
				if (this.articleFormData.content === "/n") {
					isRead = false
					utils.showToast("error", "内容不能为空")
				}
				if (this.articleFormData.contentHtml === "<p><br></p>") {
					isRead = false
					utils.showToast("error", "内容不能为空")
				}
				isRead = this.isReadMethod(isRead, this.articleFormData.categoryId, "分类不能为空")
				isRead = this.isReadMethod(isRead, this.articleFormData.modularsId, "模块不能为空")
				isRead = this.isReadMethod(isRead, this.articleFormData.palteId, "板块不能为空")
				isRead = this.isReadMethod(isRead, this.articleFormData.frontCover, "封面不能为空")
				isRead = this.isReadMethod(isRead, this.articleFormData.summary, "简介不能为空")
				isRead = this.isReadMethod(isRead, this.articleFormData.title, "标题不能为空")
				return isRead;
			},
			isReadMethod(isRead, data, msg) {
				if (data === "") {
					isRead = false
					utils.showToast("error", msg)
					return isRead;
				}
				return isRead;
			}
		}
	}
</script>

<style>
	@import "@/static/cs.css";

	.container {
		height: 100vh;
	}

	.img {
		margin-left: 20rpx;
	}

	.view {
		height: 80rpx;
	}

	.view-item {
		margin-left: 30rpx;
		max-width: 680rpx;
		margin-top: 20rpx;
	}

	.view-item2 {
		margin-top: 20rpx;
		margin-left: 30rpx;
		max-width: 680rpx;
	}

	.tags-view {
		float: left;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.body-section {
		margin-top: 50rpx;
		clear: both;
	}

	/* 富文本 */
	.wrapper {
		padding: 5px;
		border: solid 1rpx;
	}

	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}

	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;

	}

	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: auto;
		background: #fff;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}
</style>
