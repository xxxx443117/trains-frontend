import { ConnectorNames } from "./types";
import type { Config } from "./types";

const connectors: Config[] = [
  {
    title: "Metamask",
    icon: "",
    connectorId: ConnectorNames.Injected,
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: "",
    connectorId: ConnectorNames.WalletConnect,
    priority: 2,
  },
  {
    title: "Trust Wallet",
    icon: "",
    connectorId: ConnectorNames.Injected,
    priority: 3,
  },
  {
    title: "MathWallet",
    icon: "",
    connectorId: ConnectorNames.Injected,
    priority: 999,
  },
  {
    title: "TokenPocket",
    icon: "",
    connectorId: ConnectorNames.Injected,
    priority: 999,
  },

  // {
  //   title: "BitKeep",
  //   icon: '',
  //   connectorId: ConnectorNames.Injected,
  //   priority: 999,
  // },
  {
    title: "Binance Chain",
    icon: "",
    connectorId: ConnectorNames.BSC,
    priority: 999,
  },
  {
    title: "SafePal",
    icon: "",
    connectorId: ConnectorNames.Injected,
    priority: 999,
  },
  {
    title: "Coin98",
    icon: "",
    connectorId: ConnectorNames.Injected,
    priority: 999,
  },
];

export enum ChainId {
  BSC_MAINNET = 56, // 币安正式链
  BSC_TESTNET = 97, // 币安测试链
  TESTNET = 222,
  MATIC_MAINNET = 137,
  MATIC_TESTNET = 80001,
}

export const BASE_BSC_SCAN_URLS = {
  [ChainId.TESTNET]: "https://mumbai.polygonscan.com",
  [ChainId.BSC_MAINNET]: "https://bscscan.com",
  [ChainId.BSC_TESTNET]: "https://testnet.bscscan.com",
  [ChainId.MATIC_MAINNET]: "https://polygonscan.com/",
  [ChainId.MATIC_TESTNET]: "https://mumbai.polygonscan.com/",
};

export const ChainCoin = {
  [ChainId.BSC_TESTNET]: "BNB",
  [ChainId.TESTNET]: "BNB",
};

export default connectors;
export const connectorLocalStorageKey = "connectorIdv2";
export const walletLocalStorageKey = "wallet";
