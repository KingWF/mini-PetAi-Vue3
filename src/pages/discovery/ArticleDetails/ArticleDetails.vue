<template>
  <div class="base">
    <scroll-view scroll-y :style="{ height: heights + 'px' }" class="scroll">
      <div class="d1">
        <image :src="Article.covimg" mode="scaleToFill" />
      </div>
      <div class="d2">
        <text> {{ Article.title }} </text>
      </div>
      <div class="author">
        <div class="a1">
          <image :src="Article.authorImg" mode="scaleToFill" />
          <text> {{ Article.author }} </text>
          <div @tap="followAuthor" v-if="ifFollow" class="follow">关注</div>
          <div @tap="followAuthor" v-else class="follow followed">已关注</div>
        </div>
        <div class="a2">
          <text>编辑于·{{ Article.time }}</text>
        </div>
      </div>
      <div class="d3">
        <text>
          {{ Article.content }}
        </text>
      </div>
      <!-- 评论区代码 -->
      <CComment
        ref="ccRef"
        v-model:userInfo="userInfo"
        v-model:tableData="tableData"
        v-model:tableTotal="tableTotal"
        @likeFun="likeFun"
        @replyFun="replyFun"
        @deleteFun="deleteFun"
        :deleteMode="deleteMode"
      ></CComment>
      <!-- <view class="btn" @tap="openComment">发一条新评论</view> -->
    </scroll-view>
    <div class="operate">
      <div class="opt1" @tap="openComment">
        <image src="/static/icon/聊天.png" mode="scaleToFill" /><text>说点什么~</text>
      </div>
      <div class="opt2">
        <div class="favorate" @tap="doFavorate">
          <image v-if="ifFavorate" src="/static/icon/收藏-0.png" mode="scaleToFill" />
          <image v-else src="/static/icon/收藏-1.png" mode="scaleToFill" />
        </div>
        <div class="share" open-type="share">
          <button open-type="share" hover-class="none" class="button">
            <image src="/static/icon/分享.png" mode="scaleToFill"></image>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CComment from '/src/cc-comment/index.vue'
// 是否关注
let ifFollow = ref(false)
// 高度
let heights = ref(0)
// 是否收藏
let ifFavorate = ref(true)
// 评论内容
let Article = ref({
  id: 1,
  title: '如何与狗狗和谐相处？',
  covimg:
    'https://lingdian-image.oss-cn-shenzhen.aliyuncs.com/20210414/e27aad672727837b6aeca070aad096aaoutput_00003.jpg',
  time: '2023-05-01',
  content:
    '  亲爱的朋友们，我想和你们分享一下我的家狗狗带给我无尽的快乐和温暖。每天回家，它总是热情地迎接我，尾巴摇摆着，眼神中充满了对我的爱和陪伴。\n  它是我生活中最忠诚的伙伴，无论我经历怎样的困难或挫折，它总是在我身边，给予我无条件的支持和安慰。和它一起散步是我最喜欢的时刻，我们一同探索大自然的美丽，享受着阳光和微风的拥抱。它的快乐和活力感染着我，让我忘记了生活中的烦恼和压力。\n每天的相处让我学会了关爱和责任，我知道我要好好照顾它，给它足够的爱和关怀。我家的狗狗是我的家庭的一部分，它带给我们欢笑和欢乐。无论是它顽皮的表情还是无辜的眼神，都能让我们笑出声来。它是我们的小天使，它的存在让我们的生活变得更加美好和充实。我真的很庆幸有它的陪伴，它是我家最可爱的小天使，我会一直爱着它，直到永远。\n  谢谢你们倾听我的分享，希望你们也能拥有一位忠诚的宠物伴侣，分享生活中的点滴喜悦和温暖。',
  author: 'ikun',
  authorImg: 'https://pic1.zhimg.com/v2-2f3043a72ac3ceb7afcac73ffd532920_r.jpg',
  like: 100,
  comment: 10,
})

onLoad(() => {
  getScrollHigh()
})
// 切换关注状态
const followAuthor = () => {
  ifFollow.value = !ifFollow.value
}
// 修改当前滚动的高度
const getScrollHigh = () => {
  heights.value = uni.getSystemInfoSync().windowHeight - 60
  console.log(heights.value)
}
// 收藏
const doFavorate = () => {
  ifFavorate.value = !ifFavorate.value
}

// 唤起新评论弹框
let ccRef = ref()
function openComment() {
  ccRef.value.newCommentFun()
}

