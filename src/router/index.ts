import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
import NProgress from "nprogress";
import HelloWorld from "@/components/HelloWorld.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: HelloWorld,
    children: [],
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "非常抱歉,页面走丢了",
    },
    redirect: "/",
  },
  {
    path: "/:pathMatch(.*)",
    meta: {},
    redirect: "/404",
  },
];

const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

/**
 * @description: 全局路由前置守卫，在进入路由前触发，导航在所有守卫 resolve 完之前一直处于等待中。
 * @param {RouteLocationNormalized} to  即将要进入的目标
 * @param {RouteLocationNormalizedLoaded} from  当前导航正在离开的路由
 * @return {*}
 */
router.beforeEach((to, from) => {
  console.log("全局路由前置守卫：to,from\n", to, from);
  // 设置页面标题
  document.title = (to.meta.title as string) ?? "中汇智慧云教育";
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
});

router.afterEach((to, from) => {
  console.log("全局路由后置守卫：to,from\n", to, from);
  NProgress.done();
});

export default router;
