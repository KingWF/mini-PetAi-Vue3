<template>
  <navigator class="box" :url="`pages/base/assembly/DietManagementFunction`" @click="add">
    <p class="p1">饮食管理</p>
    <p class="p2">记录宠物的饮食状况，提供食谱建议</p>
    <image src="/static/base/饮食管理.png" class="pic"></image>
  </navigator>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
const add = () => {
  uni.navigateTo({
    url: '/pages/base/assembly/DietManagementFunction',
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
  background: linear-gradient(to right, rgb(255, 255, 255, 0.5), rgb(226, 193, 214, 0.5));
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
    width: 252rpx;
    height: 138rpx;
    right: 40rpx;
    bottom: 0;
  }
}
</style>
