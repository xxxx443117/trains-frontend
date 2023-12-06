import type { ethers } from "ethers";
import { defineStore, storeToRefs } from "pinia";
import { shortenAddress } from "../utils/contract";
import type { ConnectorNames } from "../wallet/types";
import { getActiveLibrary } from "../core/web3";
import { simpleRpcProvider } from "../utils/providers";
import { BASE_CHAIN_ID } from "../constants";

const chainId = BASE_CHAIN_ID;
interface ActiveWebState {
  _account: string; // 钱包地址
  chainId: number; // 钱包链id
  connectorName?: ConnectorNames; // 钱包链接方式
  isKill?: boolean; // 是否断开链接
  addressData: string;
  _librarySigner: ethers.Signer | null;
  _viewAddress?: string;
  priceNumberHds?: number;
}

/* 
  1.判断地址栏是否有观察钱包参数 watch_a
  2.如果有就改变 store 的 viewAddress 地址
  3.如果没有就把 store 的 viewAddress 地址置为空
  4.需要做一个路由监听  在跳转的时候需要带上参数地址 以确保刷新是能用

*/

export const useActiveWebState = defineStore({
  id: "activeWebState",
  state: (): ActiveWebState => ({
    _account: "",
    chainId: 0,
    connectorName: undefined,
    _librarySigner: null,
    isKill: false,
    addressData: "",
    _viewAddress: "",
    priceNumberHds: 0
  }),

  getters: {
    account(): string {
      // if (import.meta.env.MODE === "development") {
      //   return "0xE3d9023a29C680F83E039056DA2948B65330eB4c";
      // }
      // 如果链ID不对 则认为用户未登录
      if (Number(chainId) !== this.chainId) {
        return "";
      }
      if (this._viewAddress) {
        return this._viewAddress;
      }
      if (this._account) {
        return this._account;
      }
    },
    accountLower(): string {
      return this.account?.toLowerCase();
    },
    viewAddress(): string {
      return this._viewAddress;
    },
    shortAccount(): string {
      return shortenAddress(this.account);
    },
    library(): ethers.providers.JsonRpcProvider | null | null {
      if (this.account) {
        return getActiveLibrary();
      }
      return simpleRpcProvider;
    }
  },
  // 等下  这个搞不得哦   我有地方在用 不影响你使用
  actions: {
    setAccount(account: string) {
      this._account = account;
    },
    setChainId(chainId: number) {
      this.chainId = chainId;
    },
    setConnectorName(connectorName: ConnectorNames) {
      this.connectorName = connectorName;
    },
    killConnect() {
      this.isKill = true;
      this._account = "";
    },
    setAddress(connector: any) {
      this.addressData = connector;
    },
    setViewAddress(connector: any) {
      this._viewAddress = connector;
    },

    setHdsprice(account: any) {
      this.priceNumberHds = account;
    },
    setLibrarySigner(signer: ethers.Signer | null) {
      this._librarySigner = signer;
    }
  },
  persist: {
    paths: ["connectorName", "priceNumberHds"]
  }
});

export const useActiveWebStateRefs = () => storeToRefs(useActiveWebState());
