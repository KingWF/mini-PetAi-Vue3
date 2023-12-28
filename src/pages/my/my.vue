<template>
  <div class="container">
    <Head class="head"></Head>
    <Surf class="surf"></Surf>
    <pButton>购物车</pButton>
    <pButton>我的订单</pButton>
    <pButton>隐私设置</pButton>
    <pButton>商家注册</pButton>
    <button><div class="word">退出登录</div></button>
  </div>
</template>

<script setup lang="ts">
import Surf from './components/surf.vue'
import Head from './components/head.vue'
import pButton from './components/pButton.vue'
</script>

<style lang="scss" scoped>
.container {
  background-color: rgb(224, 224, 224);
  height: 1500rpx;
  // display: flex;
  // flex-direction: column;
  button {
    width: 250rpx;
    height: 90rpx;
    margin-top: 50rpx;
    border-radius: 15px;
    justify-content: center;
    .word {
      color: red;
      text-align: center;
      justify-content: center;
    }
  }
}
</style>
