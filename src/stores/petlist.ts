import type { PetBaseInformation } from '@/types/home'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const usepetlistStore = defineStore('petlist', () => {
  // 会员信息
  const profile = ref<PetBaseInformation[]>([]) // [!code ++]

  // 保存宠物信息，首页使用
  const setProfile = (val: PetBaseInformation[]) => {
    profile.value = val
  }

  // 清理会员信息，退出时使用
  const clearProfile = () => {
    profile.value = []
  }

  // 记得 return
  return { profile, setProfile, clearProfile }
})
