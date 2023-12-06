import { ethers } from "ethers";
import addresses from "../constants/contracts";

// Addresses
import { getAddress } from "./addressHelpers";

// ABI
import bep20Abi from "../abi/ERC20.json";
import erc721Abi from "../abi/ERC721.json";
import MultiCallAbi from "../abi/Multicall.json";
import NftSellerAbi from "../abi/NftSeller.json";
import TRTERC1155Abi from "../abi/TRTERC1155.json";
import UsdtStakingPoolAbi from "../abi/UsdtStakingPool.json";

import { getContract } from "./contract";

export const getBep20Contract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(address, bep20Abi, signer);
};
export const getErc721Contract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(address, erc721Abi, signer);
};

export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(getAddress(addresses.multiCall), MultiCallAbi, signer);
};

export const getNftSellerContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(getAddress(addresses.NftSeller), NftSellerAbi, signer);
};

export const getTRTERC1155Contract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(getAddress(addresses.ERC1155NFT), TRTERC1155Abi, signer);
};

export const getUSDTStakingPoolContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(getAddress(addresses.USDTStakingPool), UsdtStakingPoolAbi, signer);
};
