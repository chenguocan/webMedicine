import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from "../views/Login.vue";
import Layout from "@/views/Layout";
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
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
