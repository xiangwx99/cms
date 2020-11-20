import axios from './axios'

export function addNavBar(navigationBar, language) {
    return axios({
        url: '/features/addBar',
        params: {
          navigationBar,
          language
        }
    })
}