import type { BannerItem } from '@/types/home'
import { http } from '@/utils/http'

/**
 * 获取搜索关键词对应的商品列表
 */
export const getSearchGoodsAPI = (keyword: any) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/miniTest/searchGoods',
    data: {
      keyword,
    },
  })
}
