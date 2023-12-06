<template>
  <div class="list assets-list g-mt16">
    <van-list
      :immediate-check="false"
      v-model:loading="state.loading"
      :finished="state.finished"
      :loading-text="t('Loading')"
      @load="load_more"
    >
      <div class="assets-list-list">
        <div class="assets-list-list-header g-c-card1 g-c-center-between">
          <span>{{ t('Time') }}</span>
          <!-- <span>类型</span> -->
          <span>{{ t('Amount') }}</span>
          <span>{{ t('Status') }}</span>
        </div>
        <div
          v-for="item in state.list"
          :key="item.id"
          class="assets-list-list-item g-c-center-between"
        >
          <span>{{ transTimestampDisplay(item.createdAt) }}</span>
          <!-- <span>{{ getTransferLogType(item.orderType) }}</span> -->
          <span>{{ getServerNumber(item.totalAmount) }}</span>
          <span>{{ getTransferLogState(item.state) }}</span>
        </div>
      </div>
      <div slot="finished" class="g-c-center g-mt16">
        <div v-if="state.finished">
          <div v-if="preview && state.list?.length >= 3">
            <button @click="viewMore" class="g-c-btn-text">
              {{ t("viewMore") }}
            </button>
          </div>
          <span v-else>
            {{ t("noMore") }}
          </span>
        </div>
      </div>
    </van-list>

    <van-popup
      v-model:show="show"
      position="bottom"
      class="assest-com-popup"
      :style="{
        width: '100%',
        background: '#080405',
        borderRadius: '16px 16px 0 0'
      }"
    >
      <div class="pop-content g-c-card-bg">
        <DatetimePicker
          type="date"
          v-model="filter_data.currentData"
          :title="filter_data.active === 0 ? t('starttime') : t('endtime')"
          :confirm-button-text="t('confirm')"
          :cancel-button-text="t('cancel')"
          :min-date="filter_data.minDate"
          visible-item-count="5"
          item-height="36"
          style="background-color: #0d0d2b; color: #fff"
          @change="handleChangeDate"
          @confirm="handleConfirmDate"
          @cancel="handleCancelDate"
        >
          <template v-slot:columns-top>
            <div class="g-c-divider" style="background-color: #ccc"></div>
            <div class="date-picker">
              <div class="g-c-page g-c-center-between select-tips">
                <div>* {{ t("placeSelectBetweenTimeInTenDays") }}</div>
                <div>
                  <van-icon @click="handleDatePickerTips" name="info-o" />
                </div>
              </div>
              <div class="g-c-page g-c-center-around">
                <div
                  @click="handleChangeActive(0)"
                  class="select-date g-c-center"
                  :class="filter_data.active === 0 ? 'active' : ''"
                >
                  {{ dayjs(filter_data.starttime).format("YYYY-MM-DD") }}
                </div>
                <div class="select-center g-c-center">{{ t("fromTo") }}</div>
                <div
                  @click="handleChangeActive(1)"
                  class="select-date g-c-center"
                  :class="filter_data.active === 1 ? 'active' : ''"
                >
                  {{ dayjs(filter_data.endtime).format("YYYY-MM-DD") }}
                </div>
                <div @click="handleResetDate()" class="g-c-btn-text select-reset g-c-center">
                  {{ t("reset") }}
                </div>
              </div>
            </div>
          </template>
        </DatetimePicker>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
// import {
//   formateTimeData,
//   interceptData,
//   formaTinter,
//   interceptData2,
//   transTimestamp,
//   transTimestampDisplay,
// } from "@/utils/commont";
// import { restakedIt, logsItDeposit } from "@/http/currency";
import dayjs from "dayjs";
// import { DatetimePicker, Dialog, Toast } from "vant";
// import { getAssetsTransferLog } from "@/http/apis";
// import { getServerNumber } from "@/utils/formatBalance";
import { getTransferLogState } from "./utils";
import { transTimestampDisplay, transTimestamp } from "@/utils";
import { getServerNumber, useActiveWebStateRefs } from "@/web3-sdk";
import { Dialog } from "vant";
import { Api } from "@/apis";
// const props = defineProps<{
//   preview: boolean;
// }>();

interface ListProps {
  preview?: boolean;
  order_type?: number; // 0:用户转账 10:利息释放 20:本金释放 30:链上提币 40:复投扣款
  transferType?: number; //资金流向:0 接收和转出 1 接收 2 转出
  tokenType?: string; //类型 USDT
  active?: number; //
}
const props = withDefaults(defineProps<ListProps>(), {
  preview: false,
  order_type: 0,
  transferType: 0,
  tokenType: "USDT",
  active: 0
});
const show = ref(false);

