export enum ConnectorNames {
  Injected = "injected", // 注入 window 上找到钱包信息
  WalletConnect = "walletconnect", // 扫码登录
  BSC = "bsc",
}

export type Login = (connectorId: ConnectorNames) => void;

export interface Config {
  title: string;
  icon: string;
  connectorId: ConnectorNames;
  priority: number;
}
