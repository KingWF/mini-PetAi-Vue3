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
  <!-- 足迹 -->
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
        <view class="text">如果正确的养猫养狗</view>
        <view class="pic">
          <img
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_3.jpg"
        /></view>
        <view class="other">
          <view class="like">点赞:12</view>
          <view class="collect">收藏:22</view>
        </view>
      </view>
    </view>
  </view>
  <!-- 点赞 -->
  <view class="article" v-if="activeIndex == 1">
    <view class="item" v-for="item in 2" :key="item">
      <!-- 头像 -->
      <view class="avatar">
        <img
          src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_3.jpg"
        />
      </view>
      <view class="name">张三</view>
      <view class="main">
        <view class="text">如果正确的养猫养狗</view>
        <view class="pic">
          <img
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_3.jpg"
        /></view>
        <view class="other">
          <view class="like">点赞:12</view>
          <view class="collect">收藏:22</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores';
import { ref } from 'vue'

// 设置动态设置高亮的下标
const activeIndex = ref(0)
const test = (val: number) => {
  activeIndex.value = val
  console.log(val)
}
const recommendList = ref(['足迹', '点赞'])
const memberStore = useMemberStore()
</script>

<style scoped lang="scss">
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
    height: 150px;
    border: 2px solid #000;
    border-radius: 15px;

    .avatar {
      width: 65rpx;
      height: 65rpx;
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
      margin-left: 50px;
      margin-top: -50rpx;
    }
    .main {
      .text {
        font-weight: bold;
        font-size: 20px;
        margin-top: 40rpx;
        margin-left: 20rpx;
      }
      .pic {
        width: 220rpx;
        height: 220rpx;
        float: right;
        margin-top: -100rpx;
        margin-right: 30rpx;
      }
      .other {
        width: 400rpx;
        height: 50px;
        margin-top: 40rpx;
        .like {
          display: inline-block;
          margin-left: 20rpx;
          color: #999999;
        }
        .collect {
          display: inline-block;
          margin-top: 40rpx;
          margin-left: 40rpx;
          color: #999999;
        }
      }
    }
  }
}
</style>
