<template>
  <!-- 页面顶部宠物信息卡片区域 -->
  <view>
    <view class="glass-content">
      <!-- 内容区域 -->
      <view class="container">
        <view class="left-section">
          <view class="circle">
            <image
              src="https://ts1.cn.mm.bing.net/th/id/R-C.be1895b6cc60526df6bd79aef4005208?rik=v29k4ZW3ZVFq8g&riu=http%3a%2f%2fpic.baike.soso.com%2fp%2f20140328%2f20140328093026-679114537.jpg&ehk=EPX8WPV2D9J4aUmNtfgcN2KN3X%2fUk2BgISQsCaHMZ2Q%3d&risl=&pid=ImgRaw&r=0"
            />
          </view>
        </view>
      </view>
      <view class="rigth-section">
        <view class="rs1">
          <view class="rs1-child">
            <text class="t1">动态</text>
            <text class="t2">100</text>
          </view>
          <view class="rs1-child">
            <text class="t1">照片</text>
            <text class="t2">56</text>
          </view>
          <view class="rs1-child">
            <text class="t1">视频</text>
            <text class="t2">12</text>
          </view>
        </view>
        <view class="rs2">
          <view class="rs2-1">
            <view v-for="(item, index) in petLikeListTag" :key="index">
              <text>{{ item }}</text>
            </view>
          </view>
          <view class="rs2-2" @click="setTag">
            <image src="D:\mini-PetAI-Vue3\src\static\icon\set-Icon.png" mode="scaleToFill" />
          </view>
        </view>
      </view>
    </view>
    <view class="glass-content2">
      <view
        v-for="(item, index) in petTabarList"
        hover-class="none"
        :key="index"
        :class="{ active: activeIndex === index }"
        @click="activeIndex = index"
        >{{ item }}
      </view>
    </view>
  </view>
  <!-- 底部 -->
  <view class="pic-v">
    <view class="v1">
      <view class="v1-1"></view>
      <view class="v1-2"></view>
    </view>
    <view class="v2">
      <view class="v2-1"></view>
      <view class="v2-2"></view>
    </view>
  </view>
  <!-- 弹窗 -->
  <view class="popup" v-show="showDialog">
    <view class="popup-info">
      <view class="popup-main">
        <view v-for="(item, index) in allPetLikeTag" :key="index" @click="chooseAddTag(index)">
          <text>{{ item }}</text>
        </view>
      </view>
      <!-- 备选框 -->
      <view class="choose-tag">
        <view v-for="(item, index) in petLikeList" :key="index" @click="chooseDeleteTag(index)">
          <text>{{ item }}</text>
        </view>
      </view>
      <view class="popup-btn">
        <button class="button1" @tap="cancel">取消</button>
        <button class="button2" @tap="affirm">确认</button>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { ref } from 'vue'

// 设置动态设置高亮的下标
const activeIndex = ref(0)
// petTabarList
const petTabarList = ref(['动态', '照片', '视频'])
// 已选择的动物个性标签
let petLikeListTag = reactive(['活泼', '萌萌哒', '多动'])
// 处于选择中的动物个性标签
let petLikeList = reactive(['活泼', '萌萌哒', '多动'])
// 所有的动物个性标签
let allPetLikeTag = ref([
  '活泼',
  '忠诚',
  '温柔',
  '聪明',
  '爱玩',
  '害羞',
  '善解人意',
  '好奇',
  '独立',
  '顽皮',
  '友善',
  '安静',
  '慵懒',
  '机灵',
  '勇敢',
  '耐心',
  '爱护主人',
  '独特',
  '活力四溢',
  '热情',
])
// 弹窗开启条件
let showDialog = ref(false)

let type = ref('center')
let msgType = ref('success')
let messageText = ref('这是一条成功提示')
let value = ref('')

