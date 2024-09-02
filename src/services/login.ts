import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'

/**
 * 小程序登录_内测版
 * @param phoneNumber 模拟手机号码
 */
export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/miniTest/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
