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
      chatList: [
        {
          isMe: false,
          type: 'txt',
          content: null,
        },
      ],
      myInput: '',
      count: 1,
      websocket: null,
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
    sendMsg: function () {
      let message = this.myInput.trim()
      if (message === '') {
        return
      }

      if (this.websocket && this.websocket.readyState === 1) {
        // 确保 WebSocket 连接已经打开
        // 发送消息到 WebSocket 服务器
        this.websocket.send({
          // data: {
          //   isMe: false,
          //   type: 'txt',
          //   content: message,
          // },
          data: message,
          success: () => {
            console.log('Message sent successfully')
            this.chatList.push({
              isMe: true,
              type: 'txt',
              content: message,
            })
            // 存储聊天记录到本地存储
            uni.setStorageSync('chatList', JSON.stringify(this.chatList))
            this.myInput = '' // 清空输入框内容
            this.receiveMessage() // 你可以根据实际情况进行调整
          },
          fail: (error) => {
            console.error('Failed to send message:', error)
          },
        })
      } else {
        console.error('WebSocket connection is not open')
      }
    },
    // 模拟接收消息
    receiveMessage() {
      // 这里可以模拟接收到的消息
      setTimeout(() => {
        // const receivedMsg = {
        //   isMe: false,
        //   type: 'txt',
        //   content: '这是接收到的消息',
        // }
        //
        // // 添加到聊天列表
        // this.chatList.push(receivedMsg)
        // 存储聊天记录到本地存储
        uni.setStorageSync('chatList', JSON.stringify(this.chatList))
      }, 1000)
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
    const storedChatList = uni.getStorageSync('chatList')
    if (storedChatList) {
      this.chatList = JSON.parse(storedChatList)
      // 更新界面显示等操作
    }
    setTimeout(() => {
      uni.pageScrollTo({
        scrollTop: 999999999999,
        duration: 0,
      })
    }, 50)
  },
  created() {
    // 连接 WebSocket
    this.websocket = wx.connectSocket({
      url: 'ws://localhost:8888/websocket-endpoint',
      success: () => {
        console.log('WebSocket connected')
      },
      fail: (error) => {
        console.error('WebSocket connection error:', error)
      },
    })

    // 监听 WebSocket 打开事件
    this.websocket.onOpen(() => {
      console.log('WebSocket connection opened')
    })

    // 监听 WebSocket 接收消息事件
    this.websocket.onMessage((res) => {
      console.log('Received raw message:', res.data)

      try {
        let chat = {
          isMe: false,
          type: 'txt',
          content: res.data,
        }
        this.chatList.push(chat)
        // 更新界面显示等操作
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    })

    // 监听 WebSocket 关闭事件
    this.websocket.onClose(() => {
      console.log('WebSocket connection closed')
    })

    // 监听 WebSocket 错误事件
    this.websocket.onError((error) => {
      console.error('WebSocket error:', error)
    })
  },

  // 输入框内容变化时更新数据
  onInputMessageChange: function (event) {
    this.setData({
      inputMessage: event.detail.value,
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
