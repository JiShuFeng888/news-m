import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/'},
  {
    path: '/login',
    name:'login',
    component:()=>import('./../views/login/index')
  },
  {
    path: '/',
    name:'layout',
    component:()=>import('./../views/layout/index'),
      children: [
      {
        path: '',//默认子路由
        component: () => import('./../views/home/index')
      },
      {
        path: 'music',
        component: () => import('./../views/music/index')
      },
      {
        path: 'account',//默认子路由
        component:()=>import('./../views/account/index')
      },
    ]
  },
  {
    path: '/search',
    component:()=>import('./../views/search/index')
  },
  {
    path: '/article/:articleId',
    name:'article',
    component:()=>import('./../views/article/index'),
    props:true
  },
  {
    path: '/user/profile',
    name:'userProfile',
    component:()=>import('./../views/userProfile/index'),
  },
  {
    path: '/starArticle',
    name:'starArticle',
    component:()=>import('./../views/account/components/starArticle')
  },

]

const router = new VueRouter({
  routes
})

export default router
