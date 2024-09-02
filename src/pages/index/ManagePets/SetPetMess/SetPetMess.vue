<template>
  <view class="v-base">
    <!-- 第一行 -->
    <view class="v1" @click="setInformation(1)">
      <view class="v1-1">
        <text>宠物头像</text>
      </view>
      <view class="v1-2">
        <view class="v1-2-1"
          ><image :src="petBaseInformation?.photourl" mode="scaleToFill" v-if="ifshowimg"
        /></view>
        <view class="v1-2-2"> <image src="/static/icon/arrow-right.png" mode="scaleToFill" /></view>
      </view>
    </view>
    <!-- 第二行--姓名 -->
    <view class="v2" @click="setInformation(2)">
      <view class="v2-1">
        <text>名字</text>
      </view>
      <view class="v2-2">
        <view class="v2-2-1">{{ petBaseInformation?.name }}</view>
        <view class="v2-2-2">
          <image src="/static/icon/arrow-right.png" mode="scaleToFill" />
        </view>
      </view>
    </view>
    <!-- 第三行--生日 -->
    <view class="v3" @click="setInformation(3)">
      <view class="v3-1">
        <text>生日</text>
      </view>
      <view class="v3-2">
        <view class="v3-2-1">{{ petBaseInformation?.birthday }}</view>
        <view class="v3-2-2">
          <image src="/static/icon/arrow-right.png" mode="scaleToFill" />
        </view>
      </view>
    </view>
    <!-- 第四行--性别 -->
    <view class="v4" @click="setInformation(4)">
      <view class="v4-1">
        <text>性别</text>
      </view>
      <view class="v4-2">
        <view class="v4-2-1">{{ petBaseInformation?.sex }}</view>
        <view class="v4-2-2">
          <image src="/static/icon/arrow-right.png" mode="scaleToFill" />
        </view>
      </view>
    </view>
    <!-- 第五行--备注 -->
    <view class="v5" @click="setInformation(5)">
      <view class="v5-1">
        <text>备注</text>
      </view>
      <view class="v5-2">
        <view class="v5-2-1">{{ petBaseInformation?.text }}</view>
        <view class="v5-2-2">
          <image src="/static/icon/arrow-right.png" mode="scaleToFill" />
        </view>
      </view>
    </view>
    <!-- 弹窗 -->
    <view v-if="showPopup" class="popup">
      <view class="base-button">
        <button @click="cancel">取消</button>
        <button @click="confirmName(Modified.index, Modified.text)">确认</button>
      </view>

      <view class="popup-view1" v-if="showPopup == 1">
        <view class="base-view">
          <button @tap="uploadAavatar">上传头像</button>
        </view>
        <view class="base-avatar">
          <image :src="avatar" mode="scaleToFill" />
        </view>
      </view>
      <view class="popup-view1" v-if="showPopup == 2">
        <view class="base-view">
          <input
            v-model="Modified.text"
            placeholder="输入名称2~"
            placeholder-class="input-placeholder"
            @confirm="confirmName(Modified.index, Modified.text)"
            class="base-input"
          />
        </view>
      </view>
      <view class="popup-view1" v-if="showPopup == 3">
        <view class="base-view">
          <text>生日:</text>
          <view class="SelectDate">
            <view class="DateText">
              <picker mode="date" @change="onDateChange" :value="Modified.text">
                <view class="date-picker">{{ Modified.text }}</view>
              </picker>
            </view>
          </view>
        </view>
      </view>
      <view class="popup-view1" v-if="showPopup == 4">
        <view class="base-view">
          <input
            v-model="Modified.text"
            placeholder="输入名称~"
            placeholder-class="input-placeholder"
            @confirm="confirmName(Modified.index, Modified.text)"
            class="base-input"
          />
        </view>
      </view>
      <view class="popup-view1" v-if="showPopup == 5">
        <view class="base-view">
          <input
            v-model="Modified.text"
            placeholder="输入名称~"
            placeholder-class="input-placeholder"
            @confirm="confirmName(Modified.index, Modified.text)"
            class="base-input"
          />
        </view>
      </view>
    </view>
    <view
      v-if="
        showPopup === 1 || showPopup === 2 || showPopup === 3 || showPopup === 4 || showPopup === 5
      "
      class="mask"
      @click="togglePopup(0, '')"
    ></view>
  </view>
</template>

