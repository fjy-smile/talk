import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import("../views/Register")
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import("../views/Index"),
    children:[
      {
        path: '/',
        name: 'Talk',
        component: () => import("../views/Talk")
      },
      {
        path: 'setmsg',
        name: 'SetMsg',
        component: () => import("../views/SetMsg")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
