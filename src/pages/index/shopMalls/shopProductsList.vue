<template>
  <!-- 顶部 -->
  <view class="top">
    <SearchBox :searchKeyWord="KeyWord" />
  </view>
  <!-- 中间正文 -->
  <view class="main"> </view>
</template>
<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getSearchGoodsAPI } from '@/services/shop'
import SearchBox from '../componts/SearchBox.vue'
import { watch } from 'vue'

// 用于接收上一个页面传过来的搜索关键词
let KeyWord = ref('')

// 监听KeyWord变化，当页面参数发生变化后，重新赋值并传给子组件
watch(KeyWord, (newValue, oldValue) => {
  console.log('KeyWord 的值变化了：', newValue)
  KeyWord.value = newValue
})
// 根据搜索关键词获取对应的商品信息
const getSearchGoodsData = async () => {
  const res = await getSearchGoodsAPI(KeyWord.value)
}
// 页面加载时，将页面阐述赋值
onLoad((option: any) => {
  // console.log('进入了商品列表页' + option.searchKeyWord)
  KeyWord.value = option.searchKeyWord
  getSearchGoodsData()
})
</script>
<style lang="scss">
.top {

}
.main {
  background-color: rgba(180, 180, 127, 0.495);
  height: 1500rpx;
  width: 100%;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
}
</style>
