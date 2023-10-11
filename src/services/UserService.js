import axios from './customize-axios'

const fetchAllUsers = (page) => {
    return axios.get('/api/users', {
        params: {
            page
        }
    })
}  

const postCreateUser = (name, job) => {
    return axios.post('/api/users', {
        name,
        job
    })
}

const putUpdateUser = (name, job, id) => {
    return axios.put(`/api/users/${id}`, {
        name,
        job
    })
}

export { fetchAllUsers, postCreateUser, putUpdateUser }