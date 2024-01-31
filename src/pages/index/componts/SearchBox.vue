<!-- 搜索框组件 -->
<template>
  <!-- 搜索 -->
  <view class="search">
    <view class="icon-search"></view>
    <view class="ta1">
      <input
        v-model="KeyWord"
        placeholder="搜索商品"
        placeholder-class="textarea-placeholder"
        @confirm="searchInput"
        class="text-search"
      />
    </view>
    <button class="but1" @click="searchInput">搜索</button>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { watch } from 'vue'

// 获取父组件传入的值
const props = defineProps<{
  searchKeyWord: string
}>()
// 搜索框中的搜索关键词
let KeyWord = ref('')
// 监听props.searchKeyWord变化，变化过后立即将KeyWord更新
watch(
  () => props.searchKeyWord,
  (newValue) => {
    // console.log('props.searchKeyWord 变化了：', newValue)
    KeyWord.value = newValue
  },
)
// 键盘完成按钮触发/点击搜索
const searchInput = () => {
  console.log(KeyWord.value)
}
onLoad(() => {
  // console.log('搜索box:' + props.searchKeyWord)
})
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: space-between;
  padding: 0 10rpx 0 20rpx;
  height: 64rpx;
  margin: 20rpx 20rpx;
  color: #0e0e0e93;
  font-size: 28rpx;
  border-radius: 32rpx;
  background-color: rgba(255, 255, 255, 0.5);
  // 边框
  border: 2rpx solid #c5c5c5e5;
}
.ta1 {
  margin-left: 10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-search {
  background-color: #e39b9b00;
  display: flex;
  justify-content: center;
  align-items: center;
}
.but1 {
  padding: 0;
  border-radius: 32rpx;
  background-color: #27bc42;
  margin-right: 0rpx;
  margin-top: 8rpx;
  margin-bottom: 8rpx;
  font-size: small;
  color: #ffffff;
  width: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-search {
  color: #000000;
}
</style>
