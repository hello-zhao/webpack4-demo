import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import('@/views/home');

const routes = [
  {
    path: '/home',
    component: Home,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: '/demo',
});

export default router;
