<template>
  <div class="progress">
    <div :style="`width: ${progress}%`" class="progress-active"></div>
    <div :style="`width: ${100 - progress}%`" class="progress-inactive"></div>
    <div :style="`left: calc(${progress}% - 2px)`" class="progress-badge"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ progress: number }>();
</script>

<style scoped lang="less">
.progress {
  height: 10px;
  // background-color: red;
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  &-active {
    height: 100%;
    background-color: #52c8c9;
    position: absolute;
    left: 0;
    top: 0;
  }
  &-inactive {
    height: 100%;
    background: linear-gradient(to right, #b5c836, #dae39b);
    position: absolute;
    right: 0;
    top: 0;
  }
  &-badge {
    width: 5px;
    height: 100%;
    background-color: #01888a;
    position: absolute;
    transform: skew(-20deg);
  }
}
</style>
