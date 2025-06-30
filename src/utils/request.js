import axios from 'axios'

const http = axios.create({
    //通用请求的地址前缀
    baseURL: '/api',
    timeout: 10000,//超时时间10s
})

//请求拦截器
http.interceptors.request.use(function(config){
    //在发送请求之前做些什么
    return config;
},function(error){
    return Promise.reject(error)
})

//响应拦截器
http.interceptors.response.use(function(response){
    //在发送请求之前做些什么
    return response;
},function(error){
    return Promise.reject(error)
})

export default http