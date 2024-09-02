<template>
  <view class="success" v-if="memberStore.profile">
    <view class="wrapper">
      <!-- 图标 -->
      <!-- @/static/petAiPic/PetAI-logo.png -->
      <img src="@/static/icon/lingdang.png" @tap="Message" class="icon" />
      <!-- 个人资料 -->
      <view class="profile">
        <view class="meta">
          <image class="avatar" :src="memberStore.profile?.avatar" @tap="Edit"></image>
          <view class="nickname">{{ memberStore.profile?.nickname }}</view>
        </view>
      </view>
      <!-- 统计 -->
      <view class="count">
        <view class="cell" @tap="article"> 8 <text>我的帖子</text> </view>
        <view class="cell" @tap="collect"> 14 <text>我的收藏</text> </view>
        <view class="cell" @tap="history"> 18 <text>浏览历史</text> </view>
      </view>
      <!-- 我的订单 -->
      <view class="orders">
        <view class="title" @tap="MyOrder">我的订单</view>
        <view class="sorts">
          <!-- 订单 -->
          <navigator
            v-for="item in orderTypes"
            :key="item.type"
            :class="item.icon"
            :url="`/pages/my/components/orderList?type=${item.type}`"
            class="navigator"
            hover-class="none"
          >
            {{ item.text }}
          </navigator>
        </view>
      </view>
      <!-- 购物车 -->
      <view class="address icon-arrow" @tap="ShoppingCart"> 购物车 </view>
      <!-- 其它 -->
      <view class="extra">
        <view class="item icon-arrow" @tap="MyPrivacy">隐私设置</view>
        <button class="item icon-arrow" @tap="Business">个人空间</button>
      </view>
      <!-- 登录 -->
      <view class="load"><button @tap="onLoadOut">退出登录</button></view>
    </view>
  </view>
  <view class="fail" v-else>
    <view class="wrapper">
      <!-- 个人资料 -->
      <view class="profile">
        <view class="meta">
          <image
            class="avatar"
            src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png"
          ></image>
          <view class="nickname">未登录</view>
        </view>
      </view>
      <!-- 统计 -->
      <view class="count">
        <view class="cell"> 0 <text>我的帖子</text> </view>
        <view class="cell"> 0 <text>我的收藏</text> </view>
        <view class="cell"> 0 <text>浏览历史</text> </view>
      </view>
      <!-- 我的订单 -->
      <view class="orders">
        <view class="title" @tap="MyOrder">我的订单</view>
        <view class="sorts">
          <text class="icon-bill">待付款</text>
          <text class="icon-car">待收货</text>
          <text class="icon-money">退款/退货</text>
          <text class="icon-list">全部订单</text>
        </view>
      </view>
      <!-- 购物车 -->
      <view class="address icon-arrow" @tap="ShoppingCart"> 购物车 </view>
      <!-- 其它 -->
      <view class="extra">
        <view class="item icon-arrow" @tap="MyPrivacy">隐私设置</view>
        <button class="item icon-arrow" @tap="Business">个人博客</button>
      </view>
      <!-- 登录 -->
      <view class="load"><button @tap="Load">点击登录</button></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores/modules/member'

// 订单选项
const orderTypes = [
  { type: 1, text: '待付款', icon: 'icon-currency' },
  { type: 2, text: '待发货', icon: 'icon-gift' },
  { type: 3, text: '待收货', icon: 'icon-check' },
  { type: 4, text: '待评价', icon: 'icon-comment' },
]

const ShoppingCart = () => {
  uni.navigateTo({
    url: '/pages/my/components/ShoppingCart',
  })
}
const Message = () => {
  uni.navigateTo({
    url: '/pages/my/components/message',
  })
}
const MyOrder = () => {
  uni.navigateTo({
    url: '/pages/my/components/orderList',
  })
}
const MyPrivacy = () => {
  uni.navigateTo({
    url: '/pages/my/components/MyPrivacy',
  })
}
const Business = () => {
  uni.navigateTo({
    url: '/pages/my/components/MySpace',
  })
}
const article = () => {
  uni.navigateTo({
    url: '/pages/my/components/article',
  })
}
const collect = () => {
  uni.navigateTo({
    url: '/pages/my/components/collection',
  })
}
const history = () => {
  uni.navigateTo({
    url: '/pages/my/components/history',
  })
}
const Load = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}
const onLoadOut = () => {
  //模态弹窗
  uni.showModal({
    content: '是否退出登录',
    success: (res) => {
      if (res.confirm) {
        //清空用户信息
        memberStore.clearProfile()
      }
    },
  })
}

const Edit = () => {
  uni.navigateTo({
    url: '/pages/my/components/EditInformation',
  })
}
// // 获取会员信息
const memberStore = useMemberStore()
</script>

