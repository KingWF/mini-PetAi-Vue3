<template>
  <view class="container">
    <!-- 聊天列表 -->
    <view class="chat-body">
      <block v-for="(item, index) in chatList" :key="index">
        <view class="chat-one" v-if="!item.isMe">
          <image class="chat-face" :src="doctor.comava" />
          <view class="chat-box">
            <view class="chat-sender">{{ doctor.comname }}</view>
            <view class="chat-content" v-if="item.type === 'txt' && item.content == null"
              >您好，我是{{ doctor.comname }}医生，请问您想咨询什么呢？</view
            >
            <view v-else class="chat-content">{{ item.content }}</view>
            <image class="chat-img" v-if="item.type === 'img'" :src="item.content"></image>
          </view>
        </view>
        <view v-else class="chat-one chat-one-mine">
          <view class="chat-box">
            <view class="chat-content" v-if="item.type === 'txt'">{{ item.content }}</view>
            <image class="chat-img" v-if="item.type === 'img'" :src="item.content"></image>
          </view>
          <image
            class="chat-face"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_3.jpg"
          ></image>
        </view>
      </block>
    </view>
    <!-- 聊天输入 -->
    <view class="chat-footer">
      <input type="text" class="msg-input" cursor-spacing="50" v-model="myInput" />
      <image class="img-chose" src="/static/communityImages/相册.png" @click="choseImgAndSend" />
      <view class="send-btn" @click="sendMsg">发现</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      doctor: {
        id: 0,
        comava: '',
        comname: '',
        comgrade: '',
        comaddress: '',
        commain: '',
        cases: 0,
        acclaim: 0,
      },
      chatList: [
        {
          isMe: false,
          type: 'txt',
          content: null,
        },
      ],
      myInput: '',
      count: 1,
    }
  },
  methods: {
    updateComputedVariable(value) {
      this.doctor = value
    },
    choseImgAndSend() {
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          console.log(res.tempFilePaths[0])

          let sendMsg = {
            isMe: true,
            type: 'img',
            content: res.tempFilePaths[0],
          }
          this.chatList.push(sendMsg)
          uni.setStorageSync('chatList', JSON.stringify(this.chatList))
        },
      })
    },
    sendMsg() {
      if (!this.myInput) return null
      let Msg = {
        isMe: true,
        type: 'txt',
        content: this.myInput,
      }
      this.chatList.push(Msg)
      if (this.count === 1) {
        let Msg1 = {
          isMe: false,
          type: 'txt',
          content: '我草泥马',
        }
        this.chatList.push(Msg1)
      }
      this.count++
      this.myInput = ''
      setTimeout(() => {
        uni.pageScrollTo({
          scrollTop: 999999999999,
          duration: 0,
        })
      }, 0)
      uni.setStorageSync('chatList', JSON.stringify(this.chatList))
    },
  },
  onLoad(option) {
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      console.log(data)
      // 在数据可用时更新组件的data
      this.updateComputedVariable(data.data)
    })
  },
  onShow() {
    if (!uni.getStorageSync('chatList')) {
      this.chatList = JSON.parse(uni.getStorageSync('chatList'))
      setTimeout(() => {
        uni.pageScrollTo({
          scrollTop: 999999999999,
          duration: 0,
        })
      }, 50)
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #f1f1f1;
  min-height: 100vh;
}
.chat-body {
  padding-bottom: 178upx;

  .chat-one {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20upx 0;
  }

  .chat-one-mine {
    justify-content: flex-end;
    .chat-face {
      margin-left: 0;
      margin-right: 40upx;
    }
    .chat-box {
      margin-right: 20upx;
    }
    .chat-img {
      float: right;
    }
  }

  .chat-face {
    width: 84upx;
    height: 84upx;
    border-radius: 10upx;
    margin-left: 40upx;
  }

  .chat-box {
    max-width: calc(100% - 290upx);
    margin-left: 20upx;
    font-size: 30upx;
  }

  .chat-sender {
    color: #888;
    font-size: 28upx;
    margin-top: -8upx;
    margin-bottom: 10upx;
  }

  .chat-content {
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
  }

  .chat-img {
    float: left;
    max-width: 60%;
    border-radius: 5px;
    width: 400rpx;
    height: 400rpx;
  }
}
.chat-footer {
  width: 750upx;
  padding: 0 40upx;
  height: 120upx;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-top: 1upx solid #ddd;

  .msg-input {
    background-color: #fff;
    width: calc(100% - 300upx);
    height: 70upx;
    line-height: 70upx;
    font-size: 30upx;
    border-radius: 10upx;
    padding: 0 20upx;
  }

  .img-chose {
    height: 70upx;
    width: 70upx;
  }

  .send-btn {
    height: 60upx;
    line-height: 60upx;
    width: 120upx;
    text-align: center;
    background-color: green;
    color: #ffffff;
    border-radius: 12upx;
  }
}
</style>
