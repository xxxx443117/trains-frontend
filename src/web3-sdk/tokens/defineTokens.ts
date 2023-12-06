import { BASE_CHAIN_ID } from "../constants";
import { ChainId } from "../wallet/config";
import Token from "./Token";

interface TokenList {
  [symbol: string]: Token;
}

export const defineTokens = <T extends TokenList>(t: T) => t;

const mainnetTokens = defineTokens({
  wbnb: new Token(
    ChainId.BSC_MAINNET,
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    18,
    "WBNB",
    "WBNB",
    "/images/tokens/WBNB.svg",
    "https://www.binance.com/"
  ),
  bnb: new Token(
    ChainId.BSC_MAINNET,
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    18,
    "BNB",
    "BNB",
    "/images/tokens/BNB.svg",
    "https://www.binance.com/"
  ),
  ether: new Token(
    ChainId.BSC_MAINNET,
    "",
    18,
    "BNB",
    "BNB",
    "/images/tokens/BNB.svg",
    "https://www.binance.com/"
  ),
  usdt: new Token(
    ChainId.BSC_MAINNET,
    "0x55d398326f99059fF775485246999027B3197955",
    18,
    "USDT",
    "Tether USD",
    "/images/tokens/USDT.png",
    "https://tether.to/"
  )
});

const testnetTokens = defineTokens({
  ether: new Token(
    ChainId.BSC_TESTNET,
    "",
    18,
    "BNB",
    "BNB",
    "/images/tokens/BNB.svg",
    "https://www.binance.com/"
  ),
  WBNB: new Token(
    ChainId.BSC_TESTNET,
    "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    18,
    "BNB",
    "BNB",
    "/images/tokens/BNB.svg",
    "https://www.binance.com/"
  ),
  usdt: new Token(
    ChainId.BSC_TESTNET,
    "0xb1bb1De18409976277495a1A659EC1d50c224Be6",
    18,
    "USDT",
    "Tether USD",
    "/images/tokens/USDT.png",
    "https://tether.to/"
  )
});

const tokens = () => {
  const chainId = BASE_CHAIN_ID;

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (chainId === ChainId.BSC_TESTNET) {
    return Object.keys(mainnetTokens).reduce((accum, key) => {
      return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] };
    }, {} as typeof testnetTokens & typeof mainnetTokens);
  }

  return mainnetTokens;
};

export const unserializedTokens = tokens();

const getTokenMapOfAddress = () => {
  return Object.values(unserializedTokens).reduce((prev, curr) => {
    return { ...prev, [curr.address]: curr };
  }, {} as { [address: string]: Token });
};
export const tokenMap = getTokenMapOfAddress();

export const balanceTokens = [
  // unserializedTokens.hds,
  unserializedTokens.usdt
  // unserializedTokens.im,
  // unserializedTokens.it,
  // unserializedTokens.cfx
];

export const swapTokens = [
  // unserializedTokens.hds,
  unserializedTokens.usdt
  // unserializedTokens.im,
];
