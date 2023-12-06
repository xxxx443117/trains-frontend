import { ChainId } from "../wallet/config";
export const BASE_URL = `${window.location.origin}`;
export const BASE_CHAIN_ID = Number(import.meta.env.VITE_BASE_CHAIN_ID) || ChainId.BSC_MAINNET;

export { default as addresses } from "./contracts";
