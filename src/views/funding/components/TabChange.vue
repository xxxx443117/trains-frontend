<template>
  <div class="tab-change" :class="{ preview: props.preview }">
    <van-tabs v-model:active="state.active" @change="tableFn" shrink>
      <van-tab v-for="(item, index) in tabs" :key="item.order_type">
        <template #title>
          <span :class="{ activeTab: state.active === index }">{{ t(item.title) }}</span>
        </template>
        <div>
          <List :preview="props.preview" :order_type="item.order_type" :transferType="Number(item.transferType || 0)"
            :tokenType="item.tokenType" :active="index" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import List from "./list.vue";
import { useRoute, useRouter } from "vue-router";
import { tabsConfig } from "./datas";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const tabs = reactive(tabsConfig);
interface ListProps {
  preview?: boolean;
  defaultActive?: number;
}

const props = withDefaults(defineProps<ListProps>(), {
  defaultActive: 0,
  preview: false
});
const state = reactive({
  active: props.defaultActive
});

const tableFn = (e: number) => {
  state.active = e;
  if (!props.preview) {
    router.replace({
      ...route,
      query: {
        ...route.query,
        active: e
      }
    });
  }
};
</script>
<style scoped lang="less">
.tab-change {
  width: 346px;
  margin: auto;
  background: transparent;

  &.preview {
    background: #00797b;
  }

  padding-top: 32px;
  flex: 1;

  // padding: 32px 20px 0;
  .activeTab {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
