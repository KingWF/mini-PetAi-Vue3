import type { OrderCreateParams, OrderPreResult, OrderResult, Order } from '@/types/order'
import { http } from '@/utils/http'
/**
 * 填写订单-获取预付订单
 */
export const getMemberOrderPreAPI = () => {
  return http<OrderPreResult>({
    method: 'GET',
    url: '/miniTest/member/order/pre',
  })
}
/**
 * 填写订单-获取立即支付订单
 */
export const getOrderNowAPI = () => {
  return http<OrderPreResult>({
    method: 'GET',
    url: '/miniTest/member/buy/now',
  })
}

/**
 * 填写订单-获取立即购买订单
 */
export const postBuyNowAPI = (data: {
  skuId: string
  count: number
  name: string
  image: string
  price: number
  skuArr: string[]
  id: string
}) => {
  return http({
    method: 'POST',
    url: '/miniTest/member/order/pre/now',
    data,
  })
}

/**
 * 提交订单
 * @param data 请求参数
 */
export const postMemberOrderAPI = (data: OrderCreateParams) => {
  return http<{ id: string }>({
    method: 'POST',
    url: '/miniTest/member/order',
    data,
  })
}

/**
 * 获取订单详情
 * @param id 订单id
 */
export const getMemberOrderByIdAPI = (id: string) => {
  return http<OrderResult>({
    method: 'GET',
    url: `/miniTest/get/order/${id}`,
  })
}

/**
 * 获取微信支付参数
 * @param data orderId 订单id
 */
export const getPayWxPayMiniPayAPI = (data: { orderId: string }) => {
  return http<WechatMiniprogram.RequestPaymentOption>({
    method: 'GET',
    url: '/miniTest/pay/wxPay/miniPay',
    data,
  })
}

/**
 * 模拟支付-内测版
 * @param data orderId 订单id
 */
export const getPayMockAPI = (data: { orderId: string }) => {
  return http({
    method: 'GET',
    url: '/miniTest/pay/mock',
    data,
  })
}

/**
 * 模拟发货-内测版
 * @description 在DEV环境下使用，仅在订单状态为待发货时，可模拟发货，调用后订单状态修改为待收货，包含模拟物流。
 * @param id 订单id
 */
export const getMemberOrderConsignmentByIdAPI = (data: { orderId: string }) => {
  return http({
    method: 'GET',
    url: `/miniTest/order/consignment`,
    data,
  })
}

/**
 * 确认收货
 * @description 仅在订单状态为待收货时，可确认收货。
 * @param id 订单id
 */
export const putMemberOrderReceiptByIdAPI = (id: string) => {
  return http<OrderResult>({
    method: 'PUT',
    url: `/miniTest/member/order/${id}/receipt`,
  })
}

/**
 * 删除订单
 * @description 仅在订单状态为待评价，已完成，已取消时，可删除订单。
 * @param data ids 订单集合
 */
export const deleteMemberOrderAPI = (data: { ids: string }) => {
  return http({
    method: 'GET',
    url: `/miniTest/order/delete`,
    data,
  })
}

/**
 * 获取订单列表
 * @param data orderState 订单状态
 */
export const getMemberOrderAPI = (data: OrderListParams) => {
  return http<Order[]>({
    method: 'GET',
    url: `/miniTest/order`,
    data,
  })
}

import type { PageParams } from '@/types/global'
/** 订单列表参数 */
export type OrderListParams = PageParams & { orderState: number }

export const getOrderAPI = () => {
  return http<OrderResult[]>({
    method: 'GET',
    url: `/miniTest/order/all`,
  })
}

export const getOrderAgainAPI = (id: string) => {
  return http<OrderPreResult>({
    method: 'GET',
    url: `/miniTest/order/again/${id}`,
  })
}
