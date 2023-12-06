<template>
  <div>
    <!-- 开启顶部安全区适配 -->
    <!-- <van-nav-bar safe-area-inset-top /> -->

    <!-- 开启深色模式 -->
    <van-config-provider theme="dark" />
    <AppHeader />
    <div class="app-box" :class="route.meta.showTabbar ? 'tabbar-padding' : ''">
      <router-view v-slot="{ Component, route }">
        <!-- <transition
          :css="route.meta.transition !== 'default'"
          :name="(route.meta.transition as string)"
        > -->
        <component :is="Component" :key="route.path" />
        <!-- </transition> -->
      </router-view>
    </div>
    <van-tabbar v-if="route.meta.showTabbar" route class="app-tabbar">
      <van-tabbar-item replace :to="item.path" icon="user-o" v-for="item in tabbarList">
        <span>{{ t(item.label) }}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeIcon : item.icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { useRoute, useRouter } from "vue-router";
import AppHeader from "./components/AppHeader/Header.vue";
import home from "@/assets/images/tabbar/home.png";
import homeActive from "@/assets/images/tabbar/home-a.png";
import mine from "@/assets/images/tabbar/mine.png";
import mineActive from "@/assets/images/tabbar/mine-a.png";
import funding from "@/assets/images/tabbar/funding.png";
import fundingActive from "@/assets/images/tabbar/funding-a.png";
import nft from "@/assets/images/tabbar/nft.png";
import nftActive from "@/assets/images/tabbar/nft-a.png";
import { isAddress } from "./web3-sdk/utils/contract";
import { INVITE_ADDRESS_STORAGE_KEY } from "./utils/config";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
const { t, locale } = useI18n();



const tabbarList = [
  {
    label: "Homepage",
    path: "/",
    activeIcon: home,
    icon: homeActive
  },
  {
    label: "Investment",
    path: "/funding",
    activeIcon: funding,
    icon: fundingActive
  },
  {
    label: "NFT",
    path: "/nft",
    activeIcon: nft,
    icon: nftActive
  },
  {
    label: "My",
    path: "/mine",
    activeIcon: mine,
    icon: mineActive
  }
];

const router = useRouter();
const route = useRoute();

router.afterEach((to, from) => {
  const toDepth = (to as any).meta?.depth ?? 0;
  const fromDepth = (from as any).meta?.depth ?? 0;

  if (
    // !from.name ||
    // (to.meta.showTabbar === from.meta.showTabbar && from.meta.showTabbar === true)
    toDepth === fromDepth // 同一级不显示动画
  ) {
    to.meta.transition = "default";
  } else {
    to.meta.transition = toDepth < fromDepth ? "slide-right" : "slide-left";
  }
});

if (route.query.i && isAddress(route.query.i)) {
  window.localStorage.setItem(INVITE_ADDRESS_STORAGE_KEY, String(route.query.i));
}

watch(() => locale.value, (newValue, oldValue) => {
  if (locale.value == "zh") {
    document.title = "trains-AI技术驱动WEB3投资"
  } else {
    document.title = "trains-AI technology drives WEB3 investment"
  }
})

</script>

<style scoped lang="less">
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  width: 100vw;
  position: absolute;
}

.slide-right-leave-to {
  transform: translateX(100%);
  width: 100vw;
  position: absolute;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
  width: 100vw;
  position: absolute;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  width: 100vw;
  position: absolute;
}

.app-box {
  min-height: 100vh;
  box-sizing: border-box;

  &.tabbar-padding {
    padding-bottom: 70px;
  }
}

.app-tabbar {
  // border-radius: 30px 30px 0 0;
  overflow: hidden;

  &:after {
    border: none;
  }
}
</style>
