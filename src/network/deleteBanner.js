import axios from './axios'

export function deleteBanner(id) {
  return axios({
    url: '/features/deleteBarPicture',
    params: {
      id
    }
  })
}