const filter_data_default = {
  minDate: new Date(2020, 0, 1),
  currentData: dayjs().subtract(9, "day").toDate(),
  starttime: dayjs().startOf("day").subtract(9, "day").toDate(),
  endtime: dayjs().endOf("day").toDate(),
  active: 0,
  isReset: true
};
const filter_data = reactive({
  ...filter_data_default
});

const handleDatePickerTips = () => {
  Dialog.alert({
    title: t("timePicker"),
    messageAlign: "left",
    message: t("timePickerTips"),
    confirmButtonText: t("IKnow")
  });
};

const handleResetDate = () => {
  filter_data.active = filter_data_default.active;
  filter_data.currentData = filter_data_default.currentData;
  filter_data.starttime = filter_data_default.starttime;
  filter_data.endtime = filter_data_default.endtime;
  filter_data.active = filter_data_default.active;
  filter_data.isReset = filter_data_default.isReset;
  show.value = false;
  tableFn(state.active);
};

const viewMore = () => {
  router.push({
    path: "/assets-page/list",
    query: {
      active: props.active
    }
  });
};

const handleChangeActive = (_active: number) => {
  if (_active === 0) {
    filter_data.endtime = new Date(filter_data.currentData.getTime());
    filter_data.currentData = new Date(filter_data.starttime.getTime());
  } else {
    filter_data.starttime = new Date(filter_data.currentData.getTime());
    filter_data.currentData = new Date(filter_data.endtime.getTime());
  }
  filter_data.active = _active;
};

const handleChangeDate = _data => {
  // debugger
  if (filter_data.active === 0) {
    filter_data.starttime = _data;
  } else {
    filter_data.endtime = _data;
  }
};
const handleCancelDate = _data => {
  // debugger
  state.params.endtime = state.params.endtime
    ? transTimestamp(new Date(state.params.endtime))
    : filter_data_default.endtime;
  state.params.starttime = state.params.starttime
    ? transTimestamp(new Date(state.params.endtime))
    : filter_data_default.starttime;

  show.value = false;
};
const handleConfirmDate = _data => {
  // 结束时间前十天 如果在开始时间之后 说明超出了10天
  // if (dayjs(filter_data.endtime).subtract(10, 'day').isAfter(filter_data.starttime)) {
  //     return Toast(t("placeSelectLessTenDays"));
  // }
  // // 结束时间不能大于开始时间
  // if (dayjs(filter_data.endtime).isBefore(filter_data.starttime)) {
  //     return Toast(t("placeSelectLessTenDays"));
  // }
  show.value = false;
  filter_data.isReset = false;
  tableFn(state.active);
};

const router = useRouter();

const { t } = useI18n();
const { accountLower } = useActiveWebStateRefs();
const state: any = reactive({
  value: 0,
  params: {
    page: 1, // 分页号码，默认1
    size: props.preview ? 3 : 10, // 分页数量，最大20 如果是preview 则只展示3条
    order_type: props.order_type,
    transferType: props.transferType,
    tokenType: props.tokenType
  },
  list: [],
  totalAmount: 0,
  loading: true,
  finished: false
});

// 切换
const tableFn = (index: number) => {
  state.list = [];
  state.finished = false;
  state.value = index;
  state.params.page = 1;
  state.params.type = index + 1;
  getListReward();
};

const load_more = () => {
  state.params.page += 1; //页数+1
  getListReward();
};

const getListReward = () => {
  state.loading = true;

  // state.params.endtime = transTimestamp(new Date(filter_data.endtime));

  // state.params.starttime = transTimestamp(new Date(filter_data.starttime));

  Api.User.getTransferLog({
    ...state.params,
    address: accountLower.value
  })
    .then((res: any) => {
      if (props.preview) {
        state.finished = true;
      }
      if (res.data.code == 0) {
        state.totalAmount = res.data.data.totalAmount;
        if (res.data && res.data.data && res.data.data.list) {
          state.list = state.list.concat(res.data.data.list); //追加数据

          if (!props.preview) {
            if (res.data.data.total <= state.list.length) {
              state.finished = true;
            } else {
              state.finished = false;
            }
          }
        } else {
          state.finished = true;
        }
      } else {
        state.finished = true;
      }
    })
    .catch(() => {
      state.finished = true;
    })
    .finally(() => {
      state.loading = false;
    });
};

getListReward();

// watch( () => props.tokenType, (newValue,oldValue) => {
//   console.log(newValue,oldValue,"val")
//   // debugger
//     // state.params.tokenType = newValue;
//     state.list = [];
//     state.finished = false;
//     state.params.page = 1;
//     getListReward();
//   })
</script>

<style lang="less" scoped>
.assets-list {
  line-height: 1;

  .padding20 {
    padding: 0 20px;
  }
  &-list {
    margin-top: 10px;
    &-header {
      padding: 18px 8px 15px 8px;
    }
    &-item {
      padding: 18px 8px 15px 8px;
    }
  }
}
</style>
