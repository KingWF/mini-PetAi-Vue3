<template>
  <view>
    <navigator
      :url="`/pages/online/consultation/consultation`"
      class="box"
      v-for="(item, index) in doctors"
      :key="index"
      @click="turnToChat(item)"
    >
      <view class="pic">
        <image :src="item.comava"></image>
      </view>
      <view class="info">
        <span class="name">{{ item.comname }}</span>
        <span class="grade">({{ item.comgrade }})</span>
        <p class="address">{{ item.comaddress }}</p>
        <p class="word">主治：</p>
        <p class="main">{{ item.commain }}</p>
        <span class="case"
          >诊断:<span style="color: red">{{ item.cases }} 例子</span></span
        >
        <span class="acclaim"
          >好评:<span style="color: red">{{ item.acclaim }}%</span></span
        >
      </view>
    </navigator>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { doctorItem } from '@/types/doctor'
import { getDoctorAPI } from '@/services/doctor'

const doctors = ref<doctorItem[]>([])
const getDoctors = async () => {
  const res = await getDoctorAPI()
  doctors.value = res.result
}

const turnToChat = (doctor: doctorItem) => {
  uni.navigateTo({
    url: '/pages/online/consultation/consultation',
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      acceptDataFromOpenedPage: function (data: any) {
        console.log(data)
      },
      someEvent: function (data: any) {
        console.log(data)
      },
    },
    success: function (res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', {
        data: doctor,
      })
    },
  })
}
onMounted(() => {
  getDoctors()
})
</script>

<style lang="scss">
.box {
  width: 650rpx;
  background-color: #fff; /* 卡片背景颜色 */
  border-radius: 10px; /* 卡片圆角 */
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
  margin-left: 50rpx;
  margin-top: 30rpx;
  display: flex;
  .pic {
    width: 200rpx;
    height: 300rpx;
    & image {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    padding-left: 30rpx;
    padding-top: 25rpx;
    .name {
      font-size: 28rpx;
      color: #6ebeff;
      font-weight: 600;
      margin-right: 20rpx;
    }
    .grade {
      color: #888888;
      font-size: 20rpx;
    }
    .address {
      margin-top: 20rpx;
      color: #262626;
      font-size: 24rpx;
    }
    .word {
      margin-top: 20rpx;
      color: #262626;
      font-size: 24rpx;
    }
    .main {
      margin-top: 10rpx;
      color: #888888;
      font-size: 24rpx;
      margin-bottom: 20rpx;
    }
    .case {
      margin-top: 50rpx;
      color: #888888;
      font-size: 20rpx;
    }
    .acclaim {
      margin-top: 50rpx;
      color: #888888;
      font-size: 20rpx;
      margin-left: 170rpx;
    }
  }
}
</style>
