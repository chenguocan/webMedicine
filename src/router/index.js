import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from "../views/Login.vue";
import Layout from "@/views/Layout";
import VideRoom from "@/views/VideRoom";
import Diagnosis from "@/views/Diagnosis";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },{
    path: '/i',
    name:'layout',
    redirect:'/index',
    component: Layout,
    children:[{
      path:'/index',
      name:'main',
      component:Index
    },{
      path:'/liveroom',
      component: VideRoom
    },{
      path:'/diagnosis',
      component: Diagnosis
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
