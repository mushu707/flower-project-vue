//引入axios
import axios from "axios";
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'


const autograph = (url, query) => {
  return {query}
}

//创建axios实例
const service = axios.create({
    //请求的地址头
    baseURL:'http://localhost:8888/JavaEE',
})

// request 拦截器
service.interceptors.request.use(config => {
  const data = autograph(config.url, config.data);

  if (config.method === 'get') {
      config.params = data.query;
  }
  if (config.method === 'post') {
      config.data = data.query;
  }

  config.headers = {'Content-Type': 'application/json;charset=UTF-8'}
  if (store.state.user.token){
      config.headers['token'] = store.state.user.token
  }

  nprogress.start();
  return config;
}, error => {
  Promise.reject(error).then(()=>{console.log(error)});
})

// response 拦截器
service.interceptors.response.use(
    response => {
        nprogress.done();
        // return response
        return response.data
    }
)

export default service