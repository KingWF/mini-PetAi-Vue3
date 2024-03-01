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
  <view class="base">
    <swiper :autoplay="true" :interval="12000" :circular="true">
      <swiper-item v-for="(item, index) in petList" :key="index">
        <view class="glass-content">
          <view class="container">
            <view class="left-section">
              <view class="circle">
                <image mode="scaleToFill" :src="item.photourl" />
              </view>
              <view class="text1">
                <view class="text01">
                  <!-- 宠物姓名 -->
                  <view class="text01-2">
                    <text>{{ item.name }}</text>
                  </view>
                </view>
                <!-- 宠物信息-底部灰色其他信息 -->
                <text class="text02">
                  <text>生日 : {{ item.birthday }}</text>
                  <text>性别 : {{ item.sex }}</text>
                  <text>年龄 : {{ item.text }}</text>
                </text>
              </view>
            </view>
            <view class="right-section">
              <view class="right-setting">
                <image
                  src="/static/icon/设置 (1).png"
                  mode="scaleToFill"
                  @tap="toManagePage(item.id)"
                />
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
      </swiper-item>
    </swiper>
  </view>
</template>
<script lang="ts" setup>
import { getAllPetInformationAPI } from '@/services/home'
import { useMemberStore } from '@/stores/modules/member'
import { usepetlistStore } from '@/stores/petlist'
import type { PetBaseInformation } from '@/types/home'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { watch } from 'vue'
import { reactive } from 'vue'
import { ref } from 'vue'

let currentIndex = ref(0)
// 用户id
let masterId = ref(0)
// 宠物列表
// let petList = ref<PetBaseInformation[]>([])
let petList = ref<PetBaseInformation[]>([])

const pic1 =
  'https://ts1.cn.mm.bing.net/th/id/R-C.727bd959dac97a2cdd2200de0546fc48?rik=uf%2bQn0NfSuwqdw&riu=http%3a%2f%2fwww.deskcar.com%2fdesktop%2felse%2f2018529201241%2f15.jpg&ehk=E9oLjp552WFha0R57Y2BJ2Lz5ZEmlgss1qOACunmmpQ%3d&risl=&pid=ImgRaw&r=0'

/**
 * 点击-宠物动态-跳转对应页面
 */
const toPetInformation = () => {
  uni.navigateTo({
    url: '/pages/index/petInformation/petInformation',
  })
}
// 获取当前用户下所有的宠物信息
// const getPetBaseInformationData = async (masterId: number) => {
//   const res = await getAllPetInformationAPI(masterId)
//   petList.value = res.result
//   // console.log('宠物基本信息--图片:', petList.value[0].photourl)
//   // 重置下标
// }
// 跳转信息管理界面
const toManagePage = (index: any) => {
  uni.navigateTo({
    url: '/pages/index/ManagePets/ManageFamilyPets/ManageFamilyPets?id=' + index,
  })
}
onLoad(() => {
  // petList.value=usepetlistStore().profile
  const userMenber = useMemberStore()
  const userid = userMenber.profile?.id
  console.log('用户id', userid)

  if (userid != undefined) {
    console.log('用户点击')
    getPetBaseInformationData(userid!)
  }
  // getPetBaseInformationData(useMemberStore().profile!.id)
})

// 获取当前用户下所有的宠物信息
const getPetBaseInformationData = async (masterId: number) => {
  const res = await getAllPetInformationAPI(masterId)
  // console.log('宠物基本信息--图片:', petList.value[0].photourl)
  const petlistStore = usepetlistStore()
  petlistStore.setProfile(res.result)
  petList.value = res.result
}
// 页面显示
onShow(() => {
  const petlistStore = usepetlistStore()
  console.log('宠物页面数据', petlistStore.profile)
  petList.value = petlistStore.profile
})
const handleChange = () => {
  currentIndex.value = 0
}
</script>
<style lang="scss">
.base {
  height: 400rpx;
  width: 100%;
}
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
  // background-color: #70bfff;
}

.left-section {
  display: flex;
  // background-color: #0e0e0e93;
}

.circle {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  // background-color: #70bfff;
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
  height: 150rpx;
  width: 100rpx;
  // background-color: rgb(118, 75, 19);
}
.right-setting {
  height: 100%;
  // background-color: #e9f5ff;
  padding-top: 20rpx;
  image {
    margin-left: 40rpx;
    height: 50rpx;
    width: 50rpx;
  }
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
