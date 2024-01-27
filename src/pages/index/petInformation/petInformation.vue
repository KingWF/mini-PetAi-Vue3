<template>
  <!-- 页面顶部宠物信息卡片区域 -->
  <view>
    <view class="glass-content">
      <!-- 内容区域 -->
      <view class="container">
        <view class="left-section">
          <view class="circle">
            <image
              src="https://ts1.cn.mm.bing.net/th/id/R-C.be1895b6cc60526df6bd79aef4005208?rik=v29k4ZW3ZVFq8g&riu=http%3a%2f%2fpic.baike.soso.com%2fp%2f20140328%2f20140328093026-679114537.jpg&ehk=EPX8WPV2D9J4aUmNtfgcN2KN3X%2fUk2BgISQsCaHMZ2Q%3d&risl=&pid=ImgRaw&r=0"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="glass-content2">
      <view
        v-for="(item, index) in petTabarList"
        hover-class="none"
        :key="index"
        :class="{ active: activeIndex === index }"
        @click="activeIndex = index"
        >{{ item }}
      </view>
    </view>
  </view>
  <!-- 底部 -->
  <view class="pic-v">
    <view class="v1">
      <view class="v1-1"></view>
      <view class="v1-2"></view>
    </view>
    <view class="v2">
      <view class="v2-1"></view>
      <view class="v2-2"></view>
    </view>
  </view>
  <!-- 推荐列表 -->
  <!-- <scroll-view
    scroll-y
    class="scroll-view"
    v-for="(item, index) in recommendList"
    :key="index"
    v-show="index === activeIndex"
    @scrolltolower="onScrolltolower"
  >
    <view class="goods">
      <view
        hover-class="none"
        class="navigator"
        v-for="goods in item.goodsItems.items"
        :key="goods.id"
        :url="`/pages/goods/goods?id=${goods.id}`"
        :style="{ height: generateRandomInteger() + 'rpx' }"
      >
        <image
          class="thumb"
          :src="goods.pic"
        ></image>
      </view>
    </view>
    <view class="loading-text" v-if="isScrolltolower">没有更多数据了...</view>
    <view class="loading-text" v-else>正在加载...</view>
  </scroll-view> -->
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getRecommendGoodsAPI } from '../../../services/home'
import type { RecommendGoodsItem } from '../../../types/home'
import { reactive } from 'vue'

// 设置tab集合
const tabsName = reactive(['食谱', '保健', '出行'])
// 设置动态设置高亮的下标
const activeIndex = ref(0)

// 推荐数据的list
const recommendList = ref<RecommendGoodsItem[]>([])
// petTabarList
const petTabarList = ref(['动态', '照片', '视频'])

// 获取数据
const getHotRecommendData = async () => {
  const res = await getRecommendGoodsAPI({
    // 在开发时，用DEV模式下直接从30开始获取 正常用户使用下页码从1开始 import.meta.env.DEV ? 2 : 1
    page: 1,
    pageSize: 5,
  })
  console.log(res.result)
  recommendList.value = res.result.items
}
// 到底的标识
const isScrolltolower = ref(false)
// 下拉触底
const onScrolltolower = async () => {
  console.log(activeIndex.value)
  // 获取当前tab下的数据
  const curr = recommendList.value[activeIndex.value]
  console.log('触底了！')
  if (curr.goodsItems.page >= curr.goodsItems.pages) {
    // 没有更多数据了
    if (isScrolltolower.value) {
      uni.showToast({
        title: '没有更多数据~',
        icon: 'none',
      })
      return
    }
  }
  console.log(curr)
  // 增加页码
  curr.goodsItems.page++
  const res = await getRecommendGoodsAPI({
    subType: activeIndex.value,
    page: curr.goodsItems.page,
    pageSize: curr.goodsItems.pageSize,
  })
  console.log(res)
  curr.goodsItems.items.push(...res.result.items[activeIndex.value].goodsItems.items)
  // 判断是否到底了
  if (curr.goodsItems.page >= curr.goodsItems.pages) {
    isScrolltolower.value = true
  }
}
// 用户点击搜索框
const searchInput = () => {
  console.log('点击了搜索框')
}
// 测试
const test = (val: number) => {
  activeIndex.value = val
  console.log(val)
}
onLoad(() => {
  getHotRecommendData()
})
// 生成随机高度
const generateRandomInteger = () => {
  const min = 400
  const max = 600
  var randomInteger = Math.floor(Math.random() * (max - min + 1) + min)
  console.log(randomInteger)

  return randomInteger
}
</script>
<style lang="scss">
.glass-content {
  margin-top: 20rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  height: 100px;
  background-color: rgba(255, 209, 93, 0.801); /* 半透明的背景色 */
  backdrop-filter: blur(10px); /* 模糊效果，根据需要调整模糊程度 */

  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  // 边框
  border-left: 2rpx solid #c5c5c5e5;
  border-right: 2rpx solid #c5c5c5e5;
  border-top: 2rpx solid #c5c5c5e5;
  // 阴影
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 阴影样式 */
}
.glass-content2 {
  margin-left: 20rpx;
  margin-right: 20rpx;
  height: 100rpx;
  background-color: rgb(255, 255, 255); /* 半透明的背景色 */
  backdrop-filter: blur(10px); /* 模糊效果，根据需要调整模糊程度 */

  border-bottom-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;

  // 边框
  border-left: 2rpx solid #c5c5c5e5;
  border-right: 2rpx solid #c5c5c5e5;
  border-bottom: 2rpx solid #c5c5c5e5;
  // 阴影
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 阴影样式 */
  // 子盒子排列方式
  display: flex;
  justify-content: space-between;
  padding-left: 100rpx;
  padding-right: 100rpx;
}
.glass-content2 view {
  margin-top: 20rpx;
  width: 120rpx;
  height: 60rpx;
  border-radius: 30rpx;
  border: 2rpx solid #c5c5c5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 2px rgba(104, 104, 104, 0.2); /* 阴影样式 */
  // 绑定点击事件
  cursor: pointer;
}
.active {
  background-color: rgb(255, 158, 158);
}
.container {
  height: 200rpx;
  display: flex;
  margin: 30rpx;
}

.left-section {
  display: flex;
  margin-left: 0rpx;
  margin-top: 0;
}

.circle {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  overflow: hidden;
}
.circle image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

// 底部样式
.pic-v {
  height: 1000rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 0 20rpx 20rpx;

  .v1 {
    width: 49%;
    height: 100%;
    margin-top: 20rpx;
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .v1-1 {
      width: 100%;
      height: 55%;
      border-radius: 10rpx;
      background-color: #dcafaf;
      display: flex;

      justify-content: space-between;
    }
    .v1-2 {
      width: 100%;
      height: 45%;
      border-radius: 10rpx;
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      background-color: #dcafaf;
      display: flex;
      justify-content: space-between;
    }
  }
  .v2 {
    width: 49%;
    height:100%;
    // height: 500rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .v2-1 {
      width: 100%;
      height: 40%;
      border-radius: 10rpx;
      background-color: #dcafaf;
      display: flex;

      justify-content: space-between;
    }
    .v2-2 {
      width: 100%;
      height: 60%;
      border-radius: 10rpx;
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      background-color: #dcafaf;
      display: flex;
      justify-content: space-between;
    }
  }
}

//
.scroll-view {
  flex: 1;
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #666;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 49%;
    // height: 500rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #a61818;
    display: flex;
    justify-content: space-between;
  }
  .thumb {
    width: 100%;
    height: 500rpx;
    border-radius: 10rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
