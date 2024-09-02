<template>
  <view class="base">
    <div class="list" :style="{ width: screenWidth + 'px' }">
      <navigator
        v-for="(item, index) in ArticlesList"
        :key="index"
        class="block"
        url="/pages/discovery/ArticleDetails/ArticleDetails"
        open-type="navigate"
        hover-class="navigator-hover"
      >
        <!-- 封面图片显示部分 -->
        <image
          v-if="item.flag == 0"
          :key="index"
          :src="item.cover.url"
          :style="{ height: item.cover.height + 'px', width: item.cover.width + 'px' }"
          class="image-base"
        ></image>
        <!-- 文章信息显示部分 -->
        <div class="article-main" v-if="item.flag == 0">
          <!-- 标题 -->
          <div class="title">
            <text class="t2">{{ item.title }}</text>
          </div>
          <div class="content">
            <!-- 内容 -->
            <text>{{ item.content }}</text>
          </div>
        </div>
        <!-- 作者信息显示部分 -->
        <div class="article-buttom" v-if="item.flag == 0">
          <div class="author">
            <image :src="item.authorImage" mode="scaleToFill" class="author-image" />
            <text class="author-name">{{ item.author }}</text>
          </div>
          <div class="favorable">
            <image src="/static/收藏2.png" mode="scaleToFill" />
            <text>{{ item.favorable }}</text>
          </div>
        </div>
      </navigator>
    </div>
    <div class="list" :style="{ width: screenWidth + 'px' }">
      <navigator
        v-for="(item, index) in ArticlesList"
        :key="index"
        class="block"
        url="/pages/discovery/ArticleDetails/ArticleDetails"
        open-type="navigate"
        hover-class="navigator-hover"
      >
        <!-- 封面图片显示部分 -->
        <image
          v-if="item.flag == 1"
          :key="index"
          :src="item.cover.url"
          :style="{ height: item.cover.height + 'px', width: item.cover.width + 'px' }"
          class="image-base"
        ></image>
        <!-- 文章信息显示部分 -->
        <div class="article-main" v-if="item.flag == 1">
          <!-- 标题 -->
          <div class="title">
            <text class="t2">{{ item.title }}</text>
          </div>
          <div class="content">
            <!-- 内容 -->
            <text>{{ item.content }}</text>
          </div>
        </div>
        <!-- 作者信息显示部分 -->
        <div class="article-buttom" v-if="item.flag == 1">
          <div class="author">
            <image :src="item.authorImage" mode="scaleToFill" class="author-image" />
            <text class="author-name">{{ item.author }}</text>
          </div>
          <div class="favorable">
            <image src="/static/收藏2.png" mode="scaleToFill" />
            <text>{{ item.favorable }}</text>
          </div>
        </div>
      </navigator>
    </div>
  </view>
  <view class="loading-text">正在加载...</view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { ArticleType } from '@/types/discovery'

// 当前页面宽度
let screenWidth = ref()
// 右边列表高度
let leftHeight = ref(0)
let rightHeight = ref(0)
// 初始的文章信息
const Articles = ref([
  {
    cover: 'https://pic4.zhimg.com/v2-a9ea6b2f5f4aa678f9b676a7d792b983_r.jpg',
    title: '宠物天地',
    content: '探索宠物世界的奥秘，感受与宠物相伴的美好时光。',
    author: '宠物探索',
    authorImage: 'https://img95.699pic.com/photo/50151/3116.jpg_wh860.jpg',
    favorable: 100,
  },
  {
    cover:
      'https://img.zcool.cn/community/0169a85dc376d8a801209e1fbcb9f9.jpg@1280w_1l_2o_100sh.jpg',
    title: '宠物乐趣',
    content: '宠物是生活的调味品，让我们一起享受与宠物相伴的快乐时光。',
    author: '宠物之乐',
    authorImage: 'https://img95.699pic.com/photo/50151/3116.jpg_wh860.jpg',
    favorable: 100,
  },
  {
    cover:
      'https://img.zcool.cn/community/01c25360f4e47411013eaf701b6be1.jpg@1280w_1l_2o_100sh.jpg',
    title: '宠物乐趣',
    content: '宠物是生活的调味品，让我们一起享受与宠物相伴的快乐时光。',
    author: '宠物之乐',
    authorImage: 'https://img95.699pic.com/photo/50151/3116.jpg_wh860.jpg',
    favorable: 100,
  },
  {
    cover: 'https://static-cse.canva.cn/blob/98756/chewy-XPaLy4yt1DY-unsplash-e1604021513987.jpg',
    title: '宠物乐园',
    content: '在宠物的世界里，找到快乐和温馨。',
    author: '宠物乐园',
    authorImage: 'https://img95.699pic.com/photo/50151/3116.jpg_wh860.jpg',
    favorable: 100,
  },
  {
    cover:
      'https://img.zcool.cn/community/01d1765c824402a801217ce6a4e6a4.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100',
    title: '宠物乐趣',
    content: '在宠物的陪伴下，发现生活的美好与乐趣。',
    author: '宠物心灵',
    authorImage: 'https://img95.699pic.com/photo/50151/3116.jpg_wh860.jpg',
    favorable: 100,
  },
  {
    cover:
      'https://img.zcool.cn/community/01ae6d5d4ce384a8012187f473de20.jpg@1280w_1l_2o_100sh.jpg',
    title: '宠物趣事',
    content: '记录宠物的点点滴滴，分享与宠物相处的趣事。',
    author: '宠物之趣',
    authorImage: 'https://img95.699pic.com/photo/50151/3116.jpg_wh860.jpg',
    favorable: 100,
  },
  {
    cover: 'https://pic.52112.com/180411/180411_80/tMcqj2YVJs_small.jpg',
    title: '宠物乐趣',
    content: '在宠物的陪伴下，体验生活的多姿多彩。',
    author: '宠物乐园',
    authorImage: 'https://img95.699pic.com/photo/50151/3116.jpg_wh860.jpg',
    favorable: 100,
  },
  {
    cover:
      'https://ts1.cn.mm.bing.net/th/id/R-C.eaf061c1b65362e0bafeca8e5f72caad?rik=XONvqGmEb6mZhg&riu=http%3a%2f%2fcqmcgt.cn%2fUploads%2fdetail%2fcqmengchong%2ftemplate%2f2020-04-10%2f12_1b6366612df5136c3db5aeb122ea7e68.jpg&ehk=uISKVBeBYePmTQQ9P4b%2fwEc7EBZi1zjPhu4nYq%2f1ItA%3d&risl=&pid=ImgRaw&r=0',
    title: '宠物乐趣',
    content: '在宠物的陪伴下，度过快乐的时光。',
    author: '宠物乐园',
    authorImage: 'https://img95.699pic.com/photo/50151/3116.jpg_wh860.jpg',
    favorable: 100,
  },
  {
    cover:
      'https://ts1.cn.mm.bing.net/th/id/R-C.0f9aaa7dc7ca73fca9f880a9b53f9025?rik=M61JKqMw%2fgeX2A&riu=http%3a%2f%2fwww.8bb.com%2fd%2ffile%2f20171026%2f1509009247480546.jpg&ehk=gNstN5%2bjCNM58RIs85ePPpICq5EM0McxhpzGI%2fyyiJQ%3d&risl=&pid=ImgRaw&r=0',
    title: '宠物乐趣',
    content: '在宠物的陪伴下，感受生活的温馨与幸福。',
    author: '宠物乐园',
    authorImage: 'https://img95.699pic.com/photo/50151/3116.jpg_wh860.jpg',
    favorable: 100,
  },
])

