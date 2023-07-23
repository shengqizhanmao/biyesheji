<template>
	<view class="container">
		<view>
			<uni-nav-bar left-icon="left" @clickLeft="toBack()" title="修改帖子" :shadow="true" :fixed="true" />
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
					<editor id="editor" class="ql-container" placeholder="请输入帖子内容" showImgSize showImgToolbar
						showImgResize @statuschange="onStatusChange" :read-only="false" @ready="onEditorReady">
					</editor>
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
					id:"",
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
				palteListRange: [],
				palteList: [],
				modularsListRange: [],
				modularsList: [],
				categoryListRange: [],
				categoryList: [],
				//封面
				Img: {
					file: {}
				},
				imagesStyle: {
					"height": 80, // 边框高度
					"width": 80, // 边框宽度
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
		onLoad(e) {
			this.getArticle(e.articleId)
		},
		methods: {
			//返回
			toBack() {
				uni.switchTab({
					url: "/pages/creation/creation"
				})
			},
			getArticle(id){
				let that=this
				articleApi.getById(id).then(res=>{
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					let article=res.data.data
					that.getPalte(article.palteName, article.modularsName, article.categoryName, article.tagsNameList);
					that.articleFormData.id = article.id
					that.articleFormData.frontCover = article.frontCover;
					that.articleFormData.title = article.title
					that.articleFormData.summary = article.summary
					that.articleFormData.content = article.content
					that.articleFormData.contentHtml = article.contentHtml
					that.onEditorReady()
				}).catch(err => {
					console.log(err)
				})
			}
			,
			//板块
			getPalte(palteName, modularsName, categoryName, tagsList) {
				let that = this
				palteApi.GetPalte().then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					that.palteList = res.data.data
					for (let i = 0; i < that.palteList.length; i++) {
						that.palteListRange[i] = {
							text: "",
							value: ""
						}
						if (palteName == that.palteList[i].name) {
							that.articleFormData.palteId = that.palteList[i].id
							that.value = that.palteList[i].id
							that.getModulars2(that.palteList[i].id, modularsName);
							that.getCategorys2(that.palteList[i].id, categoryName)
							that.getTags2(that.palteList[i].id, tagsList)
						}
						that.palteListRange[i].text = that.palteList[i].name
						that.palteListRange[i].value = that.palteList[i].id
					}
				}).catch(err => {
					console.log(err)
				})
			},
			changePalte(e) {
				if (e == "") {
					this.modularsListRange = []
					this.articleFormData.modularsId = ""
					this.value2 = ""
					this.categoryListRange = []
					this.articleFormData.categoryId = ""
					this.value3 = ""
					this.TagsList = [],
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
					for (let i = 0; i < this.palteList.length; i++) {
						this.modularsListRange[i] = {
							text: "",
							value: ""
						}
						this.modularsListRange[i].text = this.modularsList[i].name
						this.modularsListRange[i].value = this.modularsList[i].id
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getModulars2(palteId, modularsName) {
				let that = this
				modularsApi.GetModulars(palteId).then(res => {
				if (res.data.success === false) return utils.showToast('error', res.data.msg)
					that.modularsList = res.data.data
					for (let i = 0; i < that.palteList.length; i++) {
						that.modularsListRange[i] = {
							text: "",
							value: ""
						}
						if (modularsName == that.modularsList[i].name) {
							that.articleFormData.modularsId = that.modularsList[i].id
							that.value2 = that.modularsList[i].id
						}
						that.modularsListRange[i].text = that.modularsList[i].name
						that.modularsListRange[i].value = that.modularsList[i].id
					}
				}).catch(err => {
					console.log(err)
				})
			},
			changeModulars(e) {
				if (e == "") return this.articleFormData.modularsId = ""
				this.articleFormData.modularsId = e
			},
			//分类
			getCategorys(palteId) {
				catgoryApi.getByPalteId(palteId).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					this.categoryList = res.data.data
					for (let i = 0; i < this.categoryList.length; i++) {
						this.categoryListRange[i] = {
							text: "",
							value: ""
						}
						this.categoryListRange[i].text = this.categoryList[i].name
						this.categoryListRange[i].value = this.categoryList[i].id
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getCategorys2(palteId, categorysName) {
				let that = this
				catgoryApi.getByPalteId(palteId).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					that.categoryList = res.data.data
					for (let i = 0; i < that.categoryList.length; i++) {
						that.categoryListRange[i] = {
							text: that.categoryList[i].name,
							value: that.categoryList[i].id
						}
						if (categorysName === that.categoryList[i].name) {
							that.articleFormData.categoryId = that.categoryList[i].id
							that.value3 = that.categoryList[i].id
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			changeCategory(e) {
				if (e === "") {
					this.articleFormData.categoryId = ""
					return;
				}
				this.articleFormData.categoryId = e
			},
			//封面
			updateImages(e) {
				let that=this
				that.Img.file = e.tempFiles[0].file
				articleApi.Img(that.Img).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					that.articleFormData.frontCover = res.data.data
				}).catch(err => {
					console.log(err)
				})
			},
			//标签：
			getTags(e) {
				console.log(e)
				tagsApi.getByPalteId(e).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					let TagsListRes = res.data.data;
					for (let i = 0; i < TagsListRes.length; i++) {
						this.TagsList[i] = {
							"id": "",
							"name": "",
							"type": "default",
							"inverted": false
						}
						this.TagsList[i].id = TagsListRes[i].id
						this.TagsList[i].name = TagsListRes[i].name
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getTags2(e, tagsList) {
				let that=this
				tagsApi.getByPalteId(e).then(res => {
					if (res.data.success === false) return utils.showToast('error', res.data.msg)
					let TagsListRes = res.data.data;
					for (let i = 0; i < TagsListRes.length; i++) {
						that.TagsList[i] = {
							"id": "",
							"name": "",
							"type": "default",
							"inverted": false
						}
						for(let j=0;j<tagsList.length;j++){
							if(tagsList[j]==TagsListRes[i].name){
								that.articleFormData.tagsList.push(TagsListRes[i].id)
								that.TagsList[i].type="success"
								that.TagsList[i].inverted=true
							}
						}
						that.TagsList[i].id = TagsListRes[i].id
						that.TagsList[i].name = TagsListRes[i].name
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
						if (item.id == this.articleFormData.tagsList[i]) {
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
				let that = this
				uni.createSelectorQuery().select('#editor').context((res) => {
					that.editorCtx = res.context
				}).exec()
				that.editorCtx.setContents({
					html: this.articleFormData.contentHtml
				})
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
				let formats = e.detail
				this.formats = formats
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
			},
			summit() {
				let that = this
				this.editorCtx.getContents({
					success: function(res) {
						that.articleFormData.contentHtml = res.html
						that.articleFormData.content = res.text
					},
					fail: function(error) {
						return console.log(error)
					}
				});
				let isRead = this.isRead();
				if (!isRead) {
					console.log("验证失败")
					return;
				}
				console.log("验证通过")
				articleApi.updateArticle(this.articleFormData).then(res => {
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
