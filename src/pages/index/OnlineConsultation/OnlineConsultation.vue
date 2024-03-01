<template>
  <div class="d1">
    <div class="d1-1" v-for="(item, index) in docterList" :key="index">
      <div class="d1-1-1">
        <div class="avatar">
          <image :src="item.avatar" mode="scaleToFill" />
        </div>
        <div class="card">姓名:{{ item.name }}</div>
      </div>
      <div class="d1-1-2">
        <div class="d1-text">hahha</div>
        <div class="d1-button">
          <button>立即咨询</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const docterList = reactive([
  {
    avatar: 'https://img.zcool.cn/community/0117825857a100a801219c778d2554.jpg@2o.jpg',
    name: '张三',
  },
  {
    avatar:
      'https://img.zcool.cn/community/01bec85857a107a8012060c8a045ab.jpg@1280w_1l_2o_100sh.jpg',
    name: '李四',
  },
  {
    avatar:
      'https://ts1.cn.mm.bing.net/th/id/R-C.ba78ddc012a74660d324447b1c031239?rik=nPsbN6YmPgPrjQ&riu=http%3a%2f%2fimg95.699pic.com%2felement%2f40032%2f0097.png_300.png&ehk=5RXkrxsNv%2br8jJCYOHb246TZyICTKqelUy0OJWznABY%3d&risl=&pid=ImgRaw&r=0',
    name: '王五',
  },
])
</script>

<style lang="scss">
page {
  height: 100%;
}
.d1 {
  width: 100%;
  height: 100%;
  background-color: bisque;
  display: flex;
  flex-direction: column;
  padding-top: 20rpx;
}
.d1-1 {
  background-color: rgb(187, 199, 195);
  // width: 100%;
  height: 33%;
  margin: 80rpx 20rpx 80rpx 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20rpx;
}
.d1-1-1 {
  background-color: rgb(0, 189, 126);
  height: 65%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10rpx;
}
.d1-1-2 {
  display: flex;
  justify-content: space-between;
  background-color: rgb(77, 191, 28);
  height: 30%;
  width: 100%;
}
.avatar {
  width: 30%;
  background-color: aqua;
  image {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
  }
}
.card {
  width: 70%;
  background-color: rgb(40, 187, 255);
}
.d1-button {
  // margin-right: 10rpx;
  width: 30%;
  // background-color: aqua;
  button {
    margin-top: 10rpx;
    margin-right: 20rpx;
    width: 150rpx;
    font-size: 22rpx;
  }
}
.d1-text {
  width: 70%;
}
</style>
