import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from './Home.vue'
import Projects from './Projects.vue'
import NotFound from "./NotFound.vue";
import MyFuture from "./MyFuture.vue";
import Blog from "./Blog.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/myfuture',
    name: 'MyFuture',
    component: MyFuture
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
