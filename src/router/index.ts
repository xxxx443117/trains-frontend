import { HEADER_TYPE } from "@/types";
import { createRouter, createWebHistory } from "vue-router";

let routes = [
  {
    path: "/",
    name: "home",
    meta: {
      showTabbar: true,
      type: HEADER_TYPE.MENU,
      headerBg: "default"
    },
    component: () => import("@/views/home/index.vue")
  },
  {
    path: "/funding",
    name: "funding",
    meta: {
      showTabbar: true,
      type: HEADER_TYPE.MENU
    },
    component: () => import("@/views/funding/index.vue")
  }
];
const testRoutes = [
  {
    path: "/faucet-smart",
    name: "faucet-smart",
    meta: {
      showTabbar: true,
      type: HEADER_TYPE.MENU
    },
    component: () => import("@/views/faucet-smart.vue")
  }
];

if (import.meta.env.VITE_BASE_MODE === "TEST") {
  routes = routes.concat(testRoutes);
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
