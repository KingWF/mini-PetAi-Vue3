<template>
  <!-- 个人资料 -->
  <view class="profile">
    <view class="meta">
      <image class="avatar" :src="memberStore.profile?.avatar"></image>
      <view class="nickname">{{ memberStore.profile?.nickname }}</view>
      <view class="fan">粉丝:12</view>
      <view class="focus">关注:1</view>
    </view>
  </view>
  <view class="item" v-for="item in 2" :key="item">
    <!-- 头像 -->
    <view class="avatar">
      <img src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_3.jpg" />
    </view>
    <view class="name">张三</view>
    <view class="main">
      <view class="text">如果正确的养猫养狗</view>
      <view class="pic">
        <img src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_3.jpg"
      /></view>
      <view class="other">
        <view class="like">点赞:12</view>
        <view class="collect">收藏:22</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores/modules/member'

// // 获取会员信息
const memberStore = useMemberStore()
</script>

<style scoped lang="scss">
.profile {
  height: 400rpx;
  background: linear-gradient(to bottom, #6ebeff, #ffffff, #6ebeff);
  display: flex;
  justify-content: center;
  align-items: center;

  .meta {
    .avatar {
      display: block;
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      border: 2rpx solid #fff;
      overflow: hidden;
      margin: auto;
    }

    .nickname {
      display: block;
      text-align: center;
      margin-top: 50rpx;
      font-size: 30rpx;
      color: #fff;
    }
    .fan {
      color: #fff;
      margin-top: 40rpx;
      float: left;
    }
    .focus {
      color: #fff;
      margin-top: 40rpx;
      margin-left: 70rpx;
      float: left;
    }
  }
}
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
</style>
