<template>
  <div class="ManagePetCards">
    <div class="d1" v-for="(item, index) in petList" :key="index">
      <div class="cards">
        <div class="glass-content">
          <div class="container">
            <div class="left-section">
              <div class="circle">
                <image mode="scaleToFill" :src="item.photourl" />
              </div>
              <div class="text1">
                <div class="text01">
                  <!-- 宠物姓名 -->
                  <div class="text01-2">
                    <text>{{ item.name }}</text>
                  </div>
                </div>
                <!-- 宠物信息-底部灰色其他信息 -->
                <text class="text02">
                  <text>生日 : {{ item.birthday }}</text>
                  <text>性别 : {{ item.sex }}</text>
                  <text>备注 : {{ item.text }}</text>
                </text>
              </div>
            </div>
          </div>
        </div>
        <div class="deleteButton">
          <image @tap="deletePetById(item.id)" src="/static/icon/删除 (1).png" mode="scaleToFill" />
        </div>
      </div>
    </div>
    <div class="d1" v-if="petList.length < 3">
      <div class="d1-2">
        <image src="/static/icon/添加 (3).png" mode="scaleToFill" @tap="addPet()" />
      </div>
    </div>
  </div>
  <!-- 弹窗 -->
  <div v-if="showPopup" class="popup">
    <div class="base-button">
      <button @click="cancel">取消</button>
      <button @click="confirmName()">确认</button>
    </div>
    <div class="popup-view1">
      <div class="base-view">
        <text> 头像: </text>
        <image :src="avatar" mode="scaleToFill" />
        <div class="v1">
          <button @tap="uploadAavatar()">选择头像</button>
        </div>
      </div>
      <div class="base-view2">
        <div class="inputText">
          <text>名字:</text
          ><input
            v-model="newPet.name"
            placeholder-class="input-placeholder"
            @input="inputName()"
          />
        </div>
        <div class="warnText">
          <text>{{ inputRule.nameWarningText }}</text>
        </div>
      </div>
      <div class="base-view2">
        <div class="inputText">
          <text>性别:</text>
          <div>
            <uni-data-checkbox v-model="newPet.sex" :localdata="sex"></uni-data-checkbox>
          </div>
        </div>
        <div class="warnText">
          <text>{{ inputRule.sexWarningText }}</text>
        </div>
      </div>
      <div class="base-view2">
        <div class="inputText">
          <text>生日:</text>
          <view class="SelectDate">
            <view class="DateText">
              <picker mode="date" @change="onDateChange" :value="DateValue">
                <view class="date-picker">{{ DateValue }}</view>
              </picker>
            </view>
          </view>
        </div>
        <div class="warnText">
          <text>{{ inputRule.birthdayWaringText }}</text>
        </div>
      </div>
      <div class="base-view2">
        <div class="inputText">
          <text>备注:</text><input v-model="newPet.text" placeholder-class="input-placeholder" />
        </div>
        <div class="warnText">
          <text>{{ inputRule.TextWaringText }}</text>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showPopup" class="mask"></div>
</template>

<script lang="ts" setup>
import {
  addPetInformationAPI,
  deletePetInformationAPI,
  getAllPetInformationAPI,
  uploadAavatarAPI,
} from '@/services/home'
import { useMemberStore } from '@/stores'
import { usepetlistStore } from '@/stores/petlist'
import type { PetBaseInformation } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
// 当前用户的id
let userId = ref(0)

let DateValue = ref('请选择日期')
const onDateChange = (e: any) => {
  DateValue.value = e.detail.value
  newPet.birthday = DateValue.value
}

// 宠物列表
let petList = ref<PetBaseInformation[]>([])
let isShow = ref(true)
// 显示编辑弹窗
let showPopup = ref(false)
// 临时头像地址
let avatar = ref('')
// 新增宠物信息
let newPet = reactive({
  id: 0,
  masterid: 0,
  name: '',
  photourl: '',
  sex: '公',
  birthday: '',
  text: '',
})
const newPet1 = {
  id: 0,
  masterid: 0,
  name: '占山',
  photourl: '无',
  sex: '公',
  birthday: '',
  text: '',
}
// 规则
let inputRule = reactive({
  nameWarningText: '',
  sexWarningText: '',
  birthdayWaringText: '',
  TextWaringText: '',
})
// 性别选项
const sex = [
  {
    text: '公',
    value: '公',
  },
  {
    text: '母',
    value: '母',
  },
  {
    text: '未知',
    value: '未知',
  },
]
const test = () => {
  isShow.value = !isShow.value
}

// 获取当前用户下所有的宠物信息
const getPetBaseInformationData = async (masterId: number) => {
  const res = await getAllPetInformationAPI(masterId)
  const petlistStore = usepetlistStore()
  petlistStore.setProfile(res.result)
  petList.value = []
  petList.value = res.result
}

