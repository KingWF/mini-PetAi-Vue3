<template>
  <input type="text" placeholder="图片" v-model="imageData.picture" />
  <input type="text" placeholder="图片描述" v-model="imageData.desc" />
  <button @tap="getPictureData">发送</button>

  <!-- 头像 -->
  <view class="picture">
    <view @tap="upAvatar" class="avatar-content">
      <image
        class="image"
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.MFnIy68yPF6cncosVU82kwAAAA?w=205&h=205&c=7&r=0&o=5&dpr=1.5&pid=1.7"
        mode="aspectFill"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getPictureApi } from '@/services/home'
import { ref, onMounted } from 'vue'
const imageData = ref({
  picture: '',
  desc: '',
})
const getPictureData = async () => {
  const res = await getPictureApi({
    picture: imageData.value.picture,
    desc: imageData.value.desc,
  })
  console.log(res)
}

// 上传图片
const upAvatar = () => {
  //调用拍照/选择图片
  uni.chooseMedia({
    //文件个数
    count: 1,
    //文件类型
    mediaType: ['image'],
    success: (res) => {
      //本地路径
      const { tempFilePath } = res.tempFiles[0]
      //文件上传
      uni.uploadFile({
        url: 'http://127.0.0.1:5000/image',
        name: 'file',
        filePath: tempFilePath,
        success: (res) => {
          console.log(res)
        },
      })
    },
  })
}

// onMounted(() => {
//   getPictureData()
// })
</script>

<style scoped lang="scss">
// 头像
.picture {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }
}
</style>
