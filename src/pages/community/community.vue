<!-- 社区 -->
<template>
  <view class="page-container">
    <!-- 页面内容 -->
    <Card></Card>
  </view>
</template>

<script>
import Card from './components/card.vue'
export default {
  data() {
    return {}
  },
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Card,
  },
}
</script>

<style lang="scss">
page {
  background: linear-gradient(to bottom, #6ebeff, #ffffff, #6ebeff);
  height: 100%;
}
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
