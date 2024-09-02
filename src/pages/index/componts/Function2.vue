<template>
  <view class="glass-content">
    <!-- 内容区域 -->
    <!-- <view class="box">
      <image src="@\static\picture\Find_pic.png" />
      <view class="caption">丢失查找</view>
    </view>
    <view class="box">
      <image src="@\static\picture\Doc_pic.png" />
      <view class="caption">在线就诊</view>
    </view> -->
    <view class="box" @click="toSmartAnswer">
      <image src="@\static\icon\咨询2.png" />
      <text class="caption">智能咨询</text>
    </view>
    <view class="box">
      <image src="@\static\icon\问诊.png" @click="toOnlineConsultation" />
      <text class="caption">在线问诊</text>
    </view>
  </view>
</template>
<script lang="ts" setup>
const toSmartAnswer = () => {
  uni.navigateTo({
    url: '/pages/index/SmartAnswers/SmartAnswers',
  })
}
const toOnlineConsultation = () => {
  uni.navigateTo({
    url: '/pages/online/onlineDoctor/onlineDoctor',
  })
}
</script>
<style lang="scss" scoped>
.glass-content {
  margin: 0 20rpx 20rpx 20rpx;
  height: 200rpx;
  // padding: 20rpx 20rpx 20rpx 20rpx;
  display: flex;
  justify-content: center;
  // top: 50%;
  // left: 50%;
  // 阴影
  // box-shadow: 2px 2px 4px rgba(63, 63, 63, 0.2);
  border-radius: 15px;
  // 边框
  // border-left: 2rpx solid #c5c5c5e5;
  // border-right: 2rpx solid #c5c5c5e5;
  // border-bottom: 2rpx solid #c5c5c5e5;
  /* 其他样式属性 */
  background-color: #ffffff;
}
.box {
  flex: 1;
  display: flex;
  justify-content: space-between;
  // background-color: #5c0a0a;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 10px;
}
.box image {
  width: 100rpx;
  height: 100rpx;
}
.box text {
  // margin-left: 20rpx;
  font-size: larger;
}
.caption {
  margin-top: 10px;
  font-size: 20rpx;
}
</style>
