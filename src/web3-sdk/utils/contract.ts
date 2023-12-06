// import { Contract } from "@ethersproject/contracts";
// import { getAddress } from "@ethersproject/address";
// import { AddressZero } from "@ethersproject/constants";
// import type { Signer } from "@ethersproject/abstract-signer";
// import type { Provider } from "@ethersproject/providers";
// import type { JsonRpcSigner, BrowserProvider } from "@ethersproject/providers";
// import { BigNumberish } from "@ethersproject/BigNumberish";
import {
  Contract,
  // getAddress,
  // ZeroAddress,
  Signer,
  // Provider,
  // JsonRpcSigner,
  // BrowserProvider,
  ethers
} from "ethers";

import type { ChainId } from "../wallet/config";
import { BASE_BSC_SCAN_URLS } from "../wallet";
import { simpleRpcProvider } from "./providers";
import { BASE_CHAIN_ID } from "../constants";

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return ethers.utils.getAddress(value);
  } catch {
    return false;
  }
}

export function getBscScanLink(
  data: string | number | string[],
  type: "transaction" | "token" | "address" | "block" | "countdown" | "holders" | "balance",
  chainId: ChainId = BASE_CHAIN_ID
): string {
  console.log(BASE_CHAIN_ID);
  switch (type) {
    case "transaction": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/tx/${data}`;
    }
    case "token": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/token/${data}`;
    }
    case "block": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/block/${data}`;
    }
    case "countdown": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/block/countdown/${data}`;
    }
    case "holders": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/token/${data}#balances`;
    }
    case "balance": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/token/${data[0]}?a=${data[1]}`;
    }
    default: {
      return `${BASE_BSC_SCAN_URLS[chainId]}/address/${data}`;
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 1): string {
  const parsed = isAddress(address);
  if (!parsed) {
    return "";
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(39 - chars)}`;
}

// account is not optional
export function getSigner(
  library: ethers.providers.Web3Provider,
  account: string
): ethers.providers.JsonRpcSigner {
  return library.getSigner(account);
}

// https://learnblockchain.cn/docs/ethers.js/api.html

// account is optional
export function getContract(
  address: string,
  ABI: any,
  signer?: Signer | ethers.providers.Provider
): Contract {
  if (!isAddress(address) || address === ethers.constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, signer ?? simpleRpcProvider);
}
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
