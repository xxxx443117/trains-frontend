import { ChainId } from "./config";

export const EmptyAddress = {
  [ChainId.MATIC_TESTNET]: "",
  [ChainId.MATIC_MAINNET]: "",
};

export const BASE_BSC_SCAN_URLS = {
  [ChainId.TESTNET]: "https://mumbai.polygonscan.com",
  [ChainId.BSC_MAINNET]: "https://bscscan.com",
  [ChainId.BSC_TESTNET]: "https://testnet.bscscan.com",
  [ChainId.MATIC_MAINNET]: "https://polygonscan.com/",
  [ChainId.MATIC_TESTNET]: "https://mumbai.polygonscan.com/",
};

export const ETHEREUM_CHAIN = {
  [ChainId.BSC_MAINNET]: {
    chainId: `0x${ChainId.BSC_MAINNET.toString(16)}`,
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "bnb",
      decimals: 18,
    },
    rpcUrls: [
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed.binance.org",
      // 'https://nodes.pancakeswap.com',
    ],
    blockExplorerUrls: [`${BASE_BSC_SCAN_URLS[ChainId.BSC_MAINNET]}/`],
  },
  [ChainId.BSC_TESTNET]: {
    chainId: `0x${ChainId.BSC_TESTNET.toString(16)}`,
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "bnb",
      decimals: 18,
    },
    rpcUrls: [
      // "https://data-seed-prebsc-1-s2.binance.org:8545/",
      // "https://data-seed-prebsc-1-s1.binance.org:8545/",
      // 'https://data-seed-prebsc-2-s1.binance.org:8545/',
      //  "http://data-seed-prebsc-2-s2.binance.org:8545/"
      "https://data-seed-prebsc-1-s2.binance.org:8545/",
      // "https://data-seed-prebsc-1-s3.binance.org:8545/",
      // "https://bsc-testnet.public.blastapi.io"
    ],
    blockExplorerUrls: [`${BASE_BSC_SCAN_URLS[ChainId.BSC_TESTNET]}/`],
  },
  [ChainId.MATIC_TESTNET]: {
    chainId: `0x${ChainId.MATIC_TESTNET.toString(16)}`,
    chainName: "Polygon PoS Chain Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://matic-mumbai.chainstacklabs.com/",
      "https://matic-testnet-archive-rpc.bwarelabs.com/",
      "https://rpc-mumbai.maticvigil.com/",
      "https://polygon-mumbai.infura.io/v3/330472ed44dd4692a16dfcb4cc41f122",
    ],
    blockExplorerUrls: [`${BASE_BSC_SCAN_URLS[ChainId.MATIC_TESTNET]}/`],
  },
  [ChainId.MATIC_MAINNET]: {
    chainId: `0x${ChainId.MATIC_MAINNET.toString(16)}`,
    chainName: "Polygon PoS Chain Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://polygon-rpc.com/",
      // 'https://rpc-mainnet.matic.network/',
      "https://rpc-mainnet.maticvigil.com",
      "https://rpc-mainnet.matic.quiknode.pro",
    ],
    blockExplorerUrls: [`${BASE_BSC_SCAN_URLS[ChainId.MATIC_MAINNET]}/`],
  },
};

export type EthereumChain = keyof typeof ETHEREUM_CHAIN;
