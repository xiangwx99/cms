import axios from './axios'

export function getNavBar(language) {
    return axios({
        url: '/features/selectBar',
        params: {
            language
        },
        methods: 'get'
    })
}

export function getNavBarById(barId) {
    return axios({
        url: '/features/selectBarById',
        params: {
            barId
        },
        methods: 'get'
    })
}

