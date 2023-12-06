<template>
  <div class="g-c-page">
    <div class="g-fs20">{{ t("Faucet") }}</div>
    <div class="g-mt32">USDT{{ t("Balance") }}: {{ getFullDisplayBalance(allBalance.USDT) }}</div>
    <div class="g-mt16">
      <van-button @click="mintHandle">{{ t("Casting") }}USDT</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  addresses,
  connectWallet,
  getAddress,
  getBep20Contract,
  getDecimalAmount,
  getFullDisplayBalance,
  getSingerContract,
  useActiveWebStateRefs,
  useAllTokenBalance
} from "@/web3-sdk";
import { showLoadingToast } from "vant";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { allBalance, fetchHandle } = useAllTokenBalance();
const { account } = useActiveWebStateRefs();

// 铸造
const mintHandle = async () => {
  if (!account.value) {
    connectWallet();
    return;
  }
  const toast = showLoadingToast({
    duration: 0,
    forbidClick: true
  });
  try {
    const contract = getSingerContract(_singer =>
      getBep20Contract(getAddress(addresses.USDTToken), _singer)
    );
    const tx = await contract.mint(account.value, getDecimalAmount(100000).toString(), {});
    await tx.wait();
    fetchHandle();
  } finally {
    toast.close();
  }
};
</script>

<style scoped></style>
