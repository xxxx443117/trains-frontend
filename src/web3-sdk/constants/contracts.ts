import { ChainId } from "../wallet/config";

// 看注释 看注释 看注释
// BSC_MAINNET是正式链 对应的链ID为56
// BSC_TESTNET是正式链 对应的链ID为97
// 这是合约地址配置文件
// 合约的地址请务必在这个地添加 请务必在这个地方添加 请务必在这地方添加
// If you not add contract address in there, I will fuck * you

/**
 * @请认真阅读上面注释
 */
const addresses = {
  multiCall: {
    [ChainId.BSC_MAINNET]: "0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B",
    [ChainId.BSC_TESTNET]: "0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576"
  },
  // 黑洞地址
  burn: {
    [ChainId.BSC_MAINNET]: "0x000000000000000000000000000000000000dead",
    [ChainId.BSC_TESTNET]: "0x000000000000000000000000000000000000dead"
  },
  USDTToken: {
    [ChainId.BSC_MAINNET]: "0x55d398326f99059fF775485246999027B3197955",
    [ChainId.BSC_TESTNET]: "0xb1bb1De18409976277495a1A659EC1d50c224Be6"
  },
  // 投资质押
  USDTStakingPool: {
    [ChainId.BSC_MAINNET]: "0x55d398326f99059fF775485246999027B3197955",
    [ChainId.BSC_TESTNET]: "0x0FACEFfE1e6Ae64Bbec0bbB85F8c2a85B4F7f7be"
  },
  ERC1155NFT: {
    [ChainId.BSC_MAINNET]: "0x55d398326f99059fF775485246999027B3197955",
    [ChainId.BSC_TESTNET]: "0xaFcd2269C56b0A7c78d847EF1d013B9d05BCc72E"
  },
  NftSeller: {
    [ChainId.BSC_MAINNET]: "0x55d398326f99059fF775485246999027B3197955",
    [ChainId.BSC_TESTNET]: "0xD1354E8F2FbA7701550f91D7564Ed2B7820fBa95"
  }
};
export default addresses;
