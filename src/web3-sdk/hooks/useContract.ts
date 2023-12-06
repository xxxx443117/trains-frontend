import { computed } from "vue";
import { useActiveWebStateRefs } from "../stores/activeWebState";
import { getBep20Contract } from "../utils/contractHelpers";
import { Contract, ethers } from "ethers";

// 需要链上交互 这样获取合约
export const useBep20Contract = (address: string) => {
  const { library } = useActiveWebStateRefs();

  return computed(() => {
    return getBep20Contract(address, library?.value?.getSigner());
  });
};

export const getSingerContract = (
  getHandler: (signer?: ethers.Signer | ethers.providers.Provider) => Contract
) => {
  const { library } = useActiveWebStateRefs();
  return getHandler(library?.value?.getSigner());
};