// 处理后的文章信息
const ArticlesList = reactive<ArticleType[]>([]) // 存储所有图片信息的数组

onMounted(() => {
  // 获取当前页面高度
  getScranWidth()
  // 页面加载后，遍历图片路径数组，获取每张图片的信息
  getImageInfo()
})

function getImageInfo() {
  const promises: any[] = [] // 存储获取图片信息的 Promise 对象数组
  // 遍历图片路径数组
  Articles.value.forEach((path) => {
    // 调用 uni.getImageInfo 获取图片信息，并将 Promise 对象存储到数组中
    promises.push(
      uni.getImageInfo({
        src: path.cover,
        success: (res) => {
          // 获取等比例高度后的动态高度进行处理
          const dealHieght = (screenWidth.value * res.height) / res.width
          // 图片的位置标识 0为左边 1为右边
          let picFlag = 0
          // 初始从右边开始放入图片，如果左边列表的高度小于右边列表 则把图片放到左边显示
          if (leftHeight.value <= rightHeight.value) {
            leftHeight.value += dealHieght + 80
            picFlag = 0
          } else if (leftHeight.value > rightHeight.value) {
            rightHeight.value += dealHieght + 80
            picFlag = 1
          }
          // 获取成功后，将图片信息存储到 imageList 数组中
          const msg = {
            url: path.cover,
            width: screenWidth.value,
            height: dealHieght,
          }
          ArticlesList.push({
            // 封面
            cover: msg,
            // 标题
            title: path.title,
            // 主题
            theme: path.theme,
            // 内容
            content: path.content,
            // 作者
            author: path.author,
            // 作者头像
            authorImage: path.authorImage,
            // 收藏数
            favorable: path.favorable,
            // 显示位置标识
            flag: picFlag,
          })
        },
      }),
    )
  })
  // 使用 Promise.all 等待所有 Promise 对象执行完毕
  Promise.all(promises).then(() => {
    // 所有图片信息获取完毕后，可以进行相应操作，例如设置图片高度
  })
  console.log(ArticlesList)
}
// 获取当前页面的宽度的48%
const getScranWidth = () => {
  uni.getSystemInfo({
    success: function (res) {
      screenWidth.value = res.windowWidth * 0.46
      console.log('屏幕宽度：')
    },
  })
}
</script>

<style lang="scss" scoped>
page {
  background-color: rgb(241, 241, 241);
}
.base {
  margin-top: 20rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.list {
  display: flex;
  flex-direction: column;
}
.block {
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  margin-bottom: 6rpx;
  border-radius: 20rpx;
}
.image-base {
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  margin-bottom: 10rpx;
}
.article-main {
  margin-bottom: 10rpx;
  display: flex;
  flex-direction: column;
  .title {
    .t1 {
      font-weight: bold;
      font-size: 30rpx;
    }
    .t2 {
      margin-left: 2rpx;
      font-size: 30rpx;
      font-weight: bold;
    }
  }
  .content {
    margin: 10rpx;
    text {
      font-weight: 20rpx;
      font-size: 29rpx;
    }
  }
}
.article-buttom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10rpx;
  .author {
    display: flex;
    align-items: center;
    .author-image {
      border-radius: 50%;
      width: 40rpx;
      height: 40rpx;
    }
    .author-name {
      margin-left: 5rpx;
      font-size: 22rpx;
      font-weight: normal;
    }
  }
  .favorable {
    display: flex;
    align-items: center;
    margin-right: 10rpx;
    // background-color: #990c0cd3;
    image {
      width: 40rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }
    text {
      font-size: 25rpx;
      color: #727272d3;
      font-weight: normal;
      // margin-right: 10rpx;
    }
  }
}
.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
