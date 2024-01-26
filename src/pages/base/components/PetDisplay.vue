<template>
  <view v-for="(item, index) in 3" :key="index">
    <view class="box">
      <div class="info">
        <image src="/static/base/大于.png" style="width: 20rpx; height: 20rpx"></image>
        <image src="/static/base/大于.png" style="width: 20rpx; height: 20rpx"></image>
        <image src="/static/base/大于.png" style="width: 20rpx; height: 20rpx"></image>
        <image src="/static/base/大于.png" style="width: 20rpx; height: 20rpx"></image>
        <image src="/static/base/大于.png" style="width: 20rpx; height: 20rpx"></image>
      </div>
      <view class="avatar"></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.box {
  width: 99%;
  height: 77rpx;
  margin-bottom: 20rpx;
  margin-left: 5rpx;
  border-top-left-radius: 50rpx;
  border-bottom-left-radius: 50rpx;
  position: relative;
  background: linear-gradient(to right, rgb(195, 223, 230), rgb(255, 255, 255));
}
.avatar {
  width: 77rpx;
  height: 77rpx;
  border-radius: 50rpx;
  left: 0.5rpx;
  background-color: #ffffff;
  position: absolute;
  border: 6rpx solid #a0c9cf;
}
.info {
  position: absolute;
  height: 30rpx;
  left: 120rpx;
  top: 25rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
