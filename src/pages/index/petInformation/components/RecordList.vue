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
      就诊记录
    </div>
    <div class="box">
      <div v-for="record in records" :key="record.id" class="record-item" style="height: 100rpx">
        <div class="pic">
          <image :src="record.pic"></image>
        </div>
        <div class="xx">
          <div class="type">{{ record.type }}</div>
          <div class="date">{{ record.date }}</div>
        </div>
        <div class="click" style="width: 30rpx; height: 30rpx">
          <image src="/static/picture/向右箭头.png" style="width: 100%; height: 100%"></image>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      records: [
        { id: 1, type: '宠爱医院', date: '八月15, 2020 14:30', pic: '/static/picture/购物.png' },
        {
          id: 2,
          type: 'Delivering Order',
          date: '八月16, 2020 10:25 AM',
          pic: '/static/picture/01运输中、物流-线性.png',
        },
        {
          id: 3,
          type: 'Order Received',
          date: '九月16, 2020 10:25 AM',
          pic: '/static/picture/物料线性.png',
        },
      ],
    }
  },
}
</script>

<style scoped>
.box {
  border: 1px solid #ccc;
  padding: 10px;
}

.record-item {
  margin-bottom: 10px;
  display: flex;
  align-content: center;
  justify-self: center;
}

.box {
  border-radius: 30rpx;
  padding-left: 50rpx;
}

.box .pic {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  margin-right: 30rpx;
  margin-top: 10rpx;
}

.box .pic image {
  width: 80%;
  height: 80%;
}

.box .click {
  position: fixed;
  right: 100rpx;
  margin-top: 10rpx;
}
.type {
  font-weight: bold;
}

.date {
  color: #888888;
  font-size: 14px;
}
</style>
