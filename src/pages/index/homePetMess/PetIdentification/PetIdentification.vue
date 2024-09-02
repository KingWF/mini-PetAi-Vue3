<template>
  <view>
    <camera
      device-position="back"
      flash="off"
      @error="error"
      style="width: 100%"
      :style="{ height: scHeight }"
    ></camera>

    <view class="camera-view">
      <button class="camera-button" @click="takePhoto">
        <image class="capture-text" src="\src\static\icon\相机3.png " mode="scaleToFill" />
      </button>
    </view>
    <!-- <button class="capture-button" type="primary" @click="test1">测试</button> -->
  </view>
</template>
<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

let src = ref('123')
let scHeight = ref('')

onLoad(() => {
  scarnHeigh()
})
// 点击拍照按钮
const takePhoto = () => {
  const ctx = uni.createCameraContext()
  ctx.takePhoto({
    quality: 'high',
    success: (res) => {
      src.value = res.tempImagePath
      uni.navigateTo({
        url: `/pages/index/homePetMess/PetIdentification/IndentificationImage?src=${src.value}`,
      })
    },
  })
}
const error = (e: any) => {
  console.log(e.detail)
}
// 动态获取当前屏幕的高度
const scarnHeigh = () => {
  uni.getSystemInfo({
    success: function (res) {
      let screenHeight = res.screenHeight
      scHeight.value = screenHeight - 90 + 'px'
      console.log('屏幕高度：' + screenHeight + 'px')
      // 在这里可以对屏幕高度进行其他操作或赋值给变量
    },
  })
}
// // 测试
// const test1 = () => {
//   uni.navigateTo({
//     url: '/pages/index/homePetMess/PetIdentification/IndentificationImage',
//   })
// }
</script>
<style>
.camera-view {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #cfd8e1;
  color: #fff;
  border-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* opacity: 0.5; 设置透明度为 0.5 */
}

.camera-button {
  /* position: absolute;
  z-index: 1;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%); */
  /* padding: 10px 20px; */
  height: 120rpx;
  width: 120rpx;

  display: inline-block;
  padding: 0; /* 去除内边距 */
  background-color: #e4a29d00;
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(55, 55, 55, 0.3);
  transition: background-color 0.3s ease;
}

.camera-button:hover {
  background-color: #e99696;
}

.camera-button:active {
  background-color: #b4b0b0a4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transform: translateY(1px);
}
.capture-text {
  padding-top: 5rpx;
  width: 100rpx; /* 设置图片宽度为200px */
  height: 110rpx; /* 设置图片高度为150px */
}
</style>
