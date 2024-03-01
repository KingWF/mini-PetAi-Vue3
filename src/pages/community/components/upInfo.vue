<!-- 发布朋友圈界面 -->
<template>
  <view class="box">
    <div class="all">
      <div class="allPic">
        <textarea v-model="info" rows="5" cols="30" placeholder="分享新鲜事..."></textarea>
        <div class="pic" v-for="(item, index) in picList" :key="index">
          <image :src="item"></image>
        </div>
        <div class="choosePic" @click="chooseImageSend">
          <image src="/static/communityImages/相册.png"></image>
          <div style="color: #bfbfbf">照片/视频</div>
        </div>
      </div>
    </div>

    <div class="down">
      <div class="one">标题: <input type="text" v-model="titlecontent" /></div>
      <div v-if="cityName" class="one" @click="chooseAddress" style="color: #1afa29">
        <image src="/static/communityImages/地点.png"></image>
        {{ cityName }}
      </div>
      <div v-else class="one" @click="chooseAddress">
        <image src="/static/communityImages/地点 (1).png"></image>
        所在位置
      </div>
    </div>
    <div class="up">
      <navigator :url="`/pages/community/community`" class="up-box" @click="sendMessage"
        >发送</navigator
      >
    </div>
  </view>
</template>

<script>
import { addMomentsAPI } from '@/services/community'

export default {
  data() {
    return {
      //发布的图片
      picList: [],
      //城市名称
      cityName: '',
      //发送的消息-正文
      info: '',
      //标题
      titlecontent: '',
      //用户ID
      userid: 1,
    }
  },
  methods: {
    chooseImageSend() {
      uni.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            this.picList.push(res.tempFilePaths[i])
            console.log(res.tempFilePaths[i])
          }
        },
      })
    },
    chooseAddress() {
      const vm = this
      wx.chooseLocation({
        success: function (res) {
          vm.cityName = res.name
          console.log(res.name) // 选择的地点名称
          console.log(res.address) // 选择的地点地址
          console.log(res.latitude) // 选择的地点纬度
          console.log(res.longitude) // 选择的地点经度
        },
      })
    },
    async addMomentsData() {
      const res = await addMomentsAPI(
        this.titlecontent,
        this.info,
        this.picList,
        this.userid,
        this.cityName,
      )
    },
    sendMessage() {
      this.addMomentsData()
      console.log(' 测试数据: ' + this.info)
      uni.switchTab({
        url: '/pages/community/community',
      })
    },
  },
}
</script>

<style lang="scss">
page {
  background: linear-gradient(to bottom, #6ebeff, #ffffff, #6ebeff);
}
.box {
  position: relative;
  .all {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.46);
    padding-bottom: 15rpx;
    & textarea {
      margin-top: 15rpx;
      padding-left: 15rpx;
      padding-top: 15rpx;
      width: 100%;
    }
    .allPic {
      display: flex;
      flex-wrap: wrap;
      .pic {
        width: 230rpx;
        height: 230rpx;
        margin-left: 15rpx;
        margin-bottom: 15rpx;
      }
      .choosePic {
        width: 230rpx;
        height: 230rpx;
        background-color: #e9e9e9;
        text-align: center;
        padding-top: 70rpx;
        margin-left: 15rpx;
        & image {
          width: 50rpx;
          height: 50rpx;
        }
      }
    }
  }
  .down {
    background-color: #ffffff;
    .one {
      border-top: 1rpx solid #e9e9e9;
      padding-top: 25rpx;
      padding-left: 50rpx;
      height: 100rpx;
      display: flex;
      font-size: 30rpx;
      & image {
        width: 50rpx;
        height: 50rpx;
      }
      & input {
        border: none;
        margin-left: 15rpx;
      }
    }
  }
  .up {
    background-color: #ffffff;
    border-top: 1rpx solid #e9e9e9;
    padding-top: 25rpx;
    padding-left: 50rpx;
    height: 100rpx;
    .up-box {
      width: 100rpx;
      height: 60rpx;
      line-height: 60rpx;
      margin-left: -10rpx;
      font-size: 20rpx;
      background: rgb(110, 190, 255, 0.5);
      text-align: center;
      border-radius: 20rpx;
    }
  }
}
</style>
