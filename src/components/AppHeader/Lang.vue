<template>
  <div class="ewIm" @click.stop="clickLang">
    <img :src="currentLang.logo" alt="" class="img3" />
    <span class="lang-title">{{ currentLang.name }}</span>
    <img
      src="@/assets/images/common/arrow-down.png"
      alt=""
      class="imgtwo3"
      :class="showLang ? 'imgtwo33' : ''"
    />
  </div>
  <div class="lang-dialog" v-if="showLang">
    <div
      class="lang-list g-c-center-between"
      v-for="(item, index) in langList"
      :key="index"
      @click.stop="changeLangHandle(item)"
    >
      <img :src="item.logo" alt="" class="img3" />

      <span>
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { langList, LOCAL_STORAGE_KEY } from "@/lang";

const { locale } = useI18n();
const showLang = ref(false);

console.log(locale, "locale");
const currentLang = computed(() => {
  return langList.filter(item => item.value === locale.value)?.[0] || langList[0];
});
console.log(currentLang, "currentLang");

// 点击更改语言
const clickLang = (): void => {
  showLang.value = !showLang.value;
};
// 更改语言
const changeLangHandle = (item: any): void => {
  locale.value = item.value;
  showLang.value = false;
  sessionStorage.setItem(LOCAL_STORAGE_KEY, item.value);
};

window.addEventListener("click", hideLangShow);
function hideLangShow() {
  if (!showLang.value) return;
  showLang.value = false;
}
</script>

<style scoped lang="less">
.img3 {
  width: 14px;
}
.ewIm {
  // flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  width: 129px;
  height: 30px;
  // background: #080405;
  // border: 1px solid #49448c;
  border-radius: 18px;
  margin-left: 10px;

  .lang-title {
    margin: 0 4px;
  }
  .imgtwo3 {
    width: 7px;
    height: 4px;
    margin-left: 5px;
    transition: transform 0.5s;
  }
  .imgtwo33 {
    transform: rotate(-180deg);
  }
}

.lang-dialog {
  width: 129px;
  background-color: #19b6b8;
  position: absolute;
  top: 50px;
  // left: 50%;
  right: 110px;
  z-index: 111;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
  padding: 6px;
  .lang-list {
    height: 35px;
    line-height: 35px;
    padding: 0 12px;
    text-align: center;
    font-weight: bold;
    &:hover {
      background-color: #43cbcd;
    }
  }
}
</style>
