<template>
  <!-- 顶部 -->
  <view class="top">
    <SearchBox :searchKeyWord="KeyWord" />
  </view>
  <!-- 中间正文 -->
  <view class="main">
    <!-- 推荐列表 -->
    <scroll-view scroll-y class="scroll-view" @scrolltolower="onScrolltolower">
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in recommendList[0].goodsItems.items"
          :key="goods.id"
          :url="`/pages/index/shopMalls/productDetails/productDetails?id=${goods.id}`"
        >
          <image class="picture" :src="goods.pic"></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">备注：</text>
            <text class="number">{{ goods.text }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text" v-if="isScrolltolower">没有更多数据了...</view>
      <view class="loading-text" v-else>正在加载...</view>
    </scroll-view>
  </view>
</template>
<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getSearchGoodsAPI } from '@/services/shop'
import SearchBox from '../componts/SearchBox.vue'
import { watch } from 'vue'
import type { RecommendGoodsItem } from '@/types/home'
import { getRecommendGoodsAPI } from '@/services/home'

// 用于接收上一个页面传过来的搜索关键词
let KeyWord = ref('')

// 监听KeyWord变化，当页面参数发生变化后，重新赋值并传给子组件
watch(KeyWord, (newValue, oldValue) => {
  // console.log('KeyWord 的值变化了：', newValue)
  KeyWord.value = newValue
  getSearchGoodsData()
})
// 根据搜索关键词获取对应的商品信息
const getSearchGoodsData = async () => {
  const res = await getSearchGoodsAPI(KeyWord.value)
}

// 搜索商品的的list
const recommendList = ref<RecommendGoodsItem[]>([])

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
  // 获取当前tab下的数据
  const curr = recommendList.value[0]
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
    subType: 0,
    page: curr.goodsItems.page,
    pageSize: curr.goodsItems.pageSize,
  })
  console.log(res)
  curr.goodsItems.items.push(...res.result.items[0].goodsItems.items)
  // 判断是否到底了
  if (curr.goodsItems.page >= curr.goodsItems.pages) {
    isScrolltolower.value = true
  }
}
// 页面加载时，将页面参数赋值给变量KeyWord
onLoad(async (option: any) => {
  // console.log('进入了商品列表页' + option.searchKeyWord)

  await Promise.all([getHotRecommendData()])
  KeyWord.value = option.searchKeyWord
})

</script>
<style lang="scss">
.top {
}
.main {
  // background: linear-gradient(to bottom, #6ebeff, #ffffff);
  height: 1400rpx;
  width: 100%;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
}

.scroll-view {
  border-radius: 20rpx;
  height: 1400rpx;
  flex: 1;
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  background-color: #ffffff;
  margin-top: 20rpx;
  border-radius: 20rpx;

  .navigator {
    width: 49%;
    // padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 20rpx;
    // background-color: #d32929;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // border: 1px solid #adadad93;
  }
  .picture {
    width: 100%;
    height: 350rpx;
    border-radius: 20rpx;
  }
  .name {
    margin-top: 10rpx;
    height: 88rpx;
    font-size: 30rpx;
    align-self: left;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
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
