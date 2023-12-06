import { useActiveWebStateRefs } from "../stores/activeWebState";

export const useSignMessageV4 = () => {
  const { account } = useActiveWebStateRefs();

  const handle = (msgParams: any) => {
    return window.ethereum.request({
      method: "eth_signTypedData_v4",
      params: [account.value, JSON.stringify(msgParams)],
    });
  };

  return handle;
};
