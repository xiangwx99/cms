import axios from './axios'

export function getLoginInfo(username, passwd) {
    return axios({
        url: '/user/login',
        params: {
            username,
            passwd
        },
        method: 'post'
    })
}