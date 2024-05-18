<template>
  <div class="allbase">
    <div class="base-top" :style="{ height: tabHeigh + 'px' }">
      <!-- 推荐选项 -->
      <view class="tabs">
        <text
          v-for="(item, index) in choosTab"
          :key="index"
          class="text"
          :class="{ active: index === activeIndex }"
          @tap="hghlightSubscript(index)"
          >{{ item }}</text
        >
      </view>
    </div>
    <div class="base-main-1">
      <!-- 点击"探索自然"显示的页面 -->
      <div v-if="activeIndex == 0" class="base-0">
        <scroll-view scroll-y :style="{ height: heights + 'px' }">
          <ExploreNature></ExploreNature>
        </scroll-view>
      </div>
      <!-- 点击"商城"显示的页面 -->
      <div v-else-if="activeIndex == 1" class="base-2">
        <scroll-view :scroll-y="false" class="scollerView-view" :style="{ height: heights + 'px' }">
          <ShopMail></ShopMail>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import ExploreNature from '../component/ExploreNature.vue'
import ShopMail from '../component/ShopMail.vue'

// 获取顶部tab高度
const tabHeigh = uni.getMenuButtonBoundingClientRect().bottom + 10
//获取屏幕可用高度
let screenHeight = uni.getSystemInfoSync().windowHeight
let heights = ref()

const choosTab = ['社区', '商城']
let activeIndex = ref(0)
const hghlightSubscript = (val: number) => {
  activeIndex.value = val
  console.log(val)
  console.log('tag的高度:' + tabHeigh)
}
// 修改当前滚动的高度
const getScrollHigh = () => {
  heights.value = screenHeight - tabHeigh
  console.log(heights.value)
}
onLoad(() => {
  getScrollHigh()
  console.log('高度' + tabHeigh)
})
</script>

<style lang="scss" scoped>
page {
  // background: linear-gradient(to bottom, #89ffa2, #ffffff);
  background-color: rgb(255, 255, 255);
  height: 100%;
}
.allbase {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.base-top {
  background-color: #ffffffd0;
  border-bottom: 1rpx solid #cbcbcb;
  position: relative;
}
.base-main-1 {
  height: 100%;
  border-radius: 15rpx;
  // margin-left: 20rpx;
  // margin-right: 20rpx;
}
.base-main-2 {
  margin-top: 40rpx;
  height: 700rpx;
  border-radius: 15rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
}
.tabs {
  display: flex;
  width: 50%;
  justify-content: space-around;
  height: 100rpx;
  line-height: 110rpx;
  font-size: 30rpx;
  // background-color: #000000;
  color: #333;
  position: absolute;

  bottom: 0;
  .text {
    margin: 0 10rpx;
    position: relative;
    color: #828282da;
  }
  .active {
    font-weight: bolder;
    font-size: 30rpx;
    color: #000000;
    &::after {
      content: '';
      width: 50rpx;
      height: 6rpx;
      border-radius: 30%;
      transform: translate(-50%);
      background: linear-gradient(to right, #21ff9b, #31caf8);
      position: absolute;
      left: 50%;
      bottom: 10rpx;
    }
  }
}
.base-0 {
}
.base-1 {
  background-color: #ffffff;
}
.base-2 {
  scroll-view ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
    display: none;
  }
}
// 滚动容器
.scroll {
  height: 100%;
}
.article {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  // border-radius: 20rpx;
  .navigator {
    width: 49%;
    margin-top: 20rpx;
    display: flex;
    align-items: flex-start;
    margin-bottom: 10rpx;
    flex-direction: column;
    justify-content: space-between;
    // border: 1px solid #adadad93;
  }
  .cover {
    width: 100%;
  }
  .title {
    margin-top: 10rpx;

    font-size: 25rpx;
    align-self: left;
  }

  .article-buttom {
    display: flex;
    justify-content: space-between;
  }
  .author {
    display: flex;
    align-items: center;
    .author-image {
      border-radius: 50%;
      width: 40rpx;
      height: 40rpx;
    }
    .author-name {
      margin-left: 5rpx;
      font-size: 22rpx;
      font-weight: normal;
    }
  }
  .favorable {
    display: flex;
    align-items: center;
    margin-right: 1rpx;
    image {
      width: 40rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }
    text {
      font-size: 25rpx;
      color: #262626d3;
      font-weight: normal;
      margin-right: 10rpx;
    }
  }

  .symbol {
    font-size: 70%;
  }
}
</style>
