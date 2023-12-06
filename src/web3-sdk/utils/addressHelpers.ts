import { ChainId } from "../wallet/config";
import type { Address } from "../types";
import { BASE_CHAIN_ID } from "../constants";

export const getAddress = (address: Address): string => {
  const chainId = BASE_CHAIN_ID as unknown as ChainId.BSC_MAINNET;
  return address[chainId] ? address[chainId] : address[ChainId.BSC_MAINNET];
};
