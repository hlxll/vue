import axios from './axios.js'

export default (app, param) => {
    axios.interceptors.request.use(() => {
        console.log('req');
    })


    app.config.globalProperties.$axios = axios
}