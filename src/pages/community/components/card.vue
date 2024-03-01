<!-- 朋友圈界面 -->
<template>
  <view class="top">
    <div class="COM_search left">
      <input v-model="inputValue" type="text" placeholder="搜索" id="one" />
      <image src="/static/communityImages/查找.png"></image>
    </div>
    <div class="right">
      <div class="recommend">推荐</div>
      <div class="myFollow">关注</div>
      <div class="nearby">附近</div>
    </div>
  </view>
  <view class="box" v-for="(item, index) in communityData" :key="index">
    <div class="info">
      <div class="left">
        <div class="COM_ava">
          <image :src="item.comAva" />
        </div>
        <div class="my">
          <div class="COM_name">{{ item.comName }}</div>
          <div class="COM_Intro">{{ item.comIntro }}</div>
        </div>
      </div>
      <view
        v-if="item.concern === 0"
        class="right"
        id="concern"
        @click="concern(item.id, item.concern)"
      >
        关注
      </view>
      <view
        v-else-if="item.concern === 1"
        class="right"
        id="concern"
        @click="concern(item.id, item.concern)"
      >
        已关注
      </view>
    </div>
    <div class="title">{{ item.titlecontent }}</div>
    <div class="text">{{ item.text }}</div>
    <div class="picture">
      <div
        v-for="(image, index) in item.comPics.slice(0, 3)"
        :key="index"
        class="image-wrapper"
        :style="{ zIndex: index === 2 ? '2' : '1' }"
      >
        <img :src="image" alt="Image" />
        <div v-if="index === 2 && item.comPics.length > 3" class="overlay">
          +{{ item.comPics.length - 3 }}
        </div>
      </div>
    </div>
    <div class="bottom">
      <view v-if="!isGood">
        <image src="/static/communityImages/点赞.png" @click="clickGood"></image>
      </view>
      <view v-else>
        <image src="/static/communityImages/like.png" @click="clickGood"></image>
      </view>
      <view>
        <image src="/static/communityImages/消息.png"></image>
      </view>
      <view>
        <image src="/static/communityImages/分享.png"></image>
      </view>
    </div>
  </view>
  <navigator :url="`/pages/community/components/upInfo`" class="add" @click="add">+</navigator>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { communityItem } from '@/types/community'
import { changeConcern, getCommunityDataAPI } from '@/services/community'
import { onLoad } from '@dcloudio/uni-app'

//获取全部朋友圈数据
const communityData = ref<communityItem[]>([])
const getCommunityData = async () => {
  const res = await getCommunityDataAPI()
  for (let i = 0; i < res.result.length; i++) {
    res.result[i].comPics = res.result[i].comPic.split(',')
    console.log(res.result[i].concern)
  }
  //反转获取的信息，保证用户发表说说后，是出现在页面的第一个位置
  res.result = res.result.slice().reverse()
  communityData.value = res.result
}
//搜索框内容
const inputValue = ref('')
//发布朋友圈
const add = () => {
  uni.navigateTo({
    url: '/pages/community/components/upInfo',
  })
}
//是否点赞
let isGood = ref(false)
const clickGood = () => {
  isGood.value = !isGood.value
}
//点击关注触发事件
const concern = (itemId: bigint, newConcern: number) => {
  changeConcern(itemId, newConcern)
}
onLoad(() => {
  getCommunityData()
})
</script>

<style lang="scss">
.top {
  width: 100%;
  height: 79rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.5);
  .COM_search {
    width: 300rpx;
    height: 50rpx;
    float: left;
    position: relative;
    margin-left: 30rpx;
    & input {
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 20rpx;
      border: 1rpx solid #797979;
      border-radius: 30rpx;
      background-color: #ffffff;
    }
    & image {
      width: 25rpx;
      height: 25rpx;
      position: absolute;
      top: 12rpx;
      left: 12rpx;
    }
  }
  .right {
    display: flex;
    float: right;
    .recommend,
    .myFollow,
    .nearby {
      border-radius: 20rpx;
      margin-right: 8rpx;
      width: 100rpx;
      height: 50rpx;
      font-size: 20rpx;
      line-height: 50rpx;
      border: 1rpx solid #797979;
      text-align: center;
      background-color: #ffffff;
    }
    .nearby {
      margin-right: 30rpx;
    }
  }
}
.box {
  width: 600rpx;
  height: 477rpx;
  margin-left: 73rpx;
  margin-top: 25rpx;
  border-radius: 42rpx;
  border: 1rpx solid #797979;
  background-color: rgba(255, 255, 255, 0.5);
}
.box .info {
  display: flex;
  justify-content: space-between;
  border-radius: 42rpx;
}
.box .info .left {
  float: left;
  display: flex;
  border-radius: 42rpx;
  .COM_ava {
    width: 66rpx;
    height: 66rpx;
    margin-left: 25rpx;
    margin-top: 12rpx;
    & image {
      width: 100%;
      height: 100%;
      border-radius: 50rpx;
    }
  }
  .my {
    margin-top: 12rpx;
    margin-left: 16rpx;
    .COM_name {
      height: 28rpx;
      font-size: 28rpx;
      line-height: 28rpx;
    }
    .COM_Intro {
      margin-top: 9rpx;
      font-size: 21rpx;
      height: 21rpx;
      line-height: 21rpx;
    }
  }
}
.box .info .right {
  float: right;
  width: 100rpx;
  height: 40rpx;
  border: 1rpx solid #797979;
  border-radius: 16rpx;
  font-size: 25rpx;
  line-height: 40rpx;
  text-align: center;
  margin-top: 26rpx;
  margin-right: 26rpx;
  background-color: #ffffff;
}
.box .title {
  margin-left: 30rpx;
  margin-top: 18rpx;
  height: 28rpx;
  font-size: 28rpx;
  line-height: 28rpx;
  font-weight: 600;
}
.box .text {
  white-space: pre-wrap;
  width: 550rpx;
  height: 42rpx;
  line-height: 20rpx;
  font-size: 20rpx;
  margin-left: 30rpx;
  margin-top: 16rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.box .picture {
  display: flex;
  flex-wrap: wrap;
  width: 555rpx;
  height: 180rpx;
  margin-left: 30rpx;
  margin-top: 32rpx;
  position: relative;
  .image-wrapper {
    width: 180rpx;
    height: 180rpx;
    box-sizing: border-box;
    border: 1rpx solid #797979;
    margin: 1rpx;
    .overlay {
      position: absolute;
      top: 0;
      right: 8rpx;
      width: 180rpx;
      height: 180rpx;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 18px;
    }
  }
}
.box .bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 22rpx;
  border-radius: 42rpx;
  width: 550rpx;
  margin-left: 20rpx;
  & view {
    width: 50rpx;
    height: 50rpx;
  }
  & view:first-child {
    margin-left: 68rpx;
  }
  & view:last-child {
    margin-right: 68rpx;
  }
}
.add {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  line-height: 80rpx;
  font-weight: 600;
  font-size: 40rpx;
  text-align: center;
  position: fixed;
  z-index: 100;
  bottom: 50rpx;
  right: 22rpx;
  background-color: #ffffff;
}
</style>
