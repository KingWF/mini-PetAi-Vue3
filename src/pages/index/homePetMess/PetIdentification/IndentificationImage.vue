<template>
  <image class="image1" mode="widthFix" :src="src"></image>
  <!-- 弹出图片信息 -->
  <view>
    <view v-if="showPopup" class="popup">
      <view class="vie-mesg">
        <view class="vie-v2">
          <view class="child">
            <text class="t1">威尔士柯基犬</text>
            <text class="t2">犬种</text>
          </view>
          <div class="petInfo">
            <div class="petInfo-image">
              <image
                src="https://bkimg.cdn.bcebos.com/pic/9345d688d43f879410276ff6d81b0ef41ad53a09?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080"
                mode="scaleToFill"
                class="img-1"
              />
              <image
                src="https://bkimg.cdn.bcebos.com/pic/caef76094b36acaf2edd8ea94c8f9a1001e939013612?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080"
                mode="scaleToFill"
                class="img-1"
              />
            </div>
          </div>
        </view>
        <view class="vie-v3">
          <div class="v3-info">
            <div class="info1">
              <div class="info-1">
                <text>{{ petText[0].name }}</text>
              </div>
              <div class="info-2">
                <text>{{ petText[0].text }}</text>
              </div>
            </div>
            <div class="info1">
              <div class="info-1">
                <text>{{ petText[1].name }}</text>
              </div>
              <div class="info-2">
                <text>{{ petText[1].text }}</text>
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
import { onLoad } from '@dcloudio/uni-app'
import { reactive } from 'vue'
import { ref } from 'vue'
let src = ref('')
let showPopup = ref(false)

let petText = reactive([
  {
    name: '动物学史',
    text: '威尔士柯基犬是原产于英国威尔士的古老犬种，其存在时间有1000多年。威尔士柯基犬为1107年由法兰德斯工人携带过来的犬种，根据其近似狐狸的头部，有人认为本犬与尖嘴犬祖先关系密切。但也有人认为是随着威尔士与瑞典贸易传至威尔士的瑞典短脚长身犬和土著犬交配，产生了柯基犬。 [6]威尔士柯基犬名字来自威尔士语“corrci”娇小之犬的意思 [1]。',
  },
  {
    name: '形态特征',
    text: '威尔士柯基犬，是食肉目犬科犬属哺乳动物。 [5]耳中等大小，直立，耳尖呈圆形；棕褐色眼睛中等大小，呈卵圆形；眼睛中等大小，不突出，眼圈为暗黑色，眼角清晰；嘴鼻部优美且紧凑，缺毛，为先天性特征；胸部宽度适中，向下逐渐变细，在前肢之间放松；后驱的肌肉发达且结实，但宽度略小于肩部；体躯比卡狄犬略小 [1].被毛长度适中，绒毛层短而厚，外层被毛较长而粗糙，能抵御各种环境条件；全身毛长度不等，颈圈、胸部和肩部稍厚而长，躯干被毛平伏。前肢腹面、下腹部与后躯腹面毛比较长；被毛最好是直的，该犬容易褪毛；毛色有淡黄色短毛，金色短毛，红色短毛，黄褐色和白色短毛 [1]。'
  }
])

onLoad((e: any) => {
  console.log(e.src)
  src.value = e.src
  setTimeout(function () {
    togglePopup()
  }, 700) // 这里的 1000 表示延时的时间，单位是毫秒
})

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
.info-2{
  margin-left: 20rpx;
  margin-right: 20rpx;
  text{
    font-size: smaller;
    color: #2f2f2f;
  }
}
</style>
