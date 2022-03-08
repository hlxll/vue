import Home from "./components/TrabsitionCom.vue";
import Login from "./components/Login/loginIndex.vue";
import { createRouter, createWebHashHistory } from "vue-router";
//hash模式只改变#后面的，不会传入服务器，但是对SEO不友好，history不会
const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: {
      default: Home,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior() {
    // 始终滚动到100位置
    // return { top: 100 }
    return new Promise((resolve) => {
      //一定时间之后再滚动
      setTimeout(() => {
        resolve({ left: 0, top: 100 });
      }, 500);
    });
  },
});
router.beforeEach((to) => {
  console.log(to.meta);
  //通过在路由定义中定义meta，然后在路由守卫中获取meta，判断这个路由是否特别定义
  //比如在判断一个路由不同用户权限时候，通过meta知道这个路由需不需要分不同用户权限，
  //然后加上用户权限判断这个路由能不能进入
});
export default router;
