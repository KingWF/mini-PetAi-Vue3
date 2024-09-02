import type { ProfileDetail, ProfileParams } from '@/types/member'
import { http } from '@/utils/http'

/**
 * 获取个人信息
 */
export const getMemberProfileAPI = (id: number) => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/miniTest/user/profile',
    data: {
      id,
    },
  })
}

/**
 * 修改个人信息
 * @param data 请求体参数
 */
export const putMemberProfileAPI = (data: ProfileParams) => {
  return http<ProfileDetail>({
    method: 'PUT',
    url: '/miniTest/update/profile',
    data,
  })
}
