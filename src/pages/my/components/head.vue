<template>
  <view class="box">
    <view class="head"></view>
    <view class="right">
      <div class="first">
        <div class="name">张三</div>
        <div class="edit"><button @tap="Edit">编辑</button></div>
      </div>
      <div class="second">
        <div class="focus">关注5</div>
        <div class="fans">粉丝3</div>
      </div>
    </view>
  </view>
</template>

<script setup lang="ts">
const Edit = () => {
  uni.navigateTo({
    url: '/pages/my/components/EditInformation',
  })
}
</script>

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
    margin-left: 30rpx;
    top: 15rpx;
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
      .edit {
        display: inline-block;
        margin-left: 40rpx;
        margin-top: 20rpx;
        button {
          font-size: 10px;
          border-radius: 50px;
        }
      }
    }
    .second {
      position: absolute;
      top: 110rpx;
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
