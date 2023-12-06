import invariant from "tiny-invariant";
import { ChainId } from "../wallet/config";

class Token {
  readonly decimals: number;
  readonly symbol?: string;
  readonly name?: string;

  readonly chainId: ChainId;
  readonly address: string;
  readonly logoURL?: string;
  readonly projectLink?: string;

  constructor(
    chainId: ChainId,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
    logoURL?: string,
    projectLink?: string
  ) {
    this.chainId = chainId;
    this.address = address;
    this.decimals = decimals;
    this.symbol = symbol;
    this.name = name;
    this.logoURL = logoURL;
    this.projectLink = projectLink;
  }

  static ETHERS = {
    [ChainId.BSC_MAINNET]: "BNB",
    [ChainId.BSC_TESTNET]: "BNB",
  };

  isETHER() {
    return this.address === "" && this.symbol === Token.ETHERS[this.chainId];
  }

  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, "CHAIN_IDS");
    invariant(this.address !== other.address, "ADDRESSES");
    return this.address.toLowerCase() < other.address.toLowerCase();
  }

  public equals(other: Token): boolean {
    if (this === other) {
      return true;
    }
    return this.chainId === other.chainId && this.address === other.address;
  }
}

export default Token;
