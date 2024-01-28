<template>
  <image class="image1" mode="widthFix" :src="src"></image>
  <!-- 弹出图片信息 -->
  <view>
    <view v-if="showPopup" class="popup">
      <view class="vie-mesg">
        <view class="vie-v1">
          <view>
            <image src="\src\static\picture\柯基.png" mode="scaleToFill" />
          </view>
        </view>
        <view class="vie-v2">
          <view class="child">
            <text class="t1">品种</text>
            <text class="t2">柯基</text>
          </view>
          <view class="child">
            <text class="t1">品种</text>
            <text class="t2">柯基</text>
          </view>
          <view class="child">
            <text class="t1">品种</text>
            <text class="t2">柯基</text>
          </view>
          <view class="child">
            <text class="t1">品种</text>
            <text class="t2">柯基</text>
          </view>
        </view>
        <view class="vie-v3">3</view>
      </view>
      <view class="btn-group">
        <view class="btn_position">
          <view class="submit" @click="submit">了解更多</view>
        </view>
      </view>
    </view>
    <view v-if="showPopup" class="mask" @click="togglePopup"></view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
let src = ref('')
let showPopup = ref(false)

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

<style scoped>
.image1 {
  height: 100rpx;
}
/* 弹窗效果 */
.popup {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff00;
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

/* 按钮样式 */
.btn-group {
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.5); /* 示例阴影参数，根据需要进行调整 */
}
.btn-group .btn_position {
  display: flex;
  width: 100%;
}
.btn-group .btn_position .submit {
  width: 100%;
  background-color: #519fe7;
  text-align: center;
  padding: 20rpx 0;
  color: #fff;
}
.vie-mesg {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.vie-v1 {
  width: 100%;
  height: 400rpx;
  background-color: #519fe700;
  padding: 10rpx 40rpx 10rpx 40rpx;
  position: relative;
}
.vie-v1 view {
  background-color: #d8767600;
  width: 400rpx;
  height: 400rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.vie-v2 {
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  background-color: #c0bdff;
}
.vie-v2 .child {
  margin: 5rpx 20rpx;
  /* background-color: #9480e4; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.vie-v2 .child .t1 {
  font-size: large;
  color: #ff7e7e;
}
.vie-v2 .child .t2 {
  margin-top: 3rpx;
}
.vie-v3 {
  width: 100%;
  height: 400rpx;
  background-color: #ffffff;
}
</style>
