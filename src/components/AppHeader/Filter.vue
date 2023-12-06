<template>
  <div @click="clickHandle" class="app-header-filter g-c-center-between">
    <!-- <img
      class="app-header-filter-img"
      src="@/assets/filter.png"
      alt=""
      srcset=""
    /> -->
    <span>{{ t("filter") }}</span>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const fromFather = defineEmits(["click"]);

const clickHandle = (): void => {
  fromFather("click");
};
</script>

<style scoped lang="less">
.app-header-filter {
  &-img {
    width: 16px;
    height: auto;
    margin-right: 6px;
  }
}
</style>
