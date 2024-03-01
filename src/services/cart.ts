import type { CartItem } from '@/types/cart'
import { http } from '@/utils/http'
/**
 * 加入购物车
 * @param data 请求体参数
 */
export const postMemberCartAPI = (data: {
  skuId: string
  count: number
  name: string
  image: string
  price: number
  stock: number
  skuArr: string[]
  id: string
}) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

/**
 * 获取购物车列表
 */
export const getMemberCartAPI = () => {
  return http<CartItem[]>({
    method: 'GET',
    url: '/get/cart',
  })
}

/**
 * 删除/清空购物车单品
 * @param data 请求体参数 ids SKUID 集合
 */
export const deleteMemberCartAPI = (data: { ids: string }) => {
  return http({
    method: 'DELETE',
    url: '/delete/cart',
    data,
  })
}

/**
 * 修改购物车单品
 */
export const putMemberCartBySkuIdAPI = (skuId: string, data: { count?: number }) => {
  return http({
    method: 'PUT',
    url: `/cart/count/${skuId}`,
    data,
  })
}

export const putSelectedBySkuIdAPI = (skuId: string, data: { selected?: boolean }) => {
  return http({
    method: 'PUT',
    url: `/cart/selected/${skuId}`,
    data,
  })
}

/**
 * 购物车全选/取消全选
 * @param data selected 是否选中
 */
export const putMemberCartSelectedAPI = (data: { selected: boolean }) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data,
  })
}
