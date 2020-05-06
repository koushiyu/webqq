import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import friend from '../views/friend.vue'
import group from '../views/group.vue'
import config from '../views/config.vue'
Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/friend/:id',
    name: 'friend',
    component: friend
  },
  {
    path: '/config',
    name: 'config',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: config
  },
  {
    path: '/friend',
    name: 'friend',
    component: friend
  },
]

const router = new VueRouter({
  routes
})

export default router
