<template>
  <view class="glass-content">
    <view class="swiper-container">
      <swiper :autoplay="true" :circular="true" :interval="3000" :indicator-dots="true">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <image :src="item" mode="aspectFill" class="swiper-image" @click="intoShop" />
        </swiper-item>
      </swiper>
    </view>
    <!-- 绝对定位文字（悬浮） 可以设置出现在盒子任何位置 -->
    <!-- <view class="button-container">
      <view class="floating-button" @click="intoShop">进入购物商城>>></view>
    </view> -->
  </view>
</template>

<script lang="ts" setup>
import type { BannerItem } from '@/types/home'
import { ref } from 'vue'

const swiperList = ref([
  '/static/swiperPic/swiper1.jpg',
  '/static/swiperPic/swiper2.jpg',
  '/static/swiperPic/swiper3.jpg',
])

const swiperList2 = ref<BannerItem[]>([
  {
    hrefurl: '123',
    id: '1',
    imgurl:
      'https://ts1.cn.mm.bing.net/th/id/R-C.633901d07a3d18cdf6d58a0ccc74078d?rik=8evNNQvJj91%2bjg&riu=http%3a%2f%2fimg.hkwb.net%2fatt%2fsite2%2f20120308%2f633901d07a3d18cdf6d58a0ccc74078d.jpg&ehk=mupUGFlfxfEilMIkHoDFPVYnfR%2bSaF86fmgOkvvU8YM%3d&risl=&pid=ImgRaw&r=0',
    type: 1,
  },
  {
    hrefurl: '123',
    id: '1',
    imgurl:
      'https://ts1.cn.mm.bing.net/th/id/R-C.633901d07a3d18cdf6d58a0ccc74078d?rik=8evNNQvJj91%2bjg&riu=http%3a%2f%2fimg.hkwb.net%2fatt%2fsite2%2f20120308%2f633901d07a3d18cdf6d58a0ccc74078d.jpg&ehk=mupUGFlfxfEilMIkHoDFPVYnfR%2bSaF86fmgOkvvU8YM%3d&risl=&pid=ImgRaw&r=0',
    type: 1,
  },
  {
    hrefurl: '123',
    id: '1',
    imgurl:
      'https://ts1.cn.mm.bing.net/th/id/R-C.633901d07a3d18cdf6d58a0ccc74078d?rik=8evNNQvJj91%2bjg&riu=http%3a%2f%2fimg.hkwb.net%2fatt%2fsite2%2f20120308%2f633901d07a3d18cdf6d58a0ccc74078d.jpg&ehk=mupUGFlfxfEilMIkHoDFPVYnfR%2bSaF86fmgOkvvU8YM%3d&risl=&pid=ImgRaw&r=0',
    type: 1,
  },
])

const intoShop = () => {
  uni.navigateTo({
    url: '/pages/index/shopMalls/shopMalls',
  })
}
</script>

<style lang="scss" scoped>
.glass-content {
  background-color: rgba(255, 255, 255, 0);
  // position: relative;
  margin: 20rpx;
  // border-radius: 25rpx;
}
.swiper-container {
  height: 300rpx;
  // z-index: 1;
}

.swiper-image {
  border-radius: 25rpx;
  width: 100%;
  height: 100%;
}

.button-container {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 2;
}

.floating-button {
  padding: 10rpx 20rpx;
  background-color: rgba(87, 82, 78, 0);
  color: #776f6fc7;
  border-radius: 20rpx;
}
</style>
