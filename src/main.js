import Vue from 'vue'
// import App from './App.vue'
import * as VueRouter from 'vue-router'
import routes from './router'

// const route = VueRouter.createRouter({
//     history: VueRouter.createWebHashHistory(),
//     routes: routes,
// })
// App.use(route)
// createApp(App).mount('#app')


const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

// 5. 创建并挂载根实例
const app = Vue.createApp({})
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

app.mount('#app')