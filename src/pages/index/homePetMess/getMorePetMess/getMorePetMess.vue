<template>
  <div class="getMorePetMess">
    <view
      v-if="isGood"
      @click="change"
      style="width: 100rpx; height: 100rpx; background-color: blue"
      >1
    </view>
    <view
      v-else
      @click="change"
      style="width: 100rpx; height: 100rpx; background-color: rgb(84, 167, 40)"
      >2
    </view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let isGood = ref(false)
const change = () => {
  isGood.value = !isGood.value
}
</script>

<style scoped></style>
