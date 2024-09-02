<template>
  <div class="ManageFamilyPets">
    <div class="d1" @tap="toSetPetBaseInformation">
      <text>修改当前宠物基本信息 >>></text>
    </div>
    <div class="d1" @tap="toManageAllPets">
      <text> 管理所有家庭宠物 >>> </text>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

let PetId = ref(0)
const test = () => {}
const toSetPetBaseInformation = () => {
  console.log('跳转宠物基本信息修改', PetId.value)
  uni.navigateTo({
    url: '/pages/index/ManagePets/SetPetMess/SetPetMess?id=' + PetId.value,
  })
}
const toManageAllPets = () => {
  console.log('管理所有的宠物')
  uni.navigateTo({
    url: '/pages/index/ManagePets/ManagePetCards/ManagePetCards',
  })
}
onLoad((e: any) => {
  console.log('宠物id', e.id)
  PetId.value = e.id
})
</script>
<style>
.d1 {
  margin-top: 20rpx;
  padding-left: 10rpx;
  width: 100%;
  height: 80rpx;
  background-color: rgb(221, 221, 221);
  display: flex;
  text-align: center;
  align-items: center;
}
</style>
