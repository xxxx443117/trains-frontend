<template>
  <div class="funding g-c-page">
    <div class="funding-top">
      <div class="g-c-t-center">
        <div>
          <span class="g-fs16">{{ t("Account_balance") }}(TRT)</span>
        </div>
        <div class="g-mt16 g-c-bold g-fs24">
          <span>6822.064</span>
        </div>
      </div>

      <div class="funding-top-card g-c-card g-mt28">
        <div class="my-top-card">
          <div>
            <div>
              <span class="font-s">1264.46</span>
            </div>
            <div class="g-mt5">
              <span>{{ t("Accumulated_income") }}(TRT)</span>
            </div>
          </div>

          <div>
            <div>
              <span class="font-s">1264.46</span>
            </div>
            <div class="g-mt5">
              <span>{{ t("Accumulated_investment") }}NFT</span>
            </div>
          </div>
          <div>
            <div>
              <span class="font-s">1264.46</span>
            </div>
            <div class="g-mt5">
              <span>{{ t("My_computing_power") }}</span>
            </div>
          </div>

          <div>
            <div class="g-mt25">
              <span class="font-s">12%</span>
            </div>
            <div class="g-mt5">
              <span>{{ t("Total_computing_power") }}(TRT)</span>
            </div>
          </div>
          <div>
            <div class="g-mt25">
              <span class="font-s">1264.46</span>
            </div>
            <div class="g-mt5">
              <span>{{ t("Network_wide_investment") }}NFT</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="funding-stake g-mt30">
      <span class="g-c-bold g-fs24">{{ t("Pledge") }}</span>
      <div class="g-c-center-between g-mt24">
        <span class="g-fs16">{{ t("Remaining") }}NFT:</span>
        <span class="g-c-bold g-fs24">12</span>
      </div>
      <div class="progress g-mt16">
        <div :style="`width: ${progress}%`" class="progress-active"></div>
        <div :style="`width: ${100 - progress}%`" class="progress-inactive"></div>
        <div :style="`left: calc(${progress}% - 2px)`" class="progress-badge"></div>
      </div>
    </div>

    <div>
      <van-button class="pledge g-mt30" type="primary" block>{{ t("Pledge") }}</van-button>
    </div>

    <div class="g-mt30">* 24{{ t("Only_one_pledge_within_an_hour") }}</div>
    <div class="g-mt10">* {{ t("Countdown_to_pledge") }}： 00:00:00</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const progress = ref(80);
const value = ref("");
const stakeItem = [
  {
    value: 0.01,
    label: "1",
    day: 1
  },
  {
    value: 0.011,
    label: "1.1",
    day: 7
  },
  {
    value: 0.02,
    label: "1.2",
    day: 30
  },
  {
    value: 0.04,
    label: "1.4",
    day: 90
  }
];
const stakePeriod = ref(stakeItem[0].day);
</script>

<style scoped lang="less">
.funding {
  padding-top: 10px;

  &-stake {
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

    &-value {
      min-width: 153px;
      height: 52px;
      background: #007173;
      border-radius: 3px;
      margin-top: 18px;

      &.active {
        background: #19b6b8;
      }
    }
  }
}

.pledge {
  background: #19b6b8;
  border-radius: 3px;
  width: 335px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
}

.my-top-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  > div {
    width: 33%;
  }
}

.font-s {
  font-size: 18px;
  font-weight: bold;
}
</style>
