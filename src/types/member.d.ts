/** 封装通用信息 */
type BaseProfile = {
  /** 用户ID */
  id: number
  /** 头像  */
  avatar: string
  /** 账户名  */
  account: string
  /** 昵称 */
  nickname?: string
}

/** 小程序登录 登录用户信息 */
export type LoginResult = BaseProfile & {
  /** 用户ID */
  id: number
  /** 头像  */
  avatar: string
  /** 账户名  */
  account: string
  /** 昵称 */
  nickname?: string
  /** 手机号 */
  mobile: string
  /** 登录凭证 */
  token: string
}

/** 个人信息 用户详情信息 */
export type ProfileDetail = BaseProfile & {
  /** 性别 */
  sex?: sex
  /** 生日 */
  birthday?: string
  /** 省市区 */
  city?: string
}
/** 性别 */
export type Sex = '女' | '男'

/** 个人信息 修改请求体参数 */
export type ProfileParams = Pick<
  'id' | 'avatar' | 'account' | 'nickname' | 'sex' | 'birthday' | 'city'
> & {
  // /** 省份编码 */
  // provinceName: string
}
