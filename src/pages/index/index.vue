<template>
  <!-- 自定义导航栏 -->
  <!-- <CustomNavbar /> -->
  <!-- <image src="@/static/icon/圣诞冰淇淋.png" mode="scaleToFill" /> -->
  <!-- 定义骨架屏
    <PageSkeleton v-if="isLoading" /> -->
  <!-- 轮播图 -->
  <!-- <PetAiSwiper :list="bannerList" /> -->
  <!-- 板块 -->
  <view>
    <!-- 顶部内容 -->
    <view class="top">
      <!-- 地址显示 -->
      <view class="top-1">
        <view class="top-1-1">
          <image src="/static/icon/位置.png" mode="scaleToFill" />
        </view>
        <view class="top-1-2">
          <text @tap="RecaptureAddress">
            {{ cityName }}
          </text>
        </view>
      </view>
      <!-- 问候语 -->
      <view class="top-2">
        <view class="top-2-1">
          <text>hello</text>
        </view>
        <view class="top-2-2">
          <text>{{ Greetings }}</text>
        </view>
      </view>
    </view>
    <!-- 主要内容 -->
    <view>
      <!-- 宠物资料片 -->
      <PetProfiles></PetProfiles>
      <!-- 功能块 -->
      <view>
        <Function></Function>
        <Function2></Function2>
      </view>
      <!-- 推荐轮播图+商城 -->
      <Function3></Function3>
    </view>
  </view>
</template>
<script setup lang="ts">
import PetProfiles from './componts/PetProfiles.vue'
import Function from './componts/Function.vue'
import Function2 from './componts/Function2.vue'
import Function3 from './componts/Function3.vue'
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js'

// 问候语
let Greetings = ref('')
// 地址获取是否成功
let isGetLocation = ref(false)
// 城市名称
let cityName = ref('')
// 实例化API核心类
let qqmapsdk = new QQMapWX({
  key: 'C5OBZ-D7VCT-3NJXB-VNSFI-TFRX2-DMFLS', // 必填
})

// 获取当前用户的地址信息
const getLocation = () => {
  wx.getLocation({
    success(res) {
      // 将地址成功获取标识标记为成功
      isGetLocation.value = true
      console.log('wx.getLocation获取到的结果:')
      console.log(res) //这里包含了经维度
      console.log(res.latitude)
      console.log(res.longitude)
      const lat = res.latitude
      const lon = res.longitude
      //经纬度转城市位置
      qqmapsdk.reverseGeocoder({
        location: {
          // latitude: 39.941067, //这里是之前获取到的经纬度
          // longitude: 116.338863,
          latitude: lat, //这里是之前获取到的经纬度
          longitude: lon,
        },
        success: function (res: any) {
          console.log('经纬度转换地址坐标')
          console.log(res) //这里包含了很多信息，如有需要可以自行取
          console.log('转换后的位置信息(市)')
          const city = res.result.address_component.city // 市
          const district = res.result.address_component.district // 区/县
          console.log(city + ' ' + district)
          cityName.value = city + ' ' + district
        },
        fail: function (res: any) {
          console.error('逆解析失败：', res)
        },
      })
    },
    fail(res) {
      // 将地址成功获取标识标记为失败
      isGetLocation.value = false
      console.log('未获取到当前位置')
      cityName.value = '未获取到当前位置'
    },
  })
}
// 重新获取地址信息
const RecaptureAddress = () => {
  if (isGetLocation.value == false) {
    wx.showModal({
      content: '检测到您没打开位置消息功能权限，是否去设置打开？',
      confirmText: '确认',
      cancelText: '取消',
      success: function (res) {
        console.log(res)
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.openSetting({
            //这里调起获取权限的位置
            success: (res) => {
              getLocation()
            },
          })
        } else {
          console.log('用户点击取消')
        }
      },
    })
  }
}
// 获取当前时间
const getNowDate = () => {
  // 获取当前时间
  var currentTime = new Date()

  // 获取当前小时
  var currentHour = currentTime.getHours()
  if (currentHour >= 1 && currentHour < 9) {
    Greetings.value = '早上好'
  } else if (currentHour >= 9 && currentHour < 12) {
    Greetings.value = '上午好'
  } else if (currentHour >= 12 && currentHour < 13) {
    Greetings.value = '中午好'
  } else if (currentHour >= 13 && currentHour < 18) {
    Greetings.value = '下午好'
  } else if (currentHour >= 18 && currentHour <= 24) {
    Greetings.value = '晚上好'
  }

  console.log(currentHour) // 输出当前小时时间
}
// 页面加载时
onLoad(() => {
  getNowDate()
  if (cityName.value == '') {
    getLocation()
  }
})
</script>
<style lang="scss">
// 导入自定义字体
@import url('../../styles/font1.css');

page {
  background: linear-gradient(to bottom, #6ebeff, #ffffff, #6ebeff);
  height: 100%;
}
.top {
  position: relative;
  overflow: hidden;
  height: 300rpx;
  // background-color: rgb(193, 126, 255);
  .top-1 {
    margin-top: 110rpx;
    margin-bottom: 15rpx;
    height: 50rpx;
    width: 500rpx;
    // background-color: rgba(234, 93, 12, 0.639);
    display: flex;
    .top-1-1 {
      width: 45rpx;
      height: 45rpx;
    }
    .top-1-2 {
      margin-left: 10rpx;
      text {
        font-size: 34rpx;
      }
    }
  }
  .top-2 {
    height: 100rpx;
    width: 500rpx;
    // background-color: rgb(71, 54, 43);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top-2-1 {
      // background-color: #3434af;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80rpx;
      text {
        font-family: HiFont;
        font-size: 60rpx;
        text-align: center;
        margin-bottom: 0rpx;
      }
    }
    .top-2-2 {
      // background-color: #82c3f8;
      display: flex;
      justify-content: center;
      align-items: center;
      text {
        font-family: fantasy;
        font-size: 40rpx;
        font-weight: 600;
        text-align: center;
        margin-top: 0;
      }
    }
  }
}
</style>
