import type { BannerItem, GuessItem, RecommendGoodsItem, RecommendList } from '@/types/home'
import { http } from '@/utils/http'

/**
 * 获取搜索关键词对应的商品列表
 */
export const getSearchGoodsAPI = (keyword: any) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: 'https://mfg8uf6pxn2i.ngrok.xiaomiqiu123.top/Shop/searchGoods',
    data: {
      keyword,
    },
  })
}
