<template>
  <view class="glass-content">
    <view class="button-container">
      <button class="floating-button" @click="intoShop">点击进入购物商城</button>
    </view>
    <view class="swiper-container">
      <swiper :autoplay="true" :interval="3000" :indicator-dots="true">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <image :src="item" mode="aspectFill" class="swiper-image" @click="intoShop" />
        </swiper-item>
      </swiper>
    </view>
    <!-- <PetAiSwiper :list="swiperList2"></PetAiSwiper> -->
  </view>
</template>

<script lang="ts" setup>
import type { BannerItem } from '@/types/home'
import { ref } from 'vue'

const swiperList = ref([
  'https://ts1.cn.mm.bing.net/th/id/R-C.633901d07a3d18cdf6d58a0ccc74078d?rik=8evNNQvJj91%2bjg&riu=http%3a%2f%2fimg.hkwb.net%2fatt%2fsite2%2f20120308%2f633901d07a3d18cdf6d58a0ccc74078d.jpg&ehk=mupUGFlfxfEilMIkHoDFPVYnfR%2bSaF86fmgOkvvU8YM%3d&risl=&pid=ImgRaw&r=0',
  'https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0',
  'https://tr-osdcp.qunarzz.com/tr-osd-tr-manager/img/01f38b12683bca66440c8e3b391c776b.jpg_r_720x400x95_7d37d0e9.jpg',
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

<style lang="scss">
.glass-content {
  margin: 0 20rpx 20rpx 20rpx;
  height: 400rpx;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 15px;
  border: 2rpx solid #c5c5c5e5;
  position: relative;
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
  background-color: rgba(255, 102, 0, 0);
  color: #fff;
  border-radius: 20rpx;
}

.swiper-container {
  height: 400rpx;
  z-index: 1;
}

.swiper-image {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
</style>
