import axios from './axios'

export function loginOut() {
  console.log("登出");
  return axios({
    url: '/user/loginOut',
    method: 'post'
  })
}