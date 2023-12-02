import 'vue'
import PetAiSwiper from '@/components/PetAiSwiper.vue'
import PetAiGuess from '@/components/PetAiGuess.vue'

declare module 'vue' {
  export interface GlobalComponents {
    PetAiSwiper: typeof PetAiSwiper
    PetAiGuess: typeof PetAiGuess
  }
}
// 组件实例类型
export type PetAiGuessInstance = InstanceType<typeof PetAiGuess>
