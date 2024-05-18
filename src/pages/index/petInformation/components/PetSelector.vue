<template>
  <view>
    <p style="font-size: 50rpx; font-weight: 500; margin-bottom: 15rpx">健康档案</p>
    <p style="font-size: 25rpx; color: #888888; margin-bottom: 15rpx">记录你的宠物的健康数据</p>
    <div style="font-size: 12px; color: #888888; margin-bottom: 10rpx">宠物选择</div>
    <div class="custom-select">
      <div class="selected-option" @click="toggleDropdown">
        <div class="one">
          <image
            style="width: 120rpx; height: 120rpx; border-radius: 25rpx"
            :src="selectedPet.image"
          ></image>
        </div>
        <div class="two">
          <div class="name">
            {{ selectedPet.name }}
          </div>
          <div class="info">
            <span style="margin-right: 20rpx">年龄： {{ selectedPet.age }}</span>
            <span>性别： {{ selectedPet.sex }}</span>
          </div>
        </div>
      </div>
      <div class="arrow" @click="toggleDropdown">&#9660;</div>
      <transition name="fade">
        <div class="dropdown" v-show="dropdownOpen">
          <div class="option" v-for="pet in pets" :key="pet" @click="selectPet(pet)">
            <div class="one">
              <image
                style="width: 120rpx; height: 120rpx; border-radius: 15rpx"
                :src="pet.image"
              ></image>
            </div>
            <div class="two">
              <div class="name">
                {{ pet.name }}
              </div>
              <div class="info">
                <span style="margin-right: 20rpx">年龄： {{ pet.age }}</span>
                <span>性别： {{ pet.sex }}</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </view>
</template>

<script>
export default {
  props: {
    pet: Object,
  },
  data() {
    return {
      selectedPet: {
        name: '鸡翅',
        age: 2,
        sex: '公',
        image: '/static/picture/R-2.jpg',
      },
      dropdownOpen: false,
      pets: [
        {
          name: '东东',
          age: 1,
          sex: '母',
          image: '/static/picture/R-1.jpg',
        },
        {
          name: '鸡翅',
          age: 2,
          sex: '公',
          image: '/static/picture/R-2.jpg',
        },
      ],
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    selectPet(pet) {
      this.selectedPet = pet
      this.dropdownOpen = false // Close dropdown after selecting
    },
  },
}
</script>

<style scoped>
.custom-select {
  width: 100%;
  position: relative;
  display: inline-block;
}
.selected-option {
  display: flex;
}
.selected-option .one {
  margin-right: 40rpx;
  margin-left: 10rpx;
}
.selected-option .two .name {
  margin-top: 20rpx;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10rpx;
}
.selected-option .two .info {
  font-size: 12px;
  color: #888888;
}
.dropdown .option {
  display: flex;
}
.dropdown .one {
  margin-right: 40rpx;
  margin-left: 10rpx;
}
.dropdown .two .name {
  margin-top: 20rpx;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10rpx;
}
.dropdown .two .info {
  font-size: 12px;
  color: #888888;
}

.selected-option,
.arrow {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.arrow {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  border: none;
}

.dropdown {
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
}

.option {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

.option:last-child {
  border-bottom: none;
}

.option:hover {
  background-color: #f0f0f0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
