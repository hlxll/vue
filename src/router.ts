import App from "./views/App.vue";
import AppChild from "./views/AppChild.vue";

import Login from "./components/Login/loginIndex.vue";
import LoginA from "./components/Login/child/loginA.vue";
import LoginB from "./components/Login/child/loginB.vue";
import wbComponent from "./views/wbComponent.vue";

import SlotVue from "./components/slot/slotIndex.vue";
import { createRouter, createWebHashHistory } from "vue-router";
//hash模式只改变#后面的，不会传入服务器，但是对SEO不友好，history不会
const routeList = [
  {
    path: "/",
    // redirect: '/login'
    // redirect: { name: 'login' }
    redirect: (to) => {
      // 方法接收当前目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: "/login", query: { q: to.params.searchText } };
    },
  },
  {
    path: "/wb",
    component: wbComponent,
  },
  {
    path: "/app",
    component: App,
    children: [
      {
        path: "home",
        component: AppChild,
      },
    ],
  },
  {
    //在参数后面加一个正则，和下面的路由一样的定义，加个正则，，当参数符合正则使用这个，不符合使用后一个
    path: "/app/:slot(\\d+)",
    name: "appChild",
    component: SlotVue,
  },
  {
    //加一个 + 表示这个参数可以重复出现多次，如果是 * 表示可以0或多次 ？表示0或1个
    path: "/slot/:slot+",
    component: SlotVue,
  },
  {
    //路由学习主要界面
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "moreView",
        components: {
          default: LoginA,
          LoginB,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routeList,
  scrollBehavior() {
    // 始终滚动到100位置
    // return { top: 100 };
    return new Promise((resolve) => {
      //一定时间之后再滚动
      setTimeout(() => {
        resolve({ left: 0, top: 100 });
      }, 500);
    });
  },
});
router.beforeEach((to, from, next) => {
  console.log(to.meta);
  //通过在路由定义中定义meta，然后在路由守卫中获取meta，判断这个路由是否特别定义
  //比如在判断一个路由不同用户权限时候，通过meta知道这个路由需不需要分不同用户权限，
  //然后加上用户权限判断这个路由能不能进入
  next(); //路由守卫，一定要执行next，让路由到下一步去，不然路由停止
});
export default router;
