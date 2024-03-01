<template>
  <view class="scroll-list">
    <!-- 循环信息列表 渲染所有的信息 -->
    <view v-for="(item, index) in chatList" :key="index">
      <!-- 是否显示聊天间隔的时间 -->
      <view v-if="item.date" class="show-date">{{ item.date }}</view>
      <view :class="login.id == item.msgId ? 'row row-self' : 'row'">
        <view :class="login.id == item.msgId ? 'head-self' : 'head-friend'">
          <image class="avatar" :src="item.avatar"></image>
        </view>
        <view>
          <view v-if="login.id != item.msgId" class="nick">{{ item.nickname }}</view>
          <view :class="login.id == item.msgId ? 'message msg-self' : 'message msg-friend'">
            <text>{{ item.message }}</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 加载 -->
    <view class="loading" v-if="isShowLoading">
      <view class="animbox">
        <view></view>
        <view></view>
        <view></view>
        <view></view>
        <view></view>
      </view>
    </view>
    <view class="row row-self"></view>
  </view>
  <!-- 发送信息 -->
  <view class="footer">
    <view class="row">
      <view class="input-box">
        <textarea
          class="text-area"
          placeholder-class="textarea-placeholder"
          :show-confirm-bar="false"
          :cursor-spacing="30"
          :maxlength="500"
          :confirm-hold="true"
          placeholder="输入信息"
          :disabled="ifSentQuestion"
          v-model="content"
        ></textarea>
      </view>
      <view class="send-btn" v-if="content != ''">
        <button class="send-text" @click="sendClick">发 送</button>
      </view>
    </view>
  </view>
  <!-- <view>
    <button @click="test">测试</button>
  </view> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { GPTTest, getHistoryChatData, sendQuestions } from '../../../services/home'
import { reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 机器人头像图片
const RobotAvatar = '/static/icon/ic_智能助手.png'
// 防止再次发送问题
let ifSentQuestion = ref(false)
// 是否加载
let isShowLoading = ref(false)
// // 上次聊天时间
// let leastChatDate = ref(0)
let content = ref('')
// 当前登录者信息
let login = reactive({
  id: '2023',
  user: '张三',
  avatar:
    'https://img2.baidu.com/it/u=1581320883,910100018&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=9135844131fa04a7ad00686d88c76752',
})
// 聊天信息
let chatList = reactive([
  {
    msgId: '-1',
    nickname: 'PetChatAI',
    avatar: RobotAvatar,
    message: '你好,您可以向我咨询一些关于宠物的问题~',
    type: 'text',
    date: '',
  },
])
onLoad(() => {
  getChatData()
  scrollToBottom()
})
// 获取当前时间
const getNowDate = () => {
  var date = new Date()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minu = date.getMinutes()
  var now1 = month < 10 ? '0' + month : month
  var now2 = day < 10 ? '0' + day : day
  const nowDate = now1 + '-' + now2 + ' ' + hour + ':' + minu
  return nowDate
}
// 发送问题
const sendClick = () => {
  // 发送问题期间禁止再次提问
  ifSentQuestion.value = true
  // 组装数据
  var msg = {
    msgId: login.id,
    nickname: login.user,
    avatar: login.avatar,
    message: content.value,
    type: 'text',
    date: getNowDate(),
  }
  chatList.push(msg)
  scrollToBottom()
  // 显示正在加载的图标
  isShowLoading.value = true
  // 获取回答
  getAnswer()
  content.value = ''
}
// 获取ChatGPT的回答
const getAnswer = async () => {
  const res = await sendQuestions(login.id, content.value)
  const messageContent = res.result as string
  // 将信息组装成正确格式
  var msg = {
    msgId: '-1',
    nickname: 'PetChatAI',
    avatar: RobotAvatar,
    message: messageContent,
    type: 'text',
    date: '',
  }
  // 加加载标记关掉
  isShowLoading.value = false
  chatList.push(msg)
  scrollToBottom()
  // 解除禁制 可以再次提问
  ifSentQuestion.value = false
}
// 滑动到最底部
const scrollToBottom = () => {
  setTimeout(() => {
    wx.pageScrollTo({
      scrollTop: 200000,
      duration: 3,
    })
  }, 300)
}
// 获取用户与gpt历史聊天内容
const getChatData = async () => {
  const res = await getHistoryChatData(login.id)
  // console.log(res.result)
  const chatlist = res.result
  //
  for (let i = 0; i < chatlist.length; i++)
    if (i % 2 == 0) {
      var msg1 = {
        msgId: login.id,
        nickname: login.user,
        avatar: login.avatar,
        message: chatlist[i],
        type: 'text',
        date: '',
      }
      chatList.push(msg1)
      scrollToBottom()
    } else {
      var msg2 = {
        msgId: '-1',
        nickname: 'PetChatAI',
        avatar: RobotAvatar,
        message: chatlist[i],
        type: 'text',
        date: '',
      }
      chatList.push(msg2)
      scrollToBottom()
    }
}
// 测试
const test = async () => {
  // const res = await GPTTest('2023')
  const res = await getHistoryChatData(login.id)
  console.log(res.result)
}
</script>

<style scoped>
page {
  background-color: #f1f1f1;
}

.scroll-list {
  padding-bottom: 220rpx;
  background-color: #ffffff;
}

/* 显示时间 */
.show-date {
  text-align: center;
  font-size: 24rpx;
  padding: 15rpx 0;
  color: gray;
}

/* 每行对话样式 */
.row {
  display: flex;
  flex-direction: row;
  padding: 20rpx;
}

/* 提示信息 */
.tips-text {
  text-align: center;
  justify-content: center;
  font-size: 28rpx;
  color: gray;
}

.row-self {
  flex-direction: row-reverse;
}

/* 头像 */
.head-self {
  margin-left: 20rpx;
  /* background-color: #33ccff; */
}

.head-friend {
  margin-right: 20rpx;
  /* background-color: #ff6347; */
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.nick {
  color: gray;
  font-size: 24rpx;
  margin-bottom: 15rpx;
}

/* 消息内容 */
.message {
  font-size: 30rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  line-height: 45rpx;
}

.msg-self {
  width: 480rpx;
  border-top-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;
  border-bottom-left-radius: 30rpx;
  color: #434343;
  background-image: linear-gradient(to right, #73dcff, #b0e2ff);
}

.msg-friend {
  width: 480rpx;
  border-top-right-radius: 30rpx;
  border-bottom-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;
  color: #ffffff;
  background-image: linear-gradient(to right, #fa9b3c, #ff6c3f);
}

/* 以下为输入框样式 */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.874);
  border-top: 1rpx solid #efefef;
}

.input-box {
  flex: 5;
  border: 1rpx solid #cecece;
  border-radius: 10rpx;
}

.send-btn {
  flex: 1;
  text-align: center;
  margin-left: 10rpx;
  margin-top: 10rpx;
  /* background-color: #ff6633; */
}

.send-text {
  background-color: #89d2ff;
  font-size: 30rpx;
  border-radius: 20rpx;
  padding: 5rpx 20rpx;
  color: #000000;
}

.text-area {
  max-height: 120rpx;
  width: 98%;
  padding: 15rpx 10rpx;
  font-size: 30rpx;
}

.placeholder {
  font-size: 30rpx;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}

.loading {
  display: flex;
  justify-content: center;
}
/* 加载的动画效果 */
.animbox {
  height: 800rpx;
  /* background-color: #2998c400; */
  width: 200px;
  text-align: center;
}
/*设置各竖条的共有样式*/
.animbox view {
  background-color: #3696cd;
  width: 4px;
  height: 35px;
  border-radius: 2px;
  margin: 2px;
  animation-fill-mode: both;
  display: inline-block;
  animation: anim 0.9s 0s infinite cubic-bezier(0.11, 0.49, 0.38, 0.78);
}
/*设置动画延迟*/
.animbox :nth-child(2),
.animbox :nth-child(4) {
  animation-delay: 0.25s !important;
}

.animbox :nth-child(1),
.animbox :nth-child(5) {
  animation-delay: 0.5s !important;
}
/*定义动画*/
@keyframes anim {
  0% {
    transform: scaley(1);
  }
  80% {
    transform: scaley(0.3);
  }
  90% {
    transform: scaley(1);
  }
}
</style>
