import { balanceTokens } from "../tokens";
import { useActiveWebStateRefs } from "../stores/activeWebState";
import { getBep20Contract } from "../utils/contractHelpers";
import { simpleRpcProvider } from "../utils/providers";
import BigNumber from "bignumber.js";
import { reactive, watch } from "vue";
import { maxUint256 } from "../utils/bigNumber";

export const initTokenValue = <T>(_default: T): { [symbol: string]: T } => {
  const _init_value = {};
  balanceTokens.forEach(item => {
    _init_value[item.symbol] = _default;
    _init_value[item.address] = _default;
  });
  return _init_value;
};

export const useAllTokenBalance = () => {
  const { account } = useActiveWebStateRefs();

  const allBalance = reactive<{ [symbol: string]: BigNumber }>(initTokenValue(new BigNumber(0)));

  const fetchHandle = async () => {
    const res = await Promise.all(
      balanceTokens.map(item => {
        if (item.isETHER()) {
          return simpleRpcProvider.getBalance(account.value);
        }
        return getBep20Contract(item.address).balanceOf(account.value);
      })
    );
    balanceTokens.forEach((item, index) => {
      console.log(res);
      allBalance[item.symbol] = new BigNumber(res[index].toJSON().hex);
      allBalance[item.address] = new BigNumber(res[index].toJSON().hex);
    });
  };

  watch(
    account,
    value => {
      if (value) {
        fetchHandle();
      }
    },
    {
      immediate: true
    }
  );
  return {
    allBalance,
    fetchHandle
  };
};

export const useTokenAllowance = (address: string) => {
  const { account } = useActiveWebStateRefs();

  const allowance = reactive<{ [symbol: string]: BigNumber }>(initTokenValue(new BigNumber(0)));
  const fetchHandle = async () => {
    const res = await Promise.all(
      balanceTokens.map(item => {
        if (item.isETHER()) {
          return new BigNumber(maxUint256.toString());
        }
        return getBep20Contract(item.address).allowance(account.value, address);
      })
    );
    balanceTokens.forEach((item, index) => {
      allowance[item.symbol] = BigNumber(res[index].toJSON().hex);
      allowance[item.address] = BigNumber(res[index].toJSON().hex);
    });
  };

  watch(
    account,
    value => {
      if (value) {
        fetchHandle();
      }
    },
    {
      immediate: true
    }
  );

  return {
    allowance,
    fetchHandle
  };
};

export const useApproveToken = () => {
  const { library, account } = useActiveWebStateRefs();

  const approveHandle = async (address: string, sender: string) => {
    if (!account.value) return;
    const contract = getBep20Contract(address, library.value?.getSigner());
    const tx = await contract.approve(sender, maxUint256.toString());
    const receipt = await tx.wait(); // 等待链上确认
    return receipt;
  };

  return {
    approveHandle
  };
};
