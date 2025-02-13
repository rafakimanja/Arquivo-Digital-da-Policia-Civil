import axios from 'axios'

axios.interceptors.request.use(
    config => {
        config.headers.Authorization = `Bearer ${sessionStorage.getItem('authToken')}`
        return config
    },
    error => Promise.reject(error)
)

axios.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status === 401){
            sessionStorage.removeItem('authToken')
            alert("Sua sessão expirou! Faça login novamente.")
            window.location.href = "/"
        }
        return Promise.reject(error)
    }
)

export default axios