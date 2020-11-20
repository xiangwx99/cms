import axios from './axios'

export function getGameType(barId, language) {
  return axios({
      url: '/features/selectType',
      params: {
        barId,
        language
      }
  })
}