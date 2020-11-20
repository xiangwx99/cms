import axios from './axios'

export function addQQ(name, QQ) {
    return axios({
        url: '/officialWebsite/addQQ',
        params: {
          name,
          QQ
        }
    })
}

export function getQQ(display) {
  return axios({
      url: '/officialWebsite/displayQQ',
      params: {
        display
      },
      method: 'post'
  })
}

export function delQQ(id) {
  return axios({
      url: '/officialWebsite/deleteQQ',
      params: {
        id
      }
  })
}

export function replaceQQ(id, replaceToQQ) {
  return axios({
    url: '/officialWebsite/replaceQQ',
    params: {
      id,
      replaceToQQ
    }
  })
}