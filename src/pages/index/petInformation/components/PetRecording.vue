<template>
  <view>
    <div
      style="
        font-size: 18px;
        color: #888888;
        font-weight: 500;
        margin-bottom: 10rpx;
        margin-top: 15rpx;
      "
    >
      驱虫记录
    </div>
    <div class="order-info">
      <div class="pic">
        <image :src="order.image"></image>
      </div>
      <div class="order-details">
        <p>{{ order.item }}</p>
        <p>x1</p>
      </div>
      <div style="position: fixed; left: 600rpx; margin-top: 30rpx">
        <p>{{ order.price }}</p>
      </div>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      order: {
        image: '/static/picture/R.jpg', // 替换为实际的图片路径
        item: 'Elephant Doll',
        price: '$54.75',
      },
    }
  },
}
</script>

<style lang="scss">
.order-info {
  border: 1px solid #ccc;
  border-radius: 25rpx;
  display: flex;
  height: 150rpx;
  padding-top: 20rpx;
  padding-left: 20rpx;
}
.order-info .pic {
  width: 100rpx;
  height: 100rpx;
  margin-right: 30rpx;
  & image {
    border-radius: 30rpx;
    width: 100%;
    height: 100%;
  }
}
</style>
