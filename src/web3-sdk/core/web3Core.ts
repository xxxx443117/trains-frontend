import { ethers } from "ethers";

export const getLibrary = (
  provider: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc
): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
// export const signMessage = async (
//   provider: any,
//   account: string,
//   message: string
// ): Promise<string> => {
//   if (window.BinanceChain) {
//     const { signature } = await window.BinanceChain.bnbSign(account, message);
//     return signature;
//   }

//   /**
//    * Wallet Connect does not sign the message correctly unless you use their method
//    * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
//    */
//   if (provider.provider?.wc) {
//     const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message));
//     const signature = await provider.provider?.wc.signPersonalMessage([
//       wcMessage,
//       account,
//     ]);
//     return signature;
//   }

//   return provider.getSigner(account).signMessage(message);
// };

export const signMessageV4 = async (
  provider: any,
  account: string,
  chainId: number,
  types: any,
  message: any
): Promise<string> => {
  const domain = {
    chainId,
    version: import.meta.env.VITE_BASE_SIGN_VERSION
  };
  return provider.getSigner(account)._signTypedData(domain, types, message);
};