<style lang="scss" scoped>
.success {
  .wrapper {
    position: absolute;
    top: 0;
    bottom: 0;

    width: 100%;
    background-color: #f4f4f4;
  }

  .icon {
    position: absolute;
    top: 10px; /* 距离父容器顶部的距离 */
    left: 10px; /* 距离父容器左侧的距离 */
    width: 40px; /* 图标的宽度 */
    height: 40px; /* 图标的高度 */
    border-radius: 20px;
  }
  .profile {
    height: 600rpx;
    background: linear-gradient(to bottom, #6ebeff, #ffffff, #6ebeff);
    display: flex;
    justify-content: center;
    align-items: center;

    .meta {
      .avatar {
        display: block;
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        border: 2rpx solid #fff;
        overflow: hidden;
      }

      .nickname {
        display: block;
        text-align: center;
        margin-top: 50rpx;
        font-size: 30rpx;
        color: #fff;
      }
    }
  }

  .count {
    display: flex;
    margin: 0 20rpx;
    height: 100rpx;
    text-align: center;
    border-radius: 4rpx;
    background-color: #fff;

    position: relative;
    top: -27rpx;
    border-radius: 20px;

    .cell {
      flex: 1;
      padding-top: 16rpx;
      font-size: 27rpx;
      color: #333;
    }

    text {
      display: block;
      font-size: 24rpx;
    }
  }

  .orders {
    margin: -17rpx 20rpx 0 20rpx;
    padding: 20rpx 0;
    background-color: #fff;
    border-radius: 10px;

    .title {
      padding-left: 20rpx;
      font-size: 30rpx;
      color: #333;
      padding-bottom: 20rpx;
      border-bottom: 1rpx solid #eee;
    }

    .sorts {
      padding-top: 30rpx;
      text-align: center;
      display: flex;
    }

    [class*='icon-'] {
      flex: 1;
      font-size: 24rpx;

      &::before {
        display: block;
        font-size: 48rpx;
        margin-bottom: 8rpx;
        color: #ea4451;
      }
    }
  }

  .address {
    line-height: 1;
    background-color: #fff;
    font-size: 30rpx;
    padding: 25rpx 0 25rpx 20rpx;
    margin: 10rpx 20rpx;
    color: #333;
    border-radius: 10px;
  }

  .extra {
    margin: 0 20rpx;
    background-color: #fff;
    border-radius: 10px;

    .item {
      line-height: 1;
      padding: 25rpx 0 25rpx 20rpx;
      border-bottom: 1rpx solid #eee;
      font-size: 30rpx;
      color: #333;
    }

    button {
      text-align: left;
      background-color: #fff;

      &::after {
        border: none;
        border-radius: 0;
      }
    }
  }

  .icon-arrow {
    position: relative;
    border-radius: 10px;

    &::before {
      position: absolute;
      top: 50%;
      right: 20rpx;
      transform: translateY(-50%);
    }
  }
  .load {
    margin-top: 258rpx;
  }
}
.fail {
  .wrapper {
    position: absolute;
    top: 0;
    bottom: 0;

    width: 100%;
    background-color: #f4f4f4;
  }

  .profile {
    height: 600rpx;
    background-color: #ea4451;
    display: flex;
    justify-content: center;
    align-items: center;

    .meta {
      .avatar {
        display: block;
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        border: 2rpx solid #fff;
        overflow: hidden;
      }

      .nickname {
        display: block;
        text-align: center;
        margin-top: 50rpx;
        font-size: 30rpx;
        color: #fff;
      }
    }
  }

  .count {
    display: flex;
    margin: 0 20rpx;
    height: 100rpx;
    text-align: center;
    border-radius: 4rpx;
    background-color: #fff;

    position: relative;
    top: -27rpx;
    border-radius: 20px;

    .cell {
      flex: 1;
      padding-top: 16rpx;
      font-size: 27rpx;
      color: #333;
    }

    text {
      display: block;
      font-size: 24rpx;
    }
  }

  .orders {
    margin: -17rpx 20rpx 0 20rpx;
    padding: 20rpx 0;
    background-color: #fff;
    border-radius: 4rpx;

    .title {
      padding-left: 20rpx;
      font-size: 30rpx;
      color: #333;
      padding-bottom: 20rpx;
      border-bottom: 1rpx solid #eee;
    }

    .sorts {
      padding-top: 30rpx;
      text-align: center;
      display: flex;
    }

    [class*='icon-'] {
      flex: 1;
      font-size: 24rpx;

      &::before {
        display: block;
        font-size: 48rpx;
        margin-bottom: 8rpx;
        color: #ea4451;
      }
    }
  }

  .address {
    line-height: 1;
    background-color: #fff;
    font-size: 30rpx;
    padding: 25rpx 0 25rpx 20rpx;
    margin: 10rpx 20rpx;
    color: #333;
    border-radius: 4rpx;
  }

  .extra {
    margin: 0 20rpx;
    background-color: #fff;
    border-radius: 4rpx;

    .item {
      line-height: 1;
      padding: 25rpx 0 25rpx 20rpx;
      border-bottom: 1rpx solid #eee;
      font-size: 30rpx;
      color: #333;
    }

    button {
      text-align: left;
      background-color: #fff;

      &::after {
        border: none;
        border-radius: 0;
      }
    }
  }

  .icon-arrow {
    position: relative;

    &::before {
      position: absolute;
      top: 50%;
      right: 20rpx;
      transform: translateY(-50%);
    }
  }
  .load {
    margin-top: 258rpx;
  }
}
</style>
