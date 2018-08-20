import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      // 首页
      path: '/',
      name: 'index',
      component: Index,
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   // route level code-splitting
    //   // this generates a separate chunk (login.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    // },
    {
      path: '/log',
      name: 'log',
      component: () => import(/* webpackChunkName: "log" */ './views/Log.vue'),
    },
    {
      path: '/config',
      name: 'config',
      component: () => import(/* webpackChunkName: "Config" */ './views/Config.vue'),
    },
  ],
});
