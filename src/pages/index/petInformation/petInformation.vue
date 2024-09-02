<template>
  <div class="pet-health-record">
    <PetSelector />
    <RecordList />
    <PetRecording />
    <ReminderSettings :reminders="reminders" />
  </div>
</template>

<script>
import PetSelector from '@/pages/index/petInformation/components/PetSelector.vue'
import RecordList from '@/pages/index/petInformation/components/RecordList.vue'
import ReminderSettings from '@/pages/index/petInformation/components/ReminderSettings.vue'
import PetRecording from '@/pages/index/petInformation/components/PetRecording.vue'

export default {
  components: {
    PetRecording,
    PetSelector,
    RecordList,
    ReminderSettings,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.pet-health-record {
  padding: 20px;
}
.order-info {
  display: flex;
  align-items: center;
  margin: 20px 0;
}
.order-details {
  margin-left: 10px;
}
</style>
