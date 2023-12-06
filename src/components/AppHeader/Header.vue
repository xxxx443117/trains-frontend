<template>
  <div v-if="HEADER_TYPE.MENU === routerMeta.type" class="app-header g-c-center-between"
    :class="`header-bg_${routerMeta.headerBg}`">
    <div class="app-header-left">
      <AppMenu />
    </div>
    <!-- <div>
      <img v-if="!routerMeta.title" class="app-header-logo" src="@/assets/newVersion/hum.png" alt="bird" />
      <div class="g-c-text-md g-c-bold g-c-text-value" v-else>
        {{ t(`${routerMeta.title || ""}`) }}
      </div>
    </div> -->
    <div class="g-c-center">
      <Lang />
      <div class="app-header-wallet g-c-center g-c-text-value">
        <van-button v-if="shortAccount" @click="connectWalletHandle" class="wallet-btn g-fs12" size="mini">{{ shortAccount
        }}</van-button>
        <van-button size="mini" v-else @click="connectWalletHandle" class="wallet-btn g-fs12">{{
          t("Link_Wallet")
        }}</van-button>
      </div>
    </div>
  </div>
  <AppTitle v-if="HEADER_TYPE.BACK === routerMeta.type" />
  <div v-if="!routerMeta.headerBg" class="top-bg-wrap">
    <div class="top-bg"></div>
  </div>
</template>

<script setup lang="ts">
import { HEADER_TYPE } from "@/types";
import { useRouter } from "vue-router";
import { computed, watch } from "vue";
import { connectWallet, useActiveWebStateRefs } from "@/web3-sdk";
import Lang from "./Lang.vue";
import AppMenu from "./Menu.vue";
import AppTitle from "./Title.vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { shortAccount } = useActiveWebStateRefs();
const router = useRouter();

const connectWalletHandle = async () => {
  await connectWallet();
};
watch(shortAccount, value => {
  console.log(value, "shortAccount");
});

const routerMeta = computed(() => router.currentRoute.value?.meta || {});
</script>

<style scoped lang="less">
.app-header {
  display: flex;
  width: 100%;
  height: 60px;
  position: sticky;
  top: 0px;
  padding: 20px;
  z-index: 99;
  background-image: url("@/assets/images/common/top-bg.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #005759;

  &.header-bg_default {
    background-color: #006a6c;
  }

  &-left {
    flex: 1;
  }

  &-logo {
    width: 123px;
    height: auto;
  }

  &-wallet {

    // margin-left: 10px;
    .wallet-btn {
      padding: 0;
      height: 24px;
      width: 76px;
      font-weight: 200;
    }
  }
}

.top-bg-wrap {
  position: absolute;
  width: 100%;
  height: 209px;
  overflow: hidden;
  top: 0;
  z-index: -1;
}

.top-bg {
  // background-color: #005759;
  // background-position-y: -60px;
  // background-color: red;
  height: 209px;
  width: 200%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-left: -50%;
  z-index: -1;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50vw;
    background-image: url("@/assets/images/common/top-bg.png");
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #005759;
  }
}
</style>
