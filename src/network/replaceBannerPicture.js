import axios from './axios'

export function replaceBannerPicture(isReplace, barId, bannerId) {
  return axios({
    url: '/officialWebsite/replaceBanner',
    params: {
      isReplace,
      barId,
      bannerId
    }
  })
}

export function updateBannerPicture(formData) {
  return axios({
    url: '/features/updateBannerPicture',
    data: formData,
    method: 'post'
  })
}