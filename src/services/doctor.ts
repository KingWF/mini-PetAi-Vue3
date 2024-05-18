import { http } from '@/utils/http'
import type { doctorItem } from '@/types/doctor'

/**
 * 在线问诊-医生列表
 */
export const getDoctorAPI = () => {
  return http<doctorItem[]>({
    method: 'GET',
    url: '/miniTest/getDoctor',
  })
}
