import type { PageParams, PageResult } from '@/types/global'
import type {
  BannerItem,
  GuessItem,
  PetBaseInformation,
  PetPictures,
  RecommendGoodsItem,
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
export const setPetBaseInformationAPI = (index: number, text: string) => {
  return http({
    method: 'GET',
    url: '/setBasePetInformation',
    data: {
      index,
      text,
    },
  })
}
