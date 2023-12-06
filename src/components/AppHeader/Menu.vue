<template>
  <div @click="show = true">
    <img class="app-menu-btn" src="@/assets/images/menu/menu.png" alt="" />
  </div>
  <van-popup closeable v-model:show="show" position="left" teleport="body" :style="{
    height: '100%',
    width: '280px',
    background: '#01888A',
    color: '#ffffff'
  }" :overlay-style="{
  background: 'rgba(0, 0, 0, 0.3)'
}">
    <div class="app-menu">
      <div class="app-menu-logo g-c-center-start">
        <img class="app-menu-logo-icon" src="@/assets/images/logo/logo.png" alt="logo" />
      </div>
      <div class="app-menu-content">
        <div v-for="(item, index) in menuConfig" :key="index" @click.stop="chooseClick(item, index)">
          <div class="content-box" :class="{ active: stateIndex == index, open: stateIndex == index && item.child }">
            <div class="content-box-item g-c-center-between">
              <div class="content-box-item-title g-c-center">
                <img class="item-icon" :src="item.icon" alt="" srcset="" />
                <span class="g-c-text-sm">{{ t(item.name) }}</span>
              </div>
              <img v-if="item.child" src="@/assets/images/common/arrow-right.png" alt="" class="content-box-item-arrow"
                :class="{ open: stateIndex == index }" />
              <!-- <img src="@/assets/newVersion/re.png" alt="" class="img-rotate" v-if="!item.child" /> -->
            </div>

            <div v-if="stateIndex == index && item.child" class="content-box-subitem">
              <div v-for="(subItem, subIndex) in item.child" :key="subIndex" @click="secondary(subItem.path)"
                class="content-box-item">
                <div>
                  <!-- <img class="item-icon" :src="subItem.icon" alt="" /> -->
                  <span>{{ t(subItem.name) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useRouter } from "vue-router";
import { menuConfig } from "./menuConfig";
import { useI18n } from "vue-i18n";
import { showToast } from "vant";
// import { Toast } from "vant";

const router = useRouter();
const statusImg = ref(false);
const show = ref(false);
const stateIndex = ref();
const { t } = useI18n();

const chooseClick = (item: any, index: number): void => {
  if (item.child) {
    if (stateIndex.value === index) {
      stateIndex.value = -1;
    } else {
      stateIndex.value = index;
    }
  }

  if (item.external) {
    window.open(item.path);
    return;
  }
  if (item.soon) {
    showToast(t("Coming soon!"));
    return;
  }
  if (item.path) {
    statusImg.value = false;
    router.push({ path: item.path });
    show.value = false;
  }
};
const secondary = path => {
  router.push({ path: path });
  show.value = false;
};
</script>

<style scoped lang="less">
.app-menu-btn {
  width: 20px;
}

.app-menu {
  &-logo {
    padding: 24px 20px 20px;
    background-image: url(@/assets/images/menu/top-bg.png);
    background-repeat: no-repeat;
    background-size: 100%;
    height: 181px;

    &-icon {
      width: 123px;
      height: auto;
    }
  }

  &-content {
    margin-top: 16px;

    // padding: 0 20px;
    .content-box {
      padding: 0 20px;
      transition: all 0.3s;
      max-height: 48px;

      &.open {
        max-height: 500px;
      }

      &.active {
        background: #00797b;
      }

      .item-icon {
        width: 18px;
        margin-right: 10px;
      }

      &-item {
        line-height: 48px;
        height: 48px;
        width: 100%;

        &-arrow {
          width: 7px;
          transition: all 0.3s;

          &.open {
            transform: rotate(90deg);
          }
        }
      }

      &-subitem {
        padding: 0 20px;
      }
    }
  }

  &-item {
    // line-height: 48px;
    height: 48px;

    &-icon {
      width: 18px;
      margin-right: 10px;
    }
  }
}
</style>
