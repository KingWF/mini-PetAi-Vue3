<template>
  <div class="base-top" :style="{ height: getHeight() + 'px' }">
    <div class="top-return" :style="{ height: heightTabar + 'px' }" @tap="goBack()">
      <image src="/static/icons/返回.png" mode="scaleToFill" />
    </div>
  </div>
  <div class="base-main">
    <div class="m1">
      <div class="m1-1">
        <image src="/static/picture/20210704141349_82cc9.jpg" mode="scaleToFill" />
      </div>
      <div class="m1-2">
        <text class="t1">朴幸</text>
        <text class="t2">所属机构:xxx有限公司</text>
      </div>
      <div class="m1-3">
        <text> 关注 </text>
      </div>
    </div>
    <div class="m2">
      <text>Ta很懒, 还没有自我介绍</text>
    </div>
    <div class="m3">
      <div class="m3-1" v-for="index in 3" :key="index">
        <text class="t1"> 3000 </text>
        <text class="t2"> 粉丝 </text>
      </div>
    </div>
  </div>
  <scroll-view scroll-y class="base-buttom">
    <div class="title">
      <text>动态发布</text>
    </div>
    <div class="content">
      <navigator
        url="/pages/NatureScienceArticles/ArticleDetails/ArticleDetails"
        open-type="navigate"
        hover-class="navigator-hover"
        class="nav"
        v-for="index in 3"
        :key="index"
      >
        <div class="time">2024.05.01</div>
        <image
          src="/static/picture/010d5c5b9d17c9a8012099c8781b7e.jpg@1280w_1l_2o_100sh.jpg"
          mode="scaleToFill"
        />
      </navigator>
    </div>
  </scroll-view>
</template>

<script lang="ts" setup>
const heightTabar = uni.getMenuButtonBoundingClientRect().height
const getHeight = () => {
  const hieghtTab =
    uni.getMenuButtonBoundingClientRect().top + uni.getMenuButtonBoundingClientRect().height
  return hieghtTab
}
// 自定义返回上一页面
const goBack = () => {
  uni.navigateBack({
    delta: 1, // 返回的页面数，1 表示返回上一级页面，2 表示返回上两级页面，以此类推
  })
}
</script>

<style lang="scss">
page {
  background: -webkit-linear-gradient(top, rgb(13, 166, 255), white);
}
.base-top {
  position: relative;
  width: 100%;
  margin-bottom: 10rpx;
}
.top-return {
  position: absolute;
  bottom: 0;
  width: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  image {
    width: 50%;
    height: 70%;
  }
}
.base-main {
  width: 100%;
  height: 400rpx;
  .m1 {
    margin-left: 30rpx;
    padding-top: 30rpx;
    padding-bottom: 10rpx;
    display: flex;
    align-items: center;
    position: relative;
    .m1-1 {
      image {
        border-radius: 50%;
        width: 180rpx;
        height: 180rpx;
      }
    }
    .m1-2 {
      margin-left: 40rpx;
      display: flex;
      flex-direction: column;
      .t1 {
        font-size: 35rpx;
        font-weight: bolder;
        color: #ffffff;
      }
      .t2 {
        margin-top: 20rpx;
        font-weight: lighter;
        color: #ffffff;
        font-size: 20rpx;
      }
    }
    .m1-3 {
      display: flex;
      margin-right: 20rpx;
      background-color: #e4ad3d;
      position: absolute;
      right: 30rpx;
      border-radius: 40rpx;
      padding: 10rpx;
      width: 80rpx;
      align-items: center;
      justify-content: center;
      text {
        font-weight: bold;
        color: #ffffff;
        font-size: 25rpx;
      }
    }
  }
  .m2 {
    width: 100%;
    margin-bottom: 10rpx;
    margin-left: 30rpx;
    text {
      color: #ffffff;
      font-size: 25rpx;
      letter-spacing: 2px; /* 设置字间距为2像素 */
    }
  }
  .m3 {
    height: 200rpx;
    display: flex;
    justify-content: space-between;
    margin-left: 30rpx;
    margin-right: 30rpx;
    .m3-1 {
      height: 100rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .t1 {
        font-size: 40rpx;
        color: #ffffff;
      }
      .t2 {
        font-size: 25rpx;
        color: #ffffff;
      }
    }
  }
}
.base-buttom {
  margin-top: 10rpx;
  border-top-left-radius: 50rpx;
  border-top-right-radius: 50rpx;
  width: 100%;
  height: 2000rpx;
  background-color: rgb(255, 255, 255);
  .title {
    margin: 20rpx;
    margin-top: 40rpx;
    text {
      font-size: 38rpx;
      font-weight: bolder;
    }
  }
  .content {
    display: flex;
    margin-left: 20rpx;
    margin-right: 20rpx;

    flex-wrap: wrap;
    justify-content: space-between;
    .nav {
      width: 49%;
      margin-top: 20rpx;
      display: flex;
      align-items: flex-start;
      margin-bottom: 10rpx;
      flex-direction: column;
      justify-content: space-between;
      height: 500rpx;
      position: relative;
      .time {
        position: absolute;
        left: 10rpx;
        top: 10rpx;
        z-index: 1;
        color: #ffffff;
        font-weight: lighter;
      }
      image {
        border-radius: 20rpx;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
      }
    }
  }
}
</style>
