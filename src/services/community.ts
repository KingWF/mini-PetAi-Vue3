import { http } from '@/utils/http'
import type { communityItem } from '@/types/community'

/**
 * 首页-广告区域-小程序
 * @param distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 */
export const getCommunityDataAPI = () => {
  return http<communityItem[]>({
    method: 'GET',
    url: '/getCommunity',
  })
}

export const changeConcern = (itemId: bigint, newConcern: number) => {
  return http<number>({
    method: 'GET',
    url: '/updateConcern',
    data: {
      itemId,
      newConcern,
    },
  })
}
/**
 * 添加朋友圈
 */
export const addMomentsAPI = (
  titlecontent: string,
  info: string,
  picList: string[],
  userid: number,
  cityName: string,
  choosePetId: number,
) => {
  return http({
    method: 'GET',
    url: '/setMoments',
    data: {
      /**
       * 标题
       */
      titlecontent,

      /**
       * 正文
       */
      info,

      /**
       * 图片
       */
      picList,

      /**
       * 是否关心
       */
      cityName,

      /**
       * 用户的ID
       */
      userid,
      /**
       * 选择宠物的ID
       */
      choosePetId,
    },
  })
}
