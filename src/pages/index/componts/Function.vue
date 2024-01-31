<template>
  <view class="glass-content">
    <!-- 内容区域 -->
    <view class="container" @tap="toNavgetor1">
      <view class="bottom-content-1">
        <image src="@\static\picture\carme.png"></image>
      </view>
      <view class="bottom-text">宠物识别</view>
    </view>

    <view class="logo-container">
      <image src="/static/picture/logo2.png"></image>
    </view>

    <view class="container" @tap="toNavgetor2">
      <view class="bottom-content-2">
        <image src="@\static\picture\voice.png"></image>
      </view>
      <view class="bottom-text">情绪分析</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
const toNavgetor1 = () => {
  uni.navigateTo({
    url: '/pages/index/homePetMess/PetIdentification/PetIdentification',
  })
}
const toNavgetor2 = () => {
  uni.navigateTo({
    url: '/pages/index/homePetMess/SentimentAnalysis/SentimentAnalysis',
  })
}
</script>
<style lang="scss" scoped>
.glass-content {
  margin: 20rpx 20rpx 0 20rpx;
  display: flex;
  justify-content: space-between;
}
.container {
  text-align: center;
  border-radius: 20rpx;
  height: 230rpx;
  margin-bottom: 20rpx;
  // background-color: aliceblue;
}
// 中间logo标识
.logo-container {
  text-align: center;
  border-radius: 20rpx;
  height: 230rpx;
  margin-bottom: 20rpx;
  // background-color: rgb(50, 140, 219);
  image {
    width: 220rpx; /* 调整图片的宽度 */
    height: 220rpx;
    will-change: transform;
  }
}
.bottom-text {
  margin-top: 10rpx;
  font-size: 32rpx;
  font-weight: 800;
}

.bottom-content-1 {
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180rpx;
  width: 180rpx;
  background-color: rgb(39, 243, 209);
  image {
    width: 120rpx; /* 调整图片的宽度 */
    height: 120rpx;
    will-change: transform;
  }
}
.bottom-content-2 {
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180rpx;
  width: 180rpx;
  background-color: rgb(250, 216, 81);
  image {
    width: 120rpx; /* 调整图片的宽度 */
    height: 120rpx;
    will-change: transform;
  }
}
</style>
