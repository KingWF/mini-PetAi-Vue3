<template>
  <view class="page-container">
    <!-- 页面内容 -->
    <Header></Header>
    <Card></Card>
    <image class="background-image" src="/static/base/矩形.png"></image>
  </view>
</template>

<script>
import Header from './components/header.vue'
import Card from './components/card.vue'
export default {
  data() {
    return {}
  },
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
    Card,
  },
}
</script>

<style lang="scss">
//.box {
//  background-color: #ffffff;
//}
//view {
//  background-color: #e0e0e0;
//}
.page-container {
  position: relative;
}

.background-image {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1; /* 将图片放在底层，确保其他内容在图片上方显示 */
}
</style>
