<template>
  <view class="tabs">
    <text
      v-for="(item, index) in recommendList"
      :key="index"
      class="text"
      :class="{ active: index === activeIndex }"
      @tap="test(index)"
      >{{ recommendList[index] }}</text
    >
  </view>
  <!-- 私信 -->
  <view class="article" v-if="activeIndex == 0">
    <view class="item" v-for="item in 4" :key="item">
      <!-- 头像 -->
      <view class="avatar">
        <img
          src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_3.jpg"
        />
      </view>
      <view class="name">张三</view>
      <view class="main">
        <view class="text">请问你是怎么养宠物的</view>
      </view>
      <view class="time">2023-10-30</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 设置动态设置高亮的下标
const activeIndex = ref(0)
const test = (val: number) => {
  activeIndex.value = val
  console.log(val)
}
const recommendList = ref(['私信了我', '评论了我'])
</script>

<style lang="scss">
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 5rpx rgba(155, 155, 155, 0.541);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 50rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.article {
  display: block;
  min-height: 508rpx;
  margin: 20rpx 20rpx 0;
  border-radius: 10rpx;
  background-color: #fff;
  .item {
    margin-top: 20rpx;
    width: 100%;
    height: 80px;
    border-radius: 15px;

    .avatar {
      width: 110rpx;
      height: 110rpx;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 10rpx;
      margin-left: 20rpx;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .name {
      margin-left: 90px;
      margin-top: -90rpx;
      font-weight: bold;
      font-size: 18px;
    }
    .main {
      .text {
        font-size: 15px;
        margin-top: 20rpx;
        margin-left: 180rpx;
        color: #323641; /* 深灰色 */
      }
    }
    .time {
      height: 60rpx;
      width: 150rpx;
      float: right;
      margin-top: -80rpx;
      margin-right: 30rpx;
      text-align: center;
      color: #999999; /* 淡灰色 */
      font-size: 12px;
    }
  }
}
</style>
