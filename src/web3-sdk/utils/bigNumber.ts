import BigNumber from "bignumber.js";
import { ethers } from "ethers";

// BigNumber 配置
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80
});

export const BIG_ZERO = new BigNumber(0);
export const BIG_ONE = new BigNumber(1);
export const BIG_NINE = new BigNumber(9);
export const BIG_TEN = new BigNumber(10);
export const ONE_BILLION = new BigNumber(1_000_000_000);
export const ONE_MILLION = new BigNumber(1_000_000);
export const maxUint256 = new BigNumber(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);

export const ethersToBigNumber = (ethersBn: ethers.BigNumberish): BigNumber =>
  new BigNumber(ethersBn.toString());
