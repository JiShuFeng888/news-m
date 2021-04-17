/*用户相关请求接口*/

import request from "@/utils/request";

/*登录注册*/
export const login=(data)=>{
  return request({
    method:'post',
    url:'/login',
    data
  })
}
export const register=(data)=>{
  return request({
    method:'post',
    url:'register',
    data
  })
}

export const getUserChannels=()=>{
  return request({
    method:'get',
    url:'category',

  })
}

export const getCurrentUser=(id)=>{
  return request({
    method:'get',
    url:'/user/2182',
    // headers:{
    //   Authorization:`${store.state.user.token}`
    // },
    params:{
        id:id
    }

  })
}


