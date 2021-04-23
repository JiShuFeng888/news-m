import request from "@/utils/request";

export const updateUserProfile=(id,data)=>{
  return request({
    method:'post',
    url:`/user_update/${id}`,
    data
  })
}

export const addCommend=(id,data)=>{
  return request({
    method:'post',
    url:`/post_comment/${id}`,
    data
  })
}

export const getCommend=(id)=>{
  return request({
    method:'get',
    url:`/post_comment/${id}`,
  })
}

export const starArticle=(id)=>{
  return request({
    method:'get',
    url:`/post_star/${id}`,
  })
}

export const likeArticle=(id)=>{
  return request({
    method:'get',
    url:`/post_like/${id}`,
  })
}

export const followUser=(id)=>{
  return request({
    method:'get',
    url:`/user_follows/${id}`,
  })
}

export const deleteFollowUser=(id)=>{
  return request({
    method:'get',
    url:`/user_unfollow/${id}`,
  })
}

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

export const searchSuggest=(keyword)=>{
  return request({
    method:'get',
    url:'/post_search_recommend',
    params: {
      keyword:keyword
    }
  })
}


export const searchResult=(keyword)=>{
  return request({
    method:'get',
    url:'/post_search',
    params: {
      keyword:keyword
    }
  })
}

export const getArticleDetail=(id)=>{
  return request({
    method:'get',
    url:`/post/${id}`,
  })
}
