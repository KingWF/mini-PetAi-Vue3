<template>
  <view class="box">
    <view class="head"></view>
    <view class="right">
      <div class="first">
        <div class="name">张三</div>
        <div class="introduce">个人简介</div>
      </div>
      <div class="second">
        <div class="focus">关注5</div>
        <div class="fans">粉丝3</div>
      </div>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.box {
  position: relative;
  width: 650rpx;
  height: 150rpx;
  background-color: white;
  margin: auto;
  .head {
    position: absolute;
    width: 120rpx;
    height: 120rpx;
    background-color: black;
    border-radius: 30px;
    margin-left: 20rpx;
    top: 8rpx;
    float: left;
  }
  .right {
    position: relative;
    margin-left: 200rpx;
    .first {
      position: absolute;
      top: 15rpx;
      .name {
        display: inline-block;
        font-size: 20px;
      }
      .introduce {
        margin-left: 50rpx;
        display: inline-block;
      }
    }
    .second {
      position: absolute;
      top: 80rpx;
      .focus {
        display: inline-block;
        font-size: 15px;
      }
      .fans {
        margin-left: 30rpx;
        display: inline-block;
        font-size: 15px;
      }
    }
  }
}
</style>