<script lang="ts" setup>
import { onBackPress, onHide, onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { PetBaseInformation } from '@/types/home'
import {
  getAllPetInformationAPI,
  getPetBaseInformationAPI,
  setPetBaseInformationAPI,
} from '@/services/home'
import { reactive } from 'vue'
import { usepetlistStore } from '@/stores/petlist'
import { useMemberStore } from '@/stores/modules/member'

// 图片刷新
let ifshowimg = ref(true)
// 宠物基本信息
let petBaseInformation = ref<PetBaseInformation>()
let petBaseInformation2 = ref<PetBaseInformation[]>()
// 预存修改字段信息
let Modified = reactive({
  index: 0,
  text: '',
})
// 显示弹窗标识
let showPopup = ref(0)

// 用户对应的宠物标识ID
const id = ref(1)

// 临时头像储存
let avatar = ref('')
let avatartext = ref('')
// 获取宠物的基本信息
// const getPetBaseInformationData = async (id: number) => {
//   const res = await getPetBaseInformationAPI(id)
//   petBaseInformation.value = res.result
//   avatar.value = petBaseInformation.value.photourl
//   avatartext.value = petBaseInformation.value.photourl
//   console.log(res)
// }
const getPetBaseInformationData = async (id: number) => {
  console.log('宠物id' + id)

  // const petlistStore = usepetlistStore()
  // console.log(petlistStore.getPetImf())
  // petBaseInformation2.value = petlistStore.getPetImf()
  // console.log(petBaseInformation2.value.find((item) => item.id === 15))
  // petBaseInformation.value = petBaseInformation2.value.find((item) => item.id === 15)
  const res = await getPetBaseInformationAPI(id)
  petBaseInformation.value = res.result
  avatar.value = petBaseInformation.value!.photourl
  avatartext.value = petBaseInformation.value!.photourl
}
// 上传头像
const uploadAavatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: (chooseImageRes) => {
      avatar.value = chooseImageRes.tempFilePaths[0]
    },
  })
}
// 上传头像成功后，提交图片至后端
const confirmUploadAavatar = () => {
  // uni.showLoading({
  //   mask: true,
  // })
  uni.uploadFile({
    url: 'http://localhost:8888/miniTest/uploadFile', //仅为示例，非真实的接口地址
    filePath: avatar.value,
    name: 'file',
    formData: {
      id: id.value,
    },
    success: (uploadFileRes) => {
      console.log(uploadFileRes.data)
      // uni.hideLoading()
    },
  })
}
// 设置宠物的信息
const setInformation = (index: any) => {
  if (index == 1) {
    console.log('修改图片')
    togglePopup(1, '图片')
  } else if (index == 2) {
    console.log('修改名字')
    togglePopup(2, petBaseInformation.value?.name)
  } else if (index == 3) {
    console.log('修改出生日期')
    togglePopup(3, petBaseInformation.value?.birthday)
  } else if (index == 4) {
    console.log('点击了性别~')
    togglePopup(4, petBaseInformation.value?.sex)
  } else if (index == 5) {
    console.log('点击了备注~')
    togglePopup(3, petBaseInformation.value?.text)
  }
}
// 保存宠物基本信息至数据库
const setPetBaseInformationData = async (id: number, index: any, option: string) => {
  const res = await setPetBaseInformationAPI(id, index, option)
  console.log('结果:' + res.msg)
}

// 触发显示弹窗
const togglePopup = (index: number, option: any) => {
  Modified.index = index
  Modified.text = option
  showPopup.value = index
}
// 确认提交
const confirmName = async (index: any, option: string) => {
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  if (index == 1) {
    console.log('修改图片')
    if (avatar.value != avatartext.value) {
      confirmUploadAavatar()
    }
  } else {
    if (index == 2) {
      console.log('修改名字:' + option)
      petBaseInformation.value!.name = option
    } else if (index == 3) {
      petBaseInformation.value!.birthday = option
      console.log('修改出生日期')
    } else if (index == 4) {
      petBaseInformation.value!.sex = option
      console.log('点击了性别~')
    } else if (index == 5) {
      petBaseInformation.value!.text = option
      console.log('点击了备注~')
    }
    // 设置宠物信息
    await setPetBaseInformationData(id.value, index, option)
  }

  // 重新获取宠物信息
  // await getPetBaseInformationData(id.value)
  petBaseInformation.value!.photourl = avatar.value
  // 刷新所有宠物的信息
  await getAllPetInformationData()

  showPopup.value = 0
}
// 取消
const cancel = () => {
  avatar.value = avatartext.value
  showPopup.value = 0
}
// 获取当前用户下所有的宠物信息更新store
const getAllPetInformationData = async () => {
  ifshowimg.value = false

  const userMemberStore = useMemberStore()
  const res = await getAllPetInformationAPI(userMemberStore.profile!.id)
  // console.log('宠物基本信息--图片:', petList.value[0].photourl)
  const petlistStore = usepetlistStore()
  petlistStore.setProfile(res.result)
  uni.hideLoading()
  ifshowimg.value = true
}
const onDateChange = (e: any) => {
  Modified.text = e.detail.value
}
onLoad((option) => {
  id.value = option?.id
  console.log(id.value)
  getPetBaseInformationData(id.value)
})
</script>

