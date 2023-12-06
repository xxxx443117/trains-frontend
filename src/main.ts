import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createPinia } from "pinia";
import "lib-flexible";
import vant, { ConfigProvider } from "vant";
import "vant/lib/index.css";
import { createApp } from "vue";
import "@/assets/less/index.less";

import App from "./App.vue";
import router from "./router";
import i18n from "./lang";
import { eagerConnect } from "./web3-sdk";
import Vue3Marquee from 'vue3-marquee'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(Vue3Marquee);
app.use(pinia);
app.use(i18n);
app.use(router);
app.use(vant);
app.use(ConfigProvider);

eagerConnect();

app.mount("#app");
