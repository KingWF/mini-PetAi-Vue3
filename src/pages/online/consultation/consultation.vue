<template>
  <view class="container">
    <!-- 聊天列表 -->
    <view class="chat-body">
      <block v-for="(item, index) in chatList" :key="index">
        <view class="chat-one" v-if="item.sender === 'doctor'">
          <image class="chat-face" :src="doctor.comava" />
          <view class="chat-box">
            <view class="chat-sender">{{ doctor.comname }}</view>
            <view class="chat-content" v-if="item.type === 'txt'">{{ item.content }}</view>
            <image class="chat-img" v-if="item.type === 'img'" :src="item.content" />
          </view>
        </view>
        <view v-else class="chat-one chat-one-mine">
          <view class="chat-box">
            <view class="chat-content" v-if="item.type === 'txt'">{{ item.content }}</view>
            <image class="chat-img" v-if="item.type === 'img'" :src="item.content" />
          </view>
          <image
            class="chat-face"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_3.jpg"
          />
        </view>
      </block>
    </view>
    <!-- 聊天输入 -->
    <view class="chat-footer">
      <input type="text" class="msg-input" cursor-spacing="50" v-model="myInput" />
      <image class="img-chose" src="/static/communityImages/相册.png" @click="choseImgAndSend" />
      <view class="send-btn" @click="sendMsg">发送</view>
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
      chatList: [],
      myInput: '',
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
          const sendMsg = {
            sender: 'user',
            type: 'img',
            content: res.tempFilePaths[0],
          }
          try {
            wx.sendSocketMessage({
              data: JSON.stringify(sendMsg),
              success: () => {
                this.chatList.push(sendMsg)
              },
              fail: (error) => {
                console.error('发送图片消息出错:', error)
              },
            })
          } catch (error) {
            console.error('发送图片消息出错:', error)
          }
        },
      })
    },
    sendMsg() {
      const message = this.myInput.trim()
      if (!message) {
        console.log('消息为空，不发送')
        return
      }
      const sendMsg = {
        sender: 'user',
        type: 'txt',
        content: message,
      }
      try {
        wx.sendSocketMessage({
          data: JSON.stringify(sendMsg),
          success: () => {
            this.chatList.push(sendMsg)
            this.myInput = ''
          },
          fail: (error) => {
            console.error('发送消息出错:', error)
          },
        })
      } catch (error) {
        console.error('发送消息出错:', error)
      }
    },
    receiveMessage(message) {
      console.log('接收到原始消息:', message) // 输出原始消息内容

      if (!message) {
        console.error('接收到的消息是未定义或空')
        return
      }

      try {
        const parsedMessage = JSON.parse(message)
        if (parsedMessage.sender !== 'user') {
          this.chatList.push(parsedMessage)
        }
      } catch (error) {
        console.error('解析消息失败:', message, error)
      }
    },
  },
  onLoad(option) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      this.updateComputedVariable(data.data)
    })
  },
  onShow() {
    const storedChatList = uni.getStorageSync('chatList')
    if (storedChatList) {
      this.chatList = JSON.parse(storedChatList)
    }
    setTimeout(() => {
      uni.pageScrollTo({
        scrollTop: 999999999999,
        duration: 0,
      })
    }, 50)
  },
  created() {
    wx.connectSocket({
      url: 'ws://localhost:8888/websocket-endpoint',
      success: () => {
        console.log('WebSocket 连接已打开')
      },
      fail: (error) => {
        console.error('WebSocket 连接错误:', error)
      },
    })

    wx.onSocketOpen(() => {
      console.log('WebSocket 连接已打开')
    })

    wx.onSocketMessage((res) => {
      console.log('接收到消息:', res)
      if (res.data) {
        this.receiveMessage(res.data)
      } else {
        console.error('接收到空消息')
      }
    })

    wx.onSocketClose(() => {
      console.log('WebSocket 连接已关闭')
    })

    wx.onSocketError((error) => {
      console.error('WebSocket 错误:', error)
    })
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
