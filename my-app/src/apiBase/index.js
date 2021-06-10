import axios from 'axios';

//const api = axios.create()
const api = axios.create({
    baseURL: 'https://nodejs-test-api-blog.herokuapp.com'
})



api.interceptors.request.use(function (config) {
    const JWTToken = localStorage.getItem('token');
    if (JWTToken) {
        api.defaults.headers['Authorization'] = `Bearer ${JWTToken}`
    }
    return config;
}, function (error) {

    return Promise.reject(error);
});


api.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    return Promise.reject(error);
});

export default api

