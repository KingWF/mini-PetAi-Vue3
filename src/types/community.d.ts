export type communityItem = {
  /** id */
  id: bigint
  /** 头像 */
  comAva: string
  /** 名称 */
  comName: string
  /** 个人简介*/
  comIntro: string
  /** 标题*/
  titlecontent: string
  /** 正文*/
  text: string
  /** 图片*/
  comPic: string
  /** 图片数组*/
  comPics: string[]
  /** 是否关注*/
  concern: int
}