// 点赞回调事件
const likeFun = async (params: any, callback: Function) => {
  console.log('likeFun', params)
  // 当请求失败, 调用callback重置点赞效果;
  // Demo如下:
  // try {
  // const res = await testAPI(params.params)
  // 后端操作成功 返回code为0
  // 如果操作失败则调用回调函数将点赞重置
  //   if (res.code !== '0') {
  //     callback(res)
  //   }
  // } catch (error) {
  //   // 处理请求发送失败的情况
  //   console.error(error)
  //   uni.showToast({
  //     title: '网络错误',
  //     icon: 'error',
  //   })
  //   callback('失败')
  // }
  //   if (res.code !== 0) {
  //     callback(res)
  //   }
  // }
  // axios.post("http://xxx/like", { id: params }).then((res) => {
  //   if (res.code !== 0) {
  //     callback(res);
  //   }
  // });
}

// 评论回调事件
const replyFun = async (params: any, callback: Function) => {
  console.log('replyFun', params)
  // 当请求成功, 调用callback执行评论插入;
  // Demo如下:
  // axios.post("http://xxx/reply", { ...params }).then((res) => {
  //   if (res.code === 0) {
  //     callback(res);
  //   }
  // });
  // try {
  //   const res = await test1API(params)
  //   // 后端操作成功 返回code为0
  //   if (res.code === '0') {
  //     callback(res)
  //     setTimeout(() => callback(res), 500) // 目前为了展示效果, 直接执行callback
  //   }
  // } catch (error) {
  //   // 处理请求发送失败的情况
  //   console.error(error)
  //   uni.showToast({
  //     title: '网络错误',
  //     icon: 'error',
  //   })
  // }
  const res = { id: Math.random() } // 很重要的回参! 必须拿到后端返回评论id! 删除需要!
  setTimeout(() => callback(res), 500) // 目前为了展示效果, 直接执行callback
}

/** 删除回调事件
 * mode 删除模式
 * -- bind: 当被删除的一级评论存在回复评论, 那么该评论内容变更显示为[当前评论内容已被移除]
 * -- only: 仅删除当前评论(后端删除相关联的回复评论, 否则总数显示不对)
 * -- all : 删除所有评论包括回复评论
 */
const deleteMode = ref('all')
function deleteFun(params: any, mode: any, callback: Function) {
  console.log('deleteFun', { params, mode })
  // 当请求成功, 调用callback执行评论删除;
  switch (deleteMode.value) {
    case 'bind':
      // 逻辑: 调用接口进行评论内容修改 update
      setTimeout(() => callback(), 500) // 目前为了展示效果, 直接执行callback
      break
    case 'only':
      // 逻辑: 调用接口删除一个评论 delete
      setTimeout(() => callback(), 500) // 目前为了展示效果, 直接执行callback
      break
    default:
      // all
      // 逻辑: 调用接口删除多个评论 [delete]
      // Demo如下:
      // axios.post("http://xxx/delete", { ids: params }).then((res) => {
      //   if (res.code === 0) {
      //     callback(res);
      //   }
      // });
      setTimeout(() => callback(), 500) // 目前为了展示效果, 直接执行callback
      break
  }
}

// ----模拟数据------模拟数据------模拟数据----
// 作者信息(提示: 一般来自localstorage, 如果是实时获取的话, 那么获取到数据后再v-if显示评论组件)
let userInfo = ref({
  id: 120, // 评论id
  user_name: 'ikun', // 用户名
  user_avatar: 'https://pic1.zhimg.com/80/v2-a79071a705f55c5d88f6c74e6111fe84_720w.webp', // 用户头像
})
let tableTotal = ref(4) // 评论总数
let tableData = ref([
  {
    id: 120, // 评论id
    parent_id: null, // 父级评论id
    reply_id: null, // 被回复人评论id
    reply_name: null, // 被回复人名称
    user_name: 'ikun', // 用户名
    user_avatar: 'https://pic1.zhimg.com/v2-2f3043a72ac3ceb7afcac73ffd532920_r.jpg', // 评论者头像地址
    user_content: '哇~ 狗狗真好看', // 评论内容
    is_like: false, // 是否点赞
    like_count: 120, // 点赞数统计
    create_time: '2024-01-01 09:16', // 创建时间
  },
  {
    id: 130,
    parent_id: 120, // 评论的父级id
    reply_id: 120, // 被回复评论id
    reply_name: 'ikun', // 被回复人名称
    user_name: '小黑子', // 用户名
    user_avatar: 'https://pic2.zhimg.com/80/v2-06eade66ec837713d765b1557bf20b25_720w.webp', // 评论者头像地址
    user_content: '狗狗好美', // 评论内容
    is_like: false, // 是否点赞
    like_count: 67, // 点赞数统计
    create_time: '2024-01-01 17:06', // 创建时间
  },
  {
    id: 140,
    parent_id: 120, // 评论的父级id
    reply_id: 130, // 被回复评论id
    reply_name: '小黑子', // 被回复人名称
    user_name: '守维', // 用户名
    user_avatar: 'https://pic3.zhimg.com/80/v2-244696a62fa750b8570cf56bfaa5b26a_720w.webp', // 评论者头像地址
    user_content: '确实', // 评论内容
    is_like: false, // 是否点赞
    like_count: 16, // 点赞数统计
    create_time: '2024-01-02 23:08', // 创建时间
  },
  {
    id: 150,
    parent_id: null, // 评论的父级id
    reply_id: null, // 被回复评论id
    reply_name: null, // 被回复人名称
    user_name: '原神启动', // 用户名
    user_avatar: 'https://pic2.zhimg.com/80/v2-88ec6f8c6d3305122664dd18a28730e5_720w.webp', // 评论者头像地址
    user_content: '这样的狗狗我能养十个', // 评论内容
    is_like: true, // 是否点赞
    like_count: 8, // 点赞数统计
    create_time: '2024-01-08 00:45', // 创建时间
  },
]) // 评论表
</script>

