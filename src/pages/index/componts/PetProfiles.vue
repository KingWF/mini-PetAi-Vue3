<template>
  <!-- <view class="glass-content">
    <scroll-view scroll-y class="scoll-css">
      <view class="container" v-for="item in 3" :key="item">
        <view class="left-section">
          <view class="circle">
            <image
              src="https://ts1.cn.mm.bing.net/th/id/R-C.be1895b6cc60526df6bd79aef4005208?rik=v29k4ZW3ZVFq8g&riu=http%3a%2f%2fpic.baike.soso.com%2fp%2f20140328%2f20140328093026-679114537.jpg&ehk=EPX8WPV2D9J4aUmNtfgcN2KN3X%2fUk2BgISQsCaHMZ2Q%3d&risl=&pid=ImgRaw&r=0"
            />
          </view>
          <view class="text1">
            <text class="text01">柯基</text>
            <text class="text02">
              <text>小标题</text>
              <text>性别</text>
              <text>年龄: {{ item }}</text>
            </text>
          </view>
        </view>
        <view class="right-section">
          <text class="text-s1" @click="toPetInformation">宠物档案>>></text>
        </view>
      </view>
    </scroll-view>
  </view> -->
  <view class="glass-content">
    <view class="container">
      <view class="left-section">
        <view class="circle">
          <image
            src="https://ts1.cn.mm.bing.net/th/id/R-C.be1895b6cc60526df6bd79aef4005208?rik=v29k4ZW3ZVFq8g&riu=http%3a%2f%2fpic.baike.soso.com%2fp%2f20140328%2f20140328093026-679114537.jpg&ehk=EPX8WPV2D9J4aUmNtfgcN2KN3X%2fUk2BgISQsCaHMZ2Q%3d&risl=&pid=ImgRaw&r=0"
          />
        </view>
        <view class="text1">
          <view class="text01">
            <view v-if="IsNameSetting" class="text01-1">
              <input
                v-model="petName"
                placeholder="输入新姓名~"
                placeholder-class="input-placeholder"
                :maxlength="maxName"
                @confirm="setName"
                ref="myInput"
              />
            </view>
            <view class="text01-2" v-else>
              <text>{{ petName }}</text>
            </view>
            <view class="text01-3" @click="setName">
              <image src="/static/icon/set-Icon.png" mode="scaleToFill" />
            </view>
          </view>
          <text class="text02">
            <text>生日 : 2020.1.13</text>
            <text>性别 : 公</text>
            <text>年龄 : 1</text>
          </text>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="bottom-1">
        <view class="bottom-1-1"> 记录宠物生活 分享日常趣事 </view>
        <button class="but1" @click="toPetInformation">宠物动态</button>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

//宠物名字
let petName = ref('柯基')
// 宠物名字修改标识
let IsNameSetting = ref(false)
// 宠物名字最大长度
let maxName = ref(5)

const pic1 =
  'https://ts1.cn.mm.bing.net/th/id/R-C.727bd959dac97a2cdd2200de0546fc48?rik=uf%2bQn0NfSuwqdw&riu=http%3a%2f%2fwww.deskcar.com%2fdesktop%2felse%2f2018529201241%2f15.jpg&ehk=E9oLjp552WFha0R57Y2BJ2Lz5ZEmlgss1qOACunmmpQ%3d&risl=&pid=ImgRaw&r=0'
const onClick = (e: any) => {
  console.log(e)
}
const toPetInformation = () => {
  uni.navigateTo({
    url: '/pages/index/petInformation/petInformation',
  })
}
// 修改宠物名字
const setName = () => {
  IsNameSetting.value = !IsNameSetting.value
}
</script>
<style lang="scss" scoped>
.glass-content {
  margin: 20rpx 20rpx;
  padding: 4rpx;
  background-color: rgb(255, 255, 255); /* 半透明的背景色 */
  border-radius: 15px;
  // 边框
  // border: 2rpx solid #c5c5c5e5;
  /* 其他样式属性 */
}
.container {
  height: 200rpx;
  display: flex;
  // 边框
  border-bottom: 2rpx solid #c5c5c5e5;
  padding-top: 10rpx;
  margin: 30rpx;
}

.left-section {
  display: flex;
  // background-color: #0e0e0e93;
}

.circle {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  overflow: hidden;
}
.circle image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20rpx;
  // background-color: #70bfff;
  padding: 10rpx;
  height: 150rpx;
}

.text01 {
  display: flex;
  .text01-1 {
    input {
      margin-top: 10rpx;
      width: 150rpx;
      height: 50rpx;
    }
  }
  .text01-2 {
    text {
      font-size: 50rpx;
      // background-color: #ffffff;
    }
  }
  .text01-3 {
    width: 50rpx;
    height: 50rpx;
    margin-top: 10rpx;
    margin-left: 20rpx;
    // background-color: #a61818;
  }
}

.text02 {
  font-size: 12px;
  color: rgb(178, 178, 178);
  // background-color: antiquewhite;
}
.text02 text:nth-child(2),
.text02 text:nth-child(3) {
  margin-left: 20rpx;
}

.right-section {
  margin-left: auto;
  margin-top: 50rpx;
  margin-right: 10rpx;
}
// 宠物档案--文本样式
.text-s1 {
  color: #847f7fc1;
}

.bottom {
  // background-color: #27bc42;
  .bottom-1 {
    display: flex;
    justify-content: space-between;
    padding: 0 10rpx 0 20rpx;
    height: 70rpx;
    margin: 20rpx 20rpx;
    color: #0e0e0e93;
    font-size: 28rpx;
    border-radius: 32rpx;
    background: linear-gradient(to right, #b4d9f7dc, #e3f2ffed, rgba(255, 255, 255, 0.947));
    // 边框
    // border: 2rpx solid #c5c5c5e5;
  }
  .bottom-1-1 {
    // background-color: rgb(46, 150, 241);
    margin-left: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 100rpx;
  }
  .but1 {
    padding: 0;
    border-radius: 32rpx;
    background-color: #70bfff;
    margin-right: 0rpx;
    margin-bottom: 8rpx;
    font-size: 30rpx;
    color: #ffffff;
    width: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70rpx;
    width: 150rpx;
  }
}
</style>
