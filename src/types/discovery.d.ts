/** 处理过后的文章数据类型 */
export type ArticleType = {
  // 封面
  cover: ImageType
  // 标题
  title: string
  // 主题
  theme: string
  // 内容
  content: string
  // 作者
  author: string
  // 作者头像
  authorImage: string
  // 收藏数
  favorable: number
  // 显示位置标识
  flag: number
}
// 图片格式
export type ImageType = {
  url: string
  width: number
  height: number
}
