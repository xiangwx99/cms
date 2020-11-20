import axios from './axios'

export function addPartNamePicture(formData) {
    return axios({
        url: '/features/addPartNamePicture',
        data: formData,
        method: 'post'
    })
}

export function findPartNamePicture(typeId, page, limit, language) {
    return axios({
        url: '/features/findAllPartNamePicture',
        params: {
            typeId,
            page,
            limit,
            language
        }
    })
}

export function updatePartNamePicture(formData) {
    return axios({
        url: '/features/updatePartNamePicture',
        data: formData,
        method: 'post'
    })
}