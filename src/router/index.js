import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Post from '../views/Post.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  },
  {
    path: '/post',
    name: 'Post',
    component: Post
  },
]

const router = new VueRouter({
  routes
})

export default router
