import request from "@/utils/request";

export const getArticle=(params)=>{
  return request({
    method:'get',
    url:'/post?pageIndex=1&pageSize=2',
    params

  })
}

export const addUserChannels=(data)=>{
  return request({
    method:'post',
    url:'/category',
    data

  })
}
