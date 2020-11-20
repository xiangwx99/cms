import axios from './axios'

export function getAllBanner(language, barId, page, limit) {
  return axios({
      url: '/features/findAllBannerPicture',
      params: {
        language,
        barId: null,
        page: 0,
        limit: 100
      },
      methods: ['get', 'OPTIONS']
  })
}
