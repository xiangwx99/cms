import axios from './axios'

export function addGameType(barId, type, language) {
    return axios({
        url: '/features/addType',
        params: {
          barId,
          type,
          language
        }
    })
}