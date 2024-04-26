import { useMemberStore } from '@/stores'

// java后端的接口
const baseURL = 'https://mfg8uf6pxn2i.ngrok.xiaomiqiu123.top/miniTest'
// py端的接口
const PythonbaseURL = 'http://127.0.0.1:5000'
// 终端服务器基地址：'https://mfg8uf6pxn2i.ngrok.xiaomiqiu123.top'
// 添加拦截器
// 拦截reques请求和uploadFile文件上传
//http://localhost:8888/miniTest
//https://mfg8uf6pxn2i.ngrok.xiaomiqiu123.top/miniTest

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 非http开头的需要加上拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 请求超时，默认是60s，修改成10s
    options.timeout = 60000
    options.header = {
      // 保留原始的header
      ...options.header,
      'source-client': 'miniapp',
    }
    // 添加token 请求头标识
    const menberStore = useMemberStore()
    const token = menberStore.profile?.token
    // 将token添加至请求头中
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */
interface Data<T> {
name(name: any): unknown
  code: string
  msg: string
  result: T
}
// 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  // 返回Promise 对象
  return new Promise<Data<T>>((resolve, rejects) => {
    uni.request({
      ...options,
      // 请求成功
      success(result) {
        if (result.statusCode >= 200 && result.statusCode < 300) {
          // 提取核心数据
          // as 断言
          resolve(result.data as Data<T>)
        } else if (result.statusCode === 401) {
          // 401错误
          const menberStore = useMemberStore()
          // 清理储存的用户数据
          menberStore.clearProfile()
          // 在点击退出登录后跳转到登录界面
          uni.navigateTo({ url: '/pages/login/login' })
          // 标记为失败
          rejects('请求失败 错误码401')
        } else {
          uni.showToast({
            title: (result.data as Data<T>).msg || '请求错误！',
            icon: 'error',
            mask: true,
          })
          // 标记为失败
          rejects(result)
        }
      },
      fail(err) {
        uni.showToast({
          title: '网络错误',
          icon: 'none',
          mask: true,
        })
        rejects(err)
      },
    })
  })
}
