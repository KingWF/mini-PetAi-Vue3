<template>
  <image class="image1" mode="widthFix" :src="src"></image>
  <!-- 弹出图片信息 -->
  <view>
    <view v-if="showPopup" class="popup">
      <view class="vie-mesg">
        <view class="vie-v2">
          <view class="child">
            <text class="t1">{{ petKind }}</text>
            <text class="t2">犬种</text>
          </view>
          <div class="petInfo">
            <div class="petInfo-image">
              <image :src="petImage1" mode="scaleToFill" class="img-1" />
              <image :src="petImage2" mode="scaleToFill" class="img-1" />
            </div>
          </div>
        </view>
        <view class="vie-v3">
          <div class="v3-info">
            <div class="info1">
              <div class="info-1">
                <text>动物学史</text>
              </div>
              <div class="info-2">
                <text>{{ petDesc }}</text>
              </div>
            </div>
            <div class="info1">
              <div class="info-1">
                <text>形态特征</text>
              </div>
              <div class="info-2">
                <text>{{ petFeature }}</text>
              </div>
            </div>
          </div>
        </view>
      </view>
    </view>
    <view v-if="showPopup" class="mask" @click="togglePopup"></view>
    <view v-if="isLoading" class="loading">
      <!-- <view class="ring">
        <view>sss</view>
        <view class="line"></view>
      </view> -->
      <view class="box">
        <view class="circle-line1">
          <text></text>
          <text></text>
          <text></text>
          <text></text>
          <text></text>
          <text></text>
          <text></text>
          <text></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getPetBreedInformationAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'

import { ref } from 'vue'
// 宠物数据库baseUrl
const petUrl = 'http://localhost:8888/uploads/pet/'
// http://localhost:8888/uploads/pet/
// https://mfg8uf6pxn2i.ngrok.xiaomiqiu123.top/uploads/pet/
// 是否正在加载
let isLoading = ref(true)
let petName = ref()
// 拍摄的图片的临时路径
let src = ref('')
let showPopup = ref(false)

let petuid = ref(-1)
let petKind = ref('正在加载中···')
let petImage1 = ref(
  'https://bkimg.cdn.bcebos.com/pic/9d82d158ccbf6c81800a78aa8c68a63533fa828bea61?x-bce-process=image/format,f_auto/resize,m_lfit,limit_1,h_336',
)
let petImage2 = ref('https://b.zol-img.com.cn/soft/6/434/cerHmI26yCoo.jpg')
let petFeature = ref('正在加载中···')
let petDesc = ref('正在加载中···')

onLoad((e: any) => {
  console.log(e.src)
  src.value = e.src
  isLoading.value = true
  setTimeout(function () {
    togglePopup()
    isLoading.value = false
  }, 4000) // 这里的 1000 表示延时的时间，单位是毫秒
  // 测试py端识别代码
  testPyIdentifyBase()
})
// 宠物识别
const testPyIdentifyBase = () => {
  confirmUploadAavatarAndInformation()
}
// 上传拍摄的图片至python端服务器
const confirmUploadAavatarAndInformation = () => {
  console.log('上传拍摄的图片至python端服务器')
  uni.uploadFile({
    url: 'http://127.0.0.1:5000/uploadFile', //仅为示例，非真实的接口地址
    filePath: src.value,
    name: 'file',
    formData: {},
    dataType: 'json',
    success: (uploadFileRes) => {
      console.log('上传成功')
      const data = JSON.parse(uploadFileRes.data) // 解析 JSON 数据
      console.log('解析后的数据', data)
      petKind.value = data.petName
      // 根据宠物分类uid获取该品种信息
      getgetPetBreedInformation(data.uid)
    },
    fail: (fail) => {
      console.log('上传失败')
    },
  })
}
const getgetPetBreedInformation = async (uid: number) => {
  console.log('识别动物种类')
  const res = await getPetBreedInformationAPI(uid)
  petuid.value = uid
  petImage1.value = petUrl + res.result[0].petImagefirst
  petImage2.value = petUrl + res.result[0].petImagesecond
  petDesc.value = res.result[0].petDesc
  petFeature.value = res.result[0].petFeature
  console.log(res.result)
}
const togglePopup = () => {
  showPopup.value = !showPopup.value
}
// const submit = () => {
//   showPopup.value = false
// }
// const cancel = () => {
//   uni.redirectTo({ url: '/pages/index/homePetMess/PetIdentification/PetIdentification' })
// }
</script>