// 删除指定id的宠物
const deletePetById = async (index: number) => {
  const res = await deletePetInformationAPI(index)
  getPetBaseInformationData(userId.value)
  console.log('结果：', res.msg)
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
const confirmUploadAavatarAndInformation = () => {
  uni.uploadFile({
    url: 'https://mfg8uf6pxn2i.ngrok.xiaomiqiu123.top/miniTest/AddNewPet/unload', //仅为示例，非真实的接口地址
    filePath: avatar.value,
    name: 'file',
    formData: {},
    success: (uploadFileRes) => {
      console.log('返回数据', uploadFileRes.data)
      const filePath = uploadFileRes.data
      // 图片储存链接生成成功后 将新增宠物信息保存至后端
      newPet.photourl = filePath
      addPetInformationAPI(newPet)
      // 刷新宠物列表
      getPetBaseInformationData(userId.value)
    },
  })
}
// 添加宠物
const addPet = () => {
  showPopup.value = !showPopup.value
}
// 取消
const cancel = () => {
  showPopup.value = !showPopup.value
}
// 确认
const confirmName = () => {
  // 将用户id赋值给该新增宠物的主人id
  newPet.masterid = userId.value
  // 校验输入是否全部符合规则
  if (newPet.name == '') {
    inputRule.nameWarningText = '宠物名字不能为空'
    return
  }
  if (inputRule.nameWarningText == '名字长度为1-6个字符') {
    return
  }
  if (newPet.birthday == '') {
    inputRule.birthdayWaringText = '宠物生日不能为空'
    setTimeout(function () {
      inputRule.birthdayWaringText = ''
    }, 2000)
    return
  }
  console.log('点击了提交')
  console.log(newPet)
  // 上传头像至后端

  // 上传宠物数据至后端
  confirmUploadAavatarAndInformation()

  // 关闭弹窗
  showPopup.value = !showPopup.value
}
// 监听输入name是否超出限制长度
const inputName = () => {
  if (newPet.name.length > 6) {
    inputRule.nameWarningText = '名字长度为1-6个字符'
  } else {
    inputRule.nameWarningText = ''
  }
}
// 获取当前用户的id
const getUserId = () => {
  const userMember = useMemberStore()
  userId.value = userMember.profile!.id
}
onLoad(() => {
  getUserId()
  getPetBaseInformationData(userId.value)
})
</script>

<style lang="scss">
.ManagePetCards {
  padding: 20rpx;
}
.d1 {
  height: 300rpx;
  width: 100%;
  border-radius: 20rpx;
  background-color: rgb(39, 204, 241);
  margin-bottom: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.d1-2 {
  image {
    width: 200rpx;
    height: 180rpx;
  }
}
.cards {
  display: flex;
}
.deleteButton {
  height: 100rpx;
  width: 100rpx;
  // background-color: rgb(159, 159, 159);
  margin-top: 80rpx;
  image {
    width: 80rpx;
    height: 80rpx;
  }
}
.glass-content {
  margin: 20rpx 20rpx;
  // padding: 4rpx;
  background-color: rgb(255, 255, 255); /* 半透明的背景色 */
  border-radius: 15px;
  // 边框
  // border: 2rpx solid #c5c5c5e5;
  /* 其他样式属性 */
}
.container {
  height: 200rpx;
  display: flex;
  margin: 10rpx;
  // background-color: #70bfff;
  justify-content: center;
  align-items: center;
}

.left-section {
  display: flex;
  // background-color: #0e0e0e93;
}

.circle {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  // background-color: #70bfff;
  overflow: hidden;
}
.circle image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20rpx;
  // background-color: #70bfff;
  padding: 10rpx;
  height: 150rpx;
}

.text01 {
  display: flex;
  .text01-1 {
    input {
      margin-top: 10rpx;
      width: 150rpx;
      height: 50rpx;
    }
  }
  .text01-2 {
    text {
      font-size: 50rpx;
      // background-color: #ffffff;
    }
  }
  .text01-3 {
    width: 50rpx;
    height: 50rpx;
    margin-top: 10rpx;
    margin-left: 20rpx;
    // background-color: #a61818;
  }
}

.text02 {
  font-size: 12px;
  color: rgb(178, 178, 178);
  // background-color: antiquewhite;
}
.text02 text:nth-child(2),
.text02 text:nth-child(3) {
  margin-left: 20rpx;
}
/* 弹窗效果 */
.popup {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #e0e0e0;
  box-sizing: border-box;
  z-index: 999;
}
.popup-view1 {
  height: 1000rpx;
  // background-color: rgb(209, 209, 209);
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
  height: 250rpx;
  background-color: rgb(255, 255, 255);
  image {
    width: 200rpx;
    height: 200rpx;
  }
  .v1 {
    margin-right: 10rpx;
    button {
      background-color: #ececec;
    }
  }
}
.base-view2 {
  display: flex;
  justify-content: space-between;
  height: 80rpx;
  background-color: #ffffff;
  border: 1rpx solid #e0e0e0;
  align-items: center;
  .inputText {
    display: flex;
    text {
      margin-right: 20rpx;
    }
  }
  // 警告文字
  .warnText {
    margin-right: 10rpx;
    color: #df1313;
    font-size: smaller;
  }
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
    background-color: rgb(255, 255, 255);
    width: 150rpx;
    font-size: 25rpx;
  }
}
.base-avatar {
  height: 400rpx;
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  image {
    border-radius: 50%;
    height: 400rpx;
    width: 400rpx;
  }
}
.selectSex {
  background-color: #abe097;
}
</style>
