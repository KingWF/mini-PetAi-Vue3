import type { PageParams, PageResult } from '@/types/global'
import type {
  BannerItem,
  GuessItem,
  PetBaseInformation,
  PetPictures,
  RecommendList,
} from '@/types/home'
import { http } from '@/utils/http'

/**
 * 首页-广告区域-小程序
 * @param distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 */
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/swiper',
    data: {
      distributionSite,
    },
  })
}

/**
 * 猜你喜欢-小程序
 */
export const getHomeGoodsGuessLikeAPI = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
/**
 * 获取推荐数据
 */
type RecommendParams = PageParams & {
  subType?: number
}
export const getRecommendGoodsAPI = (data?: RecommendParams) => {
  return http<RecommendList>({
    method: 'GET',
    url: '/home/getRecommendGoods',
    data,
  })
}

/**
 * 获取宠物的图片
 */
export const getPetPictureAPI = () => {
  return http<PetPictures[]>({
    method: 'GET',
    url: 'https://mfg8uf6pxn2i.ngrok.xiaomiqiu123.top/Picture/getPetPicture',
  })
}
/**
 * 获取当前用户下的所有宠物
 */
export const getAllPetInformationAPI = (masterId: number) => {
  return http<PetBaseInformation[]>({
    method: 'GET',
    url: '/AllPetInformation',
    data: {
      masterId,
    },
  })
}
/**
 * 获取宠物基本信息
 */
export const getPetBaseInformationAPI = (id: number) => {
  return http<PetBaseInformation>({
    method: 'GET',
    url: '/basePetInformation',
    data: {
      id,
    },
  })
}
/**
 * 修改宠物基本信息
 */
export const setPetBaseInformationAPI = (id: number, index: number, text: string) => {
  return http({
    method: 'GET',
    url: '/setBasePetInformation',
    data: {
      id,
      index,
      text,
    },
  })
}
/**
 * 删除指定宠物的信息
 */
export const deletePetInformationAPI = (index: number) => {
  return http({
    method: 'GET',
    url: '/deletePetInformation',
    data: {
      index,
    },
  })
}
/**
 * 新增宠物的信息
 */
export const addPetInformationAPI = (newPet: any) => {
  return http({
    method: 'POST',
    url: '/AddNewPet/petInformation',
    data: newPet,
  })
}
/**
 * 智能回答---发送问题
 */
export const sendQuestions = (userId: string, message: string) => {
  return http({
    method: 'POST',
    url: 'http://localhost:8888/chatgpt/test001',
    data: {
      userId,
      message,
    },
  })
}
// 测试
export const GPTTest = (userId: string) => {
  return http({
    method: 'GET',
    url: 'http://localhost:8888/chatgpt/Test',
    data: {
      userId,
    },
  })
}
// 获取与gpt历史聊天内容
export const getHistoryChatData = (userId: string) => {
  return http<string[]>({
    method: 'GET',
    url: 'http://localhost:8888/chatgpt/ChatData',
    data: {
      userId,
    },
  })
}
export const uploadAavatarAPI = (filePath: string) => {
  uni.uploadFile({
    url: 'https://mfg8uf6pxn2i.ngrok.xiaomiqiu123.top/miniTest/AddNewPet/unload', //仅为示例，非真实的接口地址
    filePath: filePath,
    name: 'file',
    formData: {},
    success: (uploadFileRes) => {
      console.log('返回数据', uploadFileRes.data)
      return uploadFileRes.data
    },
  })
}
