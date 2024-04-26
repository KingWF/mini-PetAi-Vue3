import type { type } from 'os'
import type { PageResult } from './global'

/** 首页-广告区域数据类型 */
export type BannerItem = {
  /** 跳转链接 */
  hrefurl: string
  /** id */
  id: string
  /** 图片链接 */
  imgurl: string
  /** 跳转类型 */
  type: number
}

/** 猜你喜欢-推荐的类型 */
export type GuessItem = {
  /** 商品描述 */
  textDec: string
  /** id */
  id: string
  /** 商品名称 */
  name: string
  /** 商品图片 */
  picture: string
}
// 返回的数据集合
export type RecommendList = {
  name: string
  items: RecommendGoodsItem[]
}
// 推荐数据集合
export type RecommendGoodsItem = {
  id: string
  name: string
  goodsItems: PageResult<GoodsItem>
}
// 具体商品名称
export type GoodsItem = {
  id: string
  name: string
  pic: string
  text: string
}
/**
 * 宠物的图片
 */
export type PetPictures = {
  first: string
  second: string
  third: string
  forth: string
}
/**
 * 宠物基本信息
 */
export type PetBaseInformation = {
  id: number
  masterid: number
  photourl: string
  name: string
  sex: string
  birthday: string
  // 其他信息
  text: string
}
/**
 * 智能咨询的问题
 */
export type Question = {
  userId: string
  message: string
}
/**
 * 宠物品种信息
 */
export type IndentifyPetImfo = {
  id: number
  petDesc: string
  petFeature: string
  petImagefirst: string
  petImagesecond: string
  petKind: string
  uid: number
}
