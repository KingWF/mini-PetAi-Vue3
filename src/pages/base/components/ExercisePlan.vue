<!-- 运动计划跳转按钮 -->
<template>
  <navigator class="box" :url="`pages/base/assembly/ExercisePlanFunction`" @click="add">
    <p class="p1">运动计划</p>
    <p class="p2">记录宠物的运动信息，制定运动计划</p>
    <image src="/static/base/运动计划.png" class="pic"></image>
  </navigator>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
const add = () => {
  uni.navigateTo({
    url: '/pages/base/assembly/ExercisePlanFunction',
  })
}
</script>
<style lang="scss">
.box {
  width: 650rpx;
  height: 156rpx;
  margin-left: 50rpx;
  margin-top: 30rpx;
  padding-left: 30rpx;
  padding-top: 30rpx;
  border-radius: 32rpx;
  position: relative;
  background: linear-gradient(to right, rgb(255, 255, 255, 0.5), rgb(41, 131, 30, 0.5));
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
    height: 162rpx;
    right: 40rpx;
    bottom: 0;
  }
}
</style>