// 修改宠物个性标签
const setTag = () => {
  showDialog.value = true
}
// 选择增加个性标签
const chooseAddTag = (index: any) => {
  if (petLikeList.length < 3) {
    petLikeList.push(allPetLikeTag.value[index])
    console.log(allPetLikeTag.value[index])
  } else {
    uni.showToast({
      title: '最多选择三个哦~',
      icon: 'none',
    })
  }
}
// 选择删除个性标签
const chooseDeleteTag = (index: any) => {
  petLikeList.splice(index, 1)
}
const cancel = () => {
  showDialog.value = false
}
const affirm = () => {
  showDialog.value = false
  petLikeListTag.length = 0
  for (let i = 0; i < petLikeList.length; i++) {
    petLikeListTag.push(petLikeList[i])
  }
}
</script>
<style lang="scss">
.glass-content {
  margin-top: 20rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  height: 110px;
  background-color: rgba(255, 209, 93, 0.801); /* 半透明的背景色 */
  backdrop-filter: blur(10px); /* 模糊效果，根据需要调整模糊程度 */

  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  // 边框
  border-left: 2rpx solid #c5c5c5e5;
  border-right: 2rpx solid #c5c5c5e5;
  border-top: 2rpx solid #c5c5c5e5;
  // 阴影
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 阴影样式 */
  // 子盒子布局样式
  display: flex;
  justify-content: space-between;
}
.glass-content2 {
  margin-left: 20rpx;
  margin-right: 20rpx;
  height: 100rpx;
  background-color: rgb(255, 255, 255); /* 半透明的背景色 */
  backdrop-filter: blur(10px); /* 模糊效果，根据需要调整模糊程度 */

  border-bottom-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;

  // 边框
  border-left: 2rpx solid #c5c5c5e5;
  border-right: 2rpx solid #c5c5c5e5;
  border-bottom: 2rpx solid #c5c5c5e5;
  // 阴影
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 阴影样式 */
  // 子盒子排列方式
  display: flex;
  justify-content: space-between;
  padding-left: 100rpx;
  padding-right: 100rpx;
}
.glass-content2 view {
  margin-top: 20rpx;
  width: 120rpx;
  height: 60rpx;
  border-radius: 30rpx;
  border: 2rpx solid #c5c5c5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 2px rgba(104, 104, 104, 0.2); /* 阴影样式 */
  // 绑定点击事件
  cursor: pointer;
}
.active {
  background-color: rgb(255, 158, 158);
}
.container {
  height: 150rpx;
  margin: 30rpx;
  // background-color: #666;
}
.rigth-section {
  margin: 30rpx;
  margin-right: 50rpx;
  background-color: #ffffff00;
  width: 500rpx;
  .rs1 {
    // 子盒子布局样式
    display: flex;
    justify-content: space-between;
    .rs1-child {
      display: flex;
      flex-direction: column;
      margin-top: 10rpx;
      margin-left: 20rpx;
      margin-right: 20rpx;
      .t1 {
      }
      .t2 {
        margin-top: 10rpx;
        color: #ffffff;
        font-weight: 800;
      }
    }
  }
  .rs2 {
    margin-top: 10rpx;

    display: flex;
    justify-content: space-between;
    .rs2-1 {
      width: 80%;
      margin-left: 20rpx;
      margin-right: 20rpx;
      display: flex;
      justify-content: space-between;
      // background-color: #666;
      view {
        height: 50rpx;
        background-color: #dcafaf;
        border-radius: 25rpx;
        padding-top: 8rpx;
        padding-left: 10rpx;
        padding-right: 10rpx;
        display: flex;
        justify-content: center;
        text-align: center;
        max-width: 100px; /* 设置最大宽度 */
        overflow: hidden; /* 超出部分隐藏 */
        white-space: nowrap; /* 文本不换行 */
        text-overflow: ellipsis; /* 超出部分以省略号表示 */
        text {
          font-size: small;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #fff;
        }
      }
    }
    .rs2-2 {
      width: 40rpx;
      height: 40rpx;
      margin-left: 10rpx;
      // background-color: #a61818;
    }
  }
}

.left-section {
  display: flex;
  margin-top: 0;
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

// 底部样式
.pic-v {
  height: 1000rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 0 20rpx 20rpx;

  .v1 {
    width: 49%;
    height: 100%;
    margin-top: 20rpx;
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .v1-1 {
      width: 100%;
      height: 55%;
      border-radius: 10rpx;
      background-color: #dcafaf;
      display: flex;

      justify-content: space-between;
    }
    .v1-2 {
      width: 100%;
      height: 45%;
      border-radius: 10rpx;
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      background-color: #dcafaf;
      display: flex;
      justify-content: space-between;
    }
  }
  .v2 {
    width: 49%;
    height: 100%;
    // height: 500rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .v2-1 {
      width: 100%;
      height: 40%;
      border-radius: 10rpx;
      background-color: #dcafaf;
      display: flex;

      justify-content: space-between;
    }
    .v2-2 {
      width: 100%;
      height: 60%;
      border-radius: 10rpx;
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      background-color: #dcafaf;
      display: flex;
      justify-content: space-between;
    }
  }
}
// 弹窗样式
.popup-info {
  position: fixed;
  width: 600rpx;
  padding: 10rpx;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30upx;
  border-radius: 20upx;
  background-color: #fff;
  z-index: 9999;
}
.popup-btn {
  display: flex;
  justify-content: space-around;
  margin-top: 10rpx;
  .button1{
    width: 50%;
    border-radius: 0;
    border-bottom: 1rpx solid rgb(113, 113, 112);
    border-right: 1rpx solid rgb(113, 113, 112);
  }
  .button2{
    width: 50%;
    border-radius: 0;
    border-bottom: 1rpx solid rgb(113, 113, 112);
  }
}
// 个性标签的样式
.popup-main {
  display: flex;
  flex-wrap: wrap;
  view {
    height: 50rpx;
    background-color: #dcafaf;
    border-radius: 25rpx;
    margin: 10rpx;
    padding: 10rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;
    display: flex;
    justify-content: center;
    text-align: center;
    max-width: 100px; /* 设置最大宽度 */
    overflow: hidden; /* 超出部分隐藏 */
    white-space: nowrap; /* 文本不换行 */
    text-overflow: ellipsis; /* 超出部分以省略号表示 */
    text {
      font-size: small;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #fff;
    }
  }
}
// 选中的标签的备选框
.choose-tag {
  width: 100%;
  height: 70rpx;
  background-color: #eaeaea00;
  border: 0.5rpx solid #828282e5;
  border-radius: 20rpx;
  margin-top: 20rpx;
  display: flex;
  flex-wrap: wrap;
  view {
    height: 50rpx;
    background-color: #dcafaf;
    border-radius: 25rpx;
    margin: 10rpx;
    padding: 10rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;
    display: flex;
    justify-content: center;
    text-align: center;
    max-width: 100px; /* 设置最大宽度 */
    overflow: hidden; /* 超出部分隐藏 */
    white-space: nowrap; /* 文本不换行 */
    text-overflow: ellipsis; /* 超出部分以省略号表示 */
    text {
      font-size: small;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #fff;
    }
  }
}
</style>
