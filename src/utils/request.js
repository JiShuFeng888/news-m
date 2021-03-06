/*请求模块*/
import axios from 'axios'
import store from './../store/index'
import {Toast} from "vant";

const request=axios.create({
   baseURL:"http://157.122.54.189:9083",

})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let user=store.state.user
  //如果已经登录则添加信息
  if (user){
    config.headers.Authorization=`${user.token}`
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  const status=error.response.status

  if (status===400){
    Toast.fail("服务端请求参数错误")
  }else if(status===401){
    //如果没有user


  }else if(status===403){
    Toast.fail("没有权限操作")

  }else if(status>=500){
    Toast.fail("服务端异常，请稍后尝试")
  }
  return Promise.reject(error);
});


export default request
