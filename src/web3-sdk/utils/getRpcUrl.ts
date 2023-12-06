import sample from "lodash/sample";
import { ChainId } from "../wallet/config";
import { ETHEREUM_CHAIN } from "../wallet/networks";
import { BASE_CHAIN_ID } from "../constants";

type chainId = keyof typeof ETHEREUM_CHAIN;

const ethereum =
  ETHEREUM_CHAIN[BASE_CHAIN_ID as unknown as chainId] ||
  ETHEREUM_CHAIN[ChainId.BSC_MAINNET];

// Array of available nodes to connect to
export const nodes = [...ethereum.rpcUrls];

const getNodeUrl = () => {
  return sample(nodes) as string;
};

export default getNodeUrl;
