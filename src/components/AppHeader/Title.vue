<template>
  <div class="app-header-title g-c-center-between">
    <div class="app-header-title-left">
      <img
        @click="backHandle"
        class="app-header-title-left-img"
        src="@/assets/images/common/arrow-right.png"
        alt=""
      />
    </div>
    <div class="g-fs20 g-fw5 g-c-text-value">
      {{ title || t(`${routerMeta.title || ""}`) }}
    </div>
    <div class="app-header-title-right">
      <slot></slot>
      <Filter @click="filterHandle" v-if="filter" />
      <div @click="linkHandle" v-if="routerMeta.rightLink">
        {{ t(`${routerMeta.rightTitle || ""}`) }}
        <img class="right-icon" :src="routerMeta.rightIcon" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Filter from "./Filter.vue";
const attrs = useAttrs();

defineProps<{
  title?: string;
  filter?: boolean;
}>();
const { t } = useI18n();

const fromFather = defineEmits(["onFilter", "onBack"]);
const filterHandle = (): void => {
  fromFather("onFilter");
};

const router = useRouter();
const routerMeta: any = computed(() => router.currentRoute.value?.meta || {});
const backHandle = (): void => {
  // console.log(document.referrer)
  // 点击返回键的时候 如果返回的是本网站 则调用back函数,如果不是,跳转到首页

  if (typeof attrs.onOnBack === "function") {
    fromFather("onBack");
  } else {
    router.back();
  }

  // console.log(document.referrer)
  // if (!document.referrer) {
  //   router.push({path:'/'}); // 跳转到首页
  // } else {
  //   router.back();
  // }
};
const linkHandle = (): void => {
  router.push(routerMeta.value.rightLink);
};
</script>

<style scoped lang="less">
.app-header-title {
  display: flex;
  width: 100%;
  height: 60px;
  position: sticky;
  top: 0px;
  padding: 20px 20px 20px 20px;
  z-index: 99;

  background-image: url("@/assets/images/common/top-bg.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #005759;
  &-left {
    width: 50px;
    &-img {
      width: 9px;
      transform: rotateZ(180deg);
    }
  }
  &-right {
    min-width: 50px;
    text-align: right;
    white-space: nowrap;
    .right-icon {
      width: 20px;
    }
  }
}
</style>