<style lang="scss">
.image1 {
  height: 100rpx;
}
/* 弹窗效果 */
.popup {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to bottom, #2b81c7, #ffffff);
  box-sizing: border-box;
  z-index: 999;
}
// 加载效果
.loading {
  position: fixed;
  bottom: 50%;
  left: 0;
  width: 100%;
  height: 400rpx;
  background-color: #ffffff00;
  z-index: 999;
}
/* 遮罩层 */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 888;
}

.vie-mesg {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.vie-v2 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #bdffc100;
}
.vie-v2 .child {
  margin: 5rpx 20rpx;
  background-color: #9480e400;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.vie-v2 .child .t1 {
  font-size: 40rpx;
  color: #ffffff;
}
.vie-v2 .child .t2 {
  margin-top: 3rpx;
}
.petInfo {
  background-color: rgba(146, 204, 255, 0);
  padding-left: 20rpx;
  padding-right: 20rpx;
}
.petInfo-image {
  background-color: #c0bdff00;
  height: 200rpx;
  width: 100%;
  display: flex;
  margin-top: 20rpx;
  justify-content: space-between;
}
.img-1 {
  width: 48%;
  height: 200rpx;
}
.vie-v3 {
  width: 100%;
  // height: 800rpx;
  background-color: #ffffff00;
  padding-left: 20rpx;
  padding-right: 20rpx;
}
.v3-info {
  margin-top: 20rpx;
  // height: 600rpx;
  background-color: #fff;
}
.info1 {
  // background-color: #1763a2;
  margin-bottom: 20rpx;
  .info-1 {
    border-left: 10rpx solid #143a68;
    text {
      font-size: 30rpx;
      font-weight: bolder;
      margin-left: 5rpx;
    }
  }
}
.info-2 {
  margin-left: 20rpx;
  margin-right: 20rpx;
  text {
    font-size: smaller;
    color: #2f2f2f;
  }
}
// 加载动态
/* 第一个 */
.ring {
  position: relative;
  margin: 40rpx auto;
  width: 80px;
  height: 80px;
  text-align: center; /* 字体水平居中 */
  line-height: 80px;
  font-size: 20px;
  letter-spacing: 4px;
  background: transparent;
  border: 2px solid #3c3c3c;
  border-radius: 50%;
  box-shadow: 0 0 20 rgba(0, 0, 0, 0.5);
  user-select: none; /* 无法选中 */
}
.ring::before {
  content: ''; /* 内容 */
  position: absolute;
  z-index: 99;
  top: -3px;
  left: -3px;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #b3205d;
  border-right: 3px solid #771940;
  border-radius: 50%;
  animation: animateCircle 2s linear infinite; /* 动画：名称 时间 速率 重复 */
}
.line {
  display: block;
  position: absolute;
  top: calc(50% - 2px);
  left: 50%;
  width: 50%;
  height: 4px;
  background: transparent;
  transform-origin: left; /* 动画开始位置 */
  animation: animate 2s linear infinite;
  transform: rotate(45deg);
}
.line::before {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #b3205d;
  top: -4px;
  right: -4px;
  box-shadow: 0 0 20px #b3205d;
}
@keyframes animate {
  100% {
    /* 360+45 */
    transform: rotate(405deg);
  }
}
@keyframes animateCircle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 下一个
/* 第四个 */
.circle-line1 text {
  display: block;
  width: 40px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 40px);
  transform-origin: center right;
  animation: circle1 1.5s linear infinite;
}
.circle-line1 text::before {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 10px;
  background-color: #a8c992;
}
.circle-line1 text:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: 0.2s;
}
.circle-line1 text:nth-child(2) {
  transform: rotate(45deg);
  animation-delay: 0.4s;
}
.circle-line1 text:nth-child(3) {
  transform: rotate(90deg);
  animation-delay: 0.6s;
}
.circle-line1 text:nth-child(4) {
  transform: rotate(135deg);
  animation-delay: 0.8s;
}
.circle-line1 text:nth-child(5) {
  transform: rotate(180deg);
  animation-delay: 1s;
}
.circle-line1 text:nth-child(6) {
  transform: rotate(225deg);
  animation-delay: 1.2s;
}
.circle-line1 text:nth-child(7) {
  transform: rotate(270deg);
  animation-delay: 1.4s;
}
.circle-line1 text:nth-child(8) {
  transform: rotate(315deg);
  animation-delay: 1.6s;
}
@keyframes circle1 {
  0% {
    opacity: 0.15;
  }
  100% {
    opacity: 0.9;
  }
}
</style>
