import axios from './axios'

export function getLeaveComments(page, limit) {
  return axios({
      url: '/features/findAllLeaveComments',
      params: {
          page,
          limit
      },
      methods: ['get', 'OPTIONS']
  })
}