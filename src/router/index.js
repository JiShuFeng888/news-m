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
        path: 'search',
        component:()=>import('./../views/search/index')
      },
      {
        path: 'account',//默认子路由
        component:()=>import('./../views/account/index')
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
