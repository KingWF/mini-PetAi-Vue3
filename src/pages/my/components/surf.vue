<template>
  <view class="box">
    <related>
      <template #head>
        <div>1</div>
      </template>
      <template #bottom>
        <div>我的帖子</div>
      </template>
    </related>
    <related>
      <template #head>
        <div>1</div>
      </template>
      <template #bottom>
        <div>我的收藏</div>
      </template>
    </related>
    <related>
      <template #head>
        <div>12</div>
      </template>
      <template #bottom>
        <div>浏览历史</div>
      </template>
    </related>
  </view>
</template>

<script setup lang="ts">
import Related from './related.vue'
</script>
<style scoped lang="scss">
.box {
  width: 650rpx;
  height: 150rpx;
  background-color: white;
  margin: auto;
}
</style>
