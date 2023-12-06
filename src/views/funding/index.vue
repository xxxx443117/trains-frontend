<template>
  <div class="funding g-c-page">
    <div class="funding-top">
      <div class="g-c-t-center">
        <div>
          <span class="g-fs16">{{ t("Account_balance") }}(USDT)</span>
        </div>
        <div class="g-mt16 g-c-bold g-fs24">
          <span>{{ getFullDisplayBalance(userInfo.totalBalance || 0) }}</span>
        </div>
      </div>
      <div class="funding-top-card g-c-card g-mt28">
        <div class="g-c-center-between">
          <div @click="$router.push('/funding/record')">
            <div>
              <span>{{ getFullDisplayBalance(userMap?.stakingTotal || 0) }}</span>
            </div>
            <div class="g-mt13">
              <span>{{ t("My_investment_amount") }}</span>
              <van-icon name="play" />
            </div>
          </div>
          <div @click="$router.push('/funding/income')">
            <div>
              <span>{{ incomeRate }}%</span>
            </div>
            <div class="g-mt13">
              <span>{{ t("My_return_rate") }}</span>
              <van-icon name="play" />
            </div>
          </div>
          <div>
            <div>
              <span>{{ getServerNumber(apiData?.stakingStats?.totalStakingAmount || 0) }}</span>
            </div>
            <div class="g-mt13">
              <span>{{ t("Total_investment_of_the_entire_network") }}</span>
              <!-- <van-icon name="play" /> -->
            </div>
          </div>
        </div>
        <div class="g-mt24" @click="investmentFn">
          <van-button block>{{ t("My_investment_income") }}</van-button>
        </div>
      </div>
    </div>
    <div class="funding-stake g-mt30">
      <span class="g-c-bold g-fs24">{{ t("Investment_method") }}</span>
      <div class="g-c-center-between g-mt24">
        <span class="g-fs16">{{ t("Available_balance") }}</span>
        <span class="g-c-bold g-fs24">{{ getFullDisplayBalance(allBalance.USDT) }}</span>
      </div>
      <!-- <div class="progress g-mt16">
        <div :style="`width: ${progress}%`" class="progress-active"></div>
        <div :style="`width: ${100 - progress}%`" class="progress-inactive"></div>
        <div :style="`left: calc(${progress}% - 2px)`" class="progress-badge"></div>
      </div> -->
      <Progress class="g-mt16" :progress="userInfo.availableProgress" />
      <div class="g-mt24">
        <!-- <span class="g-c-bold g-fs24">{{ t("Investment_method") }}</span> -->
        <div class="g-mt16">
          <van-cell-group inset>
            <van-field v-model="stakeAmount" :label="t('Please_enter_the_quantity')" placeholder="0"
              class="funding-stake-field" />
          </van-cell-group>
        </div>
        <div class="g-mt13">
          <div>
            * {{ getFullDisplayBalance(stakeConfig?.minStaking || 0) }}U{{ t("Starting_from") }}，{{
              t("Highest")
            }}{{ getFullDisplayBalance(stakeConfig?.maxStaking || 0) }}U
          </div>
          <div class="g-mt11">*{{ t("Remaining_amount") }}: - -</div>
        </div>
      </div>
      <div class="g-mt30">
        <div>{{ t("Time_selection") }}（{{ t("Days") }}）</div>
        <div class="g-mt10 g-c-center-between g-c-flex-wrap">
          <div class="funding-stake-value g-c-center g-c-column" v-for="item in stakeItem" :key="item.value"
            @click="stakePeriod = item.day" :class="{ active: item.day === stakePeriod }">
            <div>{{ item.day }}{{ t("Days") }}</div>
            <div>({{ item.label }}%{{ t("Daily_income") }}）</div>
          </div>
        </div>
      </div>
      <div>
        <van-button @click="confirmHandle" class="g-mt35" block>{{
          t("Immediate_investment")
        }}</van-button>
        <van-button @click="$router.push('/funding/record')" type="primary" class="g-mt16" block>{{
          t("Investment_Details")
        }}</van-button>
      </div>
    </div>
    <div class="g-mt52">
      <span class="g-c-bold g-fs24">{{ t("invest_to") }}</span>
      <div class="g-mt35">
        <span class="g-fs16">{{ t("Mature_principal") }}</span>
      </div>
      <div class="g-mt16">
        <van-cell-group inset>
          <van-field readonly v-model="claimAmount" label="" placeholder="0">
            <template #button>
              <van-button style="width: 91px; height: 40px; margin-right: -8px" size="small">{{
                t("Claim")
              }}</van-button>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="g-mt54"></div>
    </div>
  </div>
  <Popups v-model:show="show" :title="t('Confirm')">
    <div class="g-mt30 g-c-center-between">
      <div>{{ t("Investment_amount") }}:</div>
      <div>{{ stakeAmount }} UDST</div>
    </div>
    <div class="g-mt16 g-c-center-between">
      <div>{{ t("Lockout_time") }}:</div>
      <div>{{ stakePeriod }} {{ t("sky") }}</div>
    </div>
    <van-button v-if="isAllowance" @click="onStake" class="g-mt32" block>{{ t("invest_now") }}</van-button>
    <van-button v-else @click="onApprove" class="g-mt32" block>{{ t("Authorization") }}</van-button>
  </Popups>
</template>

<script setup lang="ts">
import {
  addresses,
  connectWallet,
  getAddress,
  getBalanceAmount,
  getDecimalAmount,
  getFullDisplayBalance,
  getServerNumber,
  getSingerContract,
  getUSDTStakingPoolContract,
  useActiveWebStateRefs,
  useAllTokenBalance,
  useApproveToken,
  useTokenAllowance
} from "@/web3-sdk";
import { computed, ref, watch } from "vue";
import Popups from "@/components/Popups.vue";
import Progress from "@/components/Progress/index.vue";
import { showFailToast, showLoadingToast, showSuccessToast, showToast } from "vant";
import BigNumber from "bignumber.js";
import { constants } from "ethers";
import { useRouter } from "vue-router";
import { Api } from "@/apis";
import { reactive } from "vue";
import { usdtStakes } from "@/utils/config";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const { account, accountLower } = useActiveWebStateRefs();
const { allBalance } = useAllTokenBalance();
const { allowance, fetchHandle: fetchAllowanceHandle } = useTokenAllowance(
  getAddress(addresses.USDTStakingPool)
);
const { approveHandle } = useApproveToken();

const stakeAmount = ref("");
const claimAmount = ref("");
const stakeItem = [usdtStakes[7], usdtStakes[30], usdtStakes[90]];
const stakePeriod = ref(stakeItem[0].day);

const show = ref(false);

const userMap = ref<{
  lastStakingTime: string;
  stakingTotal: string;
  superior: string;
}>(null);
const fetchUserMap = async () => {
  if (!account.value) {
    userMap.value = null;
    return;
  }
  const contract = getUSDTStakingPoolContract();
  const res = await contract.userMap(account.value);
  userMap.value = {
    lastStakingTime: res.lastStakingTime.toString(),
    stakingTotal: res.stakingTotal.toString(),
    superior: res.superior
  };

  console.log(res);
};
const investmentFn = () => {
  router.push({ path: "/funding/income" });
}
fetchUserMap();

watch(account, () => {
  fetchUserMap();
});

const stakeConfig = ref<{
  minStaking: string; // 最小投资额度
  maxStaking: string; // 最大投资额度
}>(null);
const fetchStakeConfig = async () => {
  const contract = getUSDTStakingPoolContract();
  const minStaking = await contract.minStaking();
  const maxStaking = await contract.maxStaking();

  console.log(minStaking, maxStaking);
  stakeConfig.value = {
    minStaking: minStaking.toString(),
    maxStaking: maxStaking.toString()
  };
};
fetchStakeConfig();

const userInfo = computed(() => {
  const totalBalance = new BigNumber(userMap?.value?.stakingTotal || 0).plus(allBalance.USDT);
  return {
    totalBalance,
    availableProgress: new BigNumber(allBalance.USDT).div(totalBalance).times(100).toNumber()
  };
});

const confirmHandle = () => {
  if (!account.value) {
    connectWallet();
    return;
  }
  if (!userMap?.value?.superior || userMap.value?.superior === constants.AddressZero) {
    showToast(t("Pledge_can_only_be_made_after_binding_with_superiors"));
    return;
  }
  if (!stakeAmount.value) {
    showToast(t("Please_enter_the_pledge_amount"));
    return;
  }
  if (!new BigNumber(stakeAmount.value).isFinite()) {
    showToast(t("Please_enter_the_correct_pledge_amount"));
    return;
  }
  // 只能输入18位小数
  if (!/^[0-9]*[.,]?[0-9]{0,18}$/.test(stakeAmount.value)) {
    showToast("USDT只支持18位小数");
    return;
  }
  if (
    new BigNumber(stakeAmount.value).isLessThan(getBalanceAmount(stakeConfig.value?.minStaking)) ||
    new BigNumber(stakeAmount.value).isGreaterThan(getBalanceAmount(stakeConfig.value?.maxStaking))
  ) {
    showToast(t("Exceeding_the_pledge_limit"));
    return;
  }

  if (new BigNumber(stakeAmount.value).isGreaterThan(getBalanceAmount(allBalance.USDT))) {
    showToast(t("Insufficient_balance"));
    return;
  }
  show.value = true;
};

const isAllowance = computed(() => {
  return new BigNumber(stakeAmount.value).isLessThanOrEqualTo(getBalanceAmount(allowance.USDT));
});

const onApprove = async () => {
  const toast = showLoadingToast({
    duration: 0,
    forbidClick: true
  });
  try {
    await approveHandle(getAddress(addresses.USDTToken), getAddress(addresses.USDTStakingPool));
    fetchAllowanceHandle();
  } finally {
    toast.close();
  }
};
const onStake = async () => {
  const toast = showLoadingToast({
    duration: 0,
    forbidClick: true
  });
  try {
    const contract = getSingerContract(getUSDTStakingPoolContract);

    const tx = await contract.deposit(
      getDecimalAmount(stakeAmount.value).toString(),
      stakePeriod.value,
      {}
    );
    await tx.wait();
    showSuccessToast(t("Successful_investment"));
    show.value = false;
  } catch (error: any) {
    console.error(error);
    if (error.reason || error.data?.message || error.message) {
      return showFailToast(error.reason || error.data?.message || error.message);
    } else {
      return showFailToast(t("Investment_failure"));
    }
  } finally {
    toast.close();
  }
};

// API 数据
const apiData = reactive<{
  userAssets: Api.User.AccountAssets;
  stakingStats: Api.Staking.GlobalStakingStats;
}>({
  userAssets: null,
  stakingStats: null
});
const fetchData = () => {
  if (!accountLower.value) return;
  // 获取用户信息
  Api.User.getAccountAsset(accountLower.value)
    .then(res => {
      console.log(res);
      apiData.userAssets = res.data;
    })
    .catch(console.error);

  //
  Api.Staking.getGlobalStakingStats()
    .then(res => {
      console.log(res);
      apiData.stakingStats = res.data;
    })
    .catch(console.error);
};

watch(
  account,
  () => {
    fetchData();
  },
  {
    immediate: true
  }
);

const incomeRate = computed(() => {
  const rate = (apiData?.userAssets?.totalPowerValue / apiData?.userAssets?.totalMinedAmount) * 100;

  if (rate) return rate.toFixed(2);
  return "0";
});
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
        background: #47dfe1;
      }
    }

    &-field {
      & /deep/ input {
        font-size: 20px;
      }
    }
  }
}
</style>
