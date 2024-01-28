<template>
  <div class="box">
    <view class="page-container">
      <!-- 页面内容 -->
      <BaseTitle></BaseTitle>
      <PetDisplay></PetDisplay>
      <HealthMonitoring></HealthMonitoring>
      <DietManagement></DietManagement>
      <ExercisePlan></ExercisePlan>
      <IntelligentConsultation></IntelligentConsultation>
      <image class="background-image" src="/static/base/矩形.png"></image>
    </view>
  </div>
</template>

<script>
import BaseTitle from './components/BaseTitle.vue'
import PetDisplay from './components/PetDisplay.vue'
import HealthMonitoring from './components/HealthMonitoring.vue'
import DietManagement from './components/DietManagement.vue'
import ExercisePlan from './components/ExercisePlan.vue'
import IntelligentConsultation from './components/IntelligentConsultation.vue'
export default {
  components: {
    IntelligentConsultation,
    ExercisePlan,
    DietManagement,
    HealthMonitoring,
    PetDisplay,
    BaseTitle,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
/* pages/index/index.wxss */

.page-container {
  position: relative;
}

.background-image {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1; /* 将图片放在底层，确保其他内容在图片上方显示 */
}
</style>
