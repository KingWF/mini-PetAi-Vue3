<template>
  <view>
    <div
      style="
        font-size: 18px;
        color: #888888;
        font-weight: 500;
        margin-bottom: 10rpx;
        margin-top: 15rpx;
      "
    >
      设置提醒
    </div>
    <div class="reminder-settings">
      <div class="reminder" v-for="reminder in reminders" :key="reminder.id">
        <button @click="setReminder(reminder.type)">
          <image
            style="width: 50rpx; height: 50rpx; border-radius: 30rpx"
            src="/static/picture/洗浴.png"
          ></image>
        </button>
        <p style="font-size: 20rpx; text-align: center; margin-top: 15rpx">{{ reminder.label }}</p>
      </div>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      reminders: [
        { id: 1, type: 'bath', label: '洗澡' },
        { id: 2, type: 'vaccine', label: '疫苗接种' },
        { id: 3, type: 'deworm', label: '驱虫' },
        { id: 4, type: 'physical', label: '体检' },
        { id: 5, type: 'other', label: '其他' },
      ],
    }
  },
  methods: {
    setReminder(type) {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: (action) => {
          this.$message({
            type: 'info',
            message: `action: ${action}`,
          })
        },
      })
      console.log(`设置提醒: ${type}`)
    },
  },
}
</script>

<style scoped>
.reminder-settings {
  border: 1px solid #ccc;
  border-radius: 25rpx;
  height: 220rpx;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.reminder button {
  margin-top: 30rpx;
  height: 100rpx;
  width: 100rpx;
}
</style>