<style lang="scss" scoped>
// 基础盒子
.v-base {
  display: flex;
  flex-direction: column;
}
/**基础样式 */
// 左边文字样式
.font-left {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35rpx;
  font-weight: 400;
}
//右边文字样式
.font-right {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35rpx;
  font-weight: 400;
  color: rgb(170, 170, 170);
  margin-right: 10rpx;
}
// 右边箭头
.arrow-right {
  width: 50rpx;
  height: 50rpx;
  // background-color: aqua;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  image {
    width: 40rpx;
    height: 50rpx;
  }
}
// 每一行盒子样式
.row-view {
  // background-color: rgb(106, 179, 243);
  height: 150rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10rpx;
  border-bottom: 1rpx solid rgb(212, 212, 212);
}

.v1 {
  @extend .row-view;
  .v1-1 {
    @extend .font-left;
  }
  .v1-2 {
    display: flex;
    justify-content: space-between;
    border-radius: 20rpx;
    // background-color: rgb(232, 202, 130);
    width: 200rpx;
    height: 100%;
    .v1-2-1 {
      width: 140rpx;
      height: 100%;
      // background-color: rgb(208, 29, 83);
      image {
        // width: 250rpx;
        border-radius: 20rpx;
      }
    }
    .v1-2-2 {
      @extend .arrow-right;
    }
  }
}
.v2 {
  @extend .row-view;
  .v2-1 {
    @extend .font-left;
  }
  .v2-2 {
    display: flex;
    justify-content: space-between;
    border-radius: 20rpx;
    // background-color: rgb(90, 157, 215);
    .v2-2-1 {
      @extend .font-right;
    }
    .v2-2-2 {
      @extend .arrow-right;
    }
  }
}
.v3 {
  @extend .row-view;
  .v3-1 {
    @extend .font-left;
  }
  .v3-2 {
    display: flex;
    justify-content: space-between;
    border-radius: 20rpx;
    // background-color: rgb(90, 157, 215);
    .v3-2-1 {
      @extend .font-right;
    }
    .v3-2-2 {
      @extend .arrow-right;
    }
  }
}
.v4 {
  @extend .row-view;
  .v4-1 {
    @extend .font-left;
  }
  .v4-2 {
    display: flex;
    justify-content: space-between;
    border-radius: 20rpx;
    // background-color: rgb(90, 157, 215);
    .v4-2-1 {
      @extend .font-right;
    }
    .v4-2-2 {
      @extend .arrow-right;
    }
  }
}
.v5 {
  @extend .row-view;
  .v5-1 {
    @extend .font-left;
  }
  .v5-2 {
    display: flex;
    justify-content: space-between;
    border-radius: 20rpx;
    // background-color: rgb(90, 157, 215);
    .v5-2-1 {
      @extend .font-right;
    }
    .v5-2-2 {
      @extend .arrow-right;
    }
  }
}
/* 弹窗效果 */
.popup {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  z-index: 999;
}
.popup-view1 {
  height: 1000rpx;
  background-color: rgb(255, 255, 255);
}

/* 遮罩层 */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 888;
}
.base-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100rpx;
  background-color: rgb(236, 236, 236);
}
.base-input {
  font-size: 40rpx;
}
.base-button {
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: space-between;
  button {
    margin: 0;
    background-color: rgb(217, 218, 218);
    width: 150rpx;
    font-size: 25rpx;
  }
}
.base-avatar {
  height: 400rpx;
  width: 100%;
  background-color: rgb(212, 212, 212);
  display: flex;
  justify-content: center;
  image {
    border-radius: 50%;
    height: 400rpx;
    width: 400rpx;
  }
}
</style>