<style lang="scss">
page {
}
.scroll {
  width: 100%;
}
.operate {
  display: flex;
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  background-color: #ffffff;
  border-top: 1rpx solid #bdbdbdc6;
  padding-bottom: 20rpx;
  height: 60px;
  .opt1 {
    width: 300rpx;
    height: 60rpx;
    display: flex;
    margin-left: 40rpx;
    border: 0.5px solid #000000;
    border-radius: 30rpx;
    align-items: center;
    image {
      margin: 20rpx;
      width: 40rpx;
      height: 40rpx;
    }
  }
  .opt2 {
    display: flex;
    margin-bottom: 20rpx;
    margin-right: 40rpx;
    .favorate,
    .share {
      display: flex;
      margin-top: 20rpx;
      align-items: center;
      .button {
        background-color: transparent; /*按钮透明*/
        border: none; /*设置按钮边框*/
        display: flex;
        align-items: center;
      }
      .button::after {
        border: none;
      }
      image {
        width: 60rpx;
        height: 60rpx;
      }
    }
    .favorate {
      margin-right: 50rpx;
    }
  }
}
.d1 {
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-top: 20rpx;
  height: 400rpx;
  image {
    width: 100%;
    max-height: 100%;
    border-radius: 20rpx;
  }
}
.d2 {
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-top: 20rpx;
  text {
    font-size: 50rpx;
    font-weight: bold;
  }
}
.d3 {
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-top: 20rpx;
  text {
    text-indent: 2em;
    white-space: pre-line;
    font-weight: lighter;
    font-size: medium;
  }
}
.d4 {
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-top: 20rpx;
  background-color: rgba(231, 231, 231, 0.308);
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  .d4-title {
    margin: 10rpx;
    font-weight: bold;
  }
  .d4-text {
    margin-top: 10rpx;
    border-bottom: 1rpx solid #d6d6d6af;
  }
  .d4-1 {
    width: 100%;
    display: flex;
    padding: 10rpx;
    image {
      border-radius: 50%;
      width: 80rpx;
      height: 80rpx;
    }
    .t1 {
      margin-left: 20rpx;
      text {
        color: rgb(92, 92, 92);
        font-size: 30rpx;
      }
      .t1-2 {
        .t1-2-1 {
          color: black;
          font-size: 33rpx;
        }
        .t1-2-2 {
          color: rgb(92, 92, 92);
          font-size: 20x;
        }
      }
      .t1-3 {
        width: 100%;
        display: flex;
        margin-top: 10rpx;
        image {
          border-radius: 50%;
          width: 60rpx;
          height: 60rpx;
        }
        .tt {
          margin-left: 20rpx;
          text {
            color: rgb(92, 92, 92);
            font-size: 30rpx;
          }
          .tt1 {
            .tt1-1 {
              color: black;
              font-size: 33rpx;
            }
            .tt1-2 {
              color: rgb(92, 92, 92);
              font-size: 20x;
            }
          }
        }
      }
    }
  }
}
.author {
  display: flex;
  flex-direction: column;
  margin-top: 10rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  border-radius: 20rpx;
  padding: 10rpx;
  .a1 {
    display: flex;
    height: 80rpx;
    width: 100%;
    align-items: center;
    image {
      height: 80rpx;
      width: 80rpx;
      border-radius: 50%;
    }
    text {
      margin-left: 10rpx;
    }
    .follow {
      position: absolute;
      right: 0;
      width: 100rpx;
      background-color: rgb(255, 255, 255);
      display: flex;
      margin-right: 10rpx;
      align-items: center;
      justify-content: center;
      border-radius: 30rpx;
      height: 50rpx;
      font-size: 25rpx;
      font-weight: bolder;
      border: 1rpx solid #000000;
    }
    .followed {
      background-color: #72c6fe;
      color: #ffffff;
      border: 1rpx solid #72c6fe;
    }
  }
  .a2 {
    margin-top: 10rpx;
    text {
      color: rgba(126, 126, 126, 0.801);
      font-size: small;
    }
  }
}
.btn {
  text-align: center;
  color: #fff;
  padding: 20rpx;
  margin: 20rpx;
  border-radius: 20rpx;
  background-color: #2979ff;
}
</style>
