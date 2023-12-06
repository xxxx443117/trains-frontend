<script lang="ts" setup>
interface PropsType {
  show: boolean;
  title: string;
}
const props = withDefaults(defineProps<PropsType>(), {
  show: false, // 默认值
  title: ""
});
interface EmitType {
  (e: "update:show", params: boolean): void;
}
const emit = defineEmits<EmitType>();

const closeHandle = () => {
  emit("update:show", false);
};
</script>
<template>
  <div>
    <van-popup v-model:show="props.show">
      <div class="popup-box">
        <div class="tips">
          <div class="tips-title">{{ title }}</div>
          <div><img src="@/assets/images/common/close.png" alt="" @click="closeHandle" /></div>
        </div>

        <div>
          <slot></slot>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<style scoped lang="less">
.popup-box {
  width: 335px;
  // height: 224px;
  background: #19b6b8;
  border-radius: 7px;
  padding: 20px;

  .tips {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 18px;
      height: 18px;
    }

    .tips-title {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
