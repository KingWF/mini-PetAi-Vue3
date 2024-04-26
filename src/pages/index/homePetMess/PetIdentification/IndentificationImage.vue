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
  </view>
</template>

<script lang="ts" setup>
import { getPetBreedInformationAPI, testPyIdentifyAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

let petName = ref()
// 拍摄的图片的临时路径
let src = ref('')
let showPopup = ref(false)

let petuid = ref(-1)
let petKind = ref()
let petImage1 = ref(
  'https://bkimg.cdn.bcebos.com/pic/9d82d158ccbf6c81800a78aa8c68a63533fa828bea61?x-bce-process=image/format,f_auto/resize,m_lfit,limit_1,h_336',
)
let petImage2 = ref(
  'https://th.bing.com/th/id/OIP.rrf-DSrddfPmdnHtSQcT5wAAAA?w=220&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
)
let petFeature = ref('sdasdaddc上的发达的')
let petDesc = ref()

onLoad((e: any) => {
  console.log(e.src)
  src.value = e.src
  setTimeout(function () {
    togglePopup()
  }, 700) // 这里的 1000 表示延时的时间，单位是毫秒
  // 测试py端识别代码
  testPyIdentifyBase()
})
// 宠物识别
const testPyIdentifyBase = () => {
  confirmUploadAavatarAndInformation()
}
// 上传拍摄的图片至python端服务器
const confirmUploadAavatarAndInformation = () => {
  uni.uploadFile({
    url: 'http://127.0.0.1:5000/uploadFile', //仅为示例，非真实的接口地址
    filePath: src.value,
    name: 'file',
    formData: {},
    dataType: 'json',
    success: (uploadFileRes) => {
      const data = JSON.parse(uploadFileRes.data) // 解析 JSON 数据
      console.log('解析后的数据', data)
      petKind.value = data.petName
      // 根据宠物分类uid获取该品种信息
      getgetPetBreedInformation(data.uid)
    },
  })
}
const getgetPetBreedInformation = async (uid: number) => {
  const res = await getPetBreedInformationAPI(uid)
  petuid.value = uid
  petImage1.value = res.result[0].petImagefirst
  petImage2.value = res.result[0].petImagesecond
  petDesc.value = res.result[0].petDesc
  petFeature.value = res.result[0].petFeature
  console.log(res.result)
}
const togglePopup = () => {
  showPopup.value = !showPopup.value
}
const submit = () => {
  showPopup.value = false
}
const cancel = () => {
  uni.redirectTo({ url: '/pages/index/homePetMess/PetIdentification/PetIdentification' })
}
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
  background: linear-gradient(to bottom, #1763a2, #ffffff);
  box-sizing: border-box;
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
</style>
