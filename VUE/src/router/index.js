import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import Home from '../views/menu/MenuHomenew2.vue';
import userRoutes from './module/user';
// import Index from '@/views/layout/Layout.vue'
Vue.use(VueRouter);


import Router from 'vue-router';
Vue.use(Router);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
 
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  // {
  //   path: '/',
  //   name: 'Index',
  //   component: Index,
  //   children:[
  //       {
  //         path: '/',
  //         name: 'MenuHomenew',
  //         component: Home,
  //       },
  //   ]
  // },
  {
    path: '/',
    name: 'MenuHomenew2',
    component: Home,
  },
  {
    path: '/0',
    name: 'MenuHomenew2',
    component: Home,
  },

  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  ...userRoutes,
];

const router = new VueRouter({
  mode: 'hash',  //原history
  base: process.env.BASE_URL,
  routes,
});


// 页面权限控制和登陆验证
// router.beforeEach((to, from, next) => {
//   if (to.meta.auth) { // 判断是否需要登录
//     // 判断用户是否登录
//     if (store.state.userModule.token) {
//       // 这里还要判断token 的有效性 比如有没有过期 需要后台发放token 的时候 带上token 的有效期，
//       // 如果 token 无效 需要 请求token
//       next();
//     } else {
//       // 跳转登录
//       router.push({ name: 'login' });
//     }
//   } else {
//     next();
//   }
// });


export default router;
// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap.concat(asyncRouterMap)
// });
