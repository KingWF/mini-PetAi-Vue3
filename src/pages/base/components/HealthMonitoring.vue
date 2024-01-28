<template>
  <navigator class="box" :url="`pages/base/assembly/HealthMonFunction`" @click="add">
    <p class="p1">健康检测</p>
    <p class="p2">记录宠物的健康信息，设置提醒</p>
    <image src="/static/base/健康检测.png" class="pic" @click="add"></image>
  </navigator>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
const add = () => {
  uni.navigateTo({
    url: '/pages/base/assembly/HealthMonFunction',
  })
}
</script>

<style lang="scss">
.box {
  width: 650rpx;
  height: 156rpx;
  margin-left: 50rpx;
  margin-top: 50rpx;
  padding-left: 30rpx;
  padding-top: 30rpx;
  border-radius: 32rpx;
  position: relative;
  background: linear-gradient(to right, rgb(255, 255, 255, 0.5), rgb(117, 109, 207, 0.5));
  .p1 {
    height: 37rpx;
    line-height: 37rpx;
    font-size: 30rpx;
    color: #333333;
    margin-bottom: 10rpx;
  }
  .p2 {
    width: 210rpx;
    height: 42rpx;
    font-size: 20rpx;
    color: #333333;
  }
  .pic {
    position: absolute;
    width: 269rpx;
    height: 205rpx;
    right: 40rpx;
    bottom: 0;
  }
}
</style>
