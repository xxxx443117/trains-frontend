export interface NFTItem {
  id: number;
  title: string;
  rate: number;
  price: number;
  img: any;
  tips: string[];
}
import tips1 from "@/assets/images/nft/tips1.png";
import tips2 from "@/assets/images/nft/tips2.png";
import tips3 from "@/assets/images/nft/tips3.png";

export const nfts: Record<1 | 2 | 3, NFTItem> = {
  1: {
    id: 1,
    title: "Genesis_Satellite",
    rate: 3,
    price: 3000,
    img: tips1,
    tips: ["Each_NFT_accounts_for", "Get_a_daily_income_of", "Automatically_become_a_planetary_team"]
  },
  2: {
    id: 2,
    title: "Genesis_planet",
    rate: 4,
    price: 15000,
    img: tips2,
    tips: ["Each_NFT_accounts_for_5_weights", "Get_a_daily_income_of_300U_for", "Automatically_become"]
  },
  3: {
    id: 3,
    title: "genesis_star",
    rate: 5,
    price: 45000,
    img: tips3,
    tips: ["Each_NFT_accounts_for_15_weights", "Get_a_daily_income_of_1500U_for", "Automatically_become"]
  }
};

type StakeItem = {
  value: number;
  label: string;
  day: number;
  typeStr: string;
};
export const usdtStakes: Record<1 | 7 | 30 | 90, StakeItem> = {
  1: {
    value: 0.01,
    label: "1",
    day: 1,
    typeStr: "日投"
  },
  7: {
    value: 0.011,
    label: "1.1",
    day: 7,
    typeStr: "周投"
  },
  30: {
    value: 0.02,
    label: "1.2",
    day: 30,
    typeStr: "月投"
  },
  90: {
    value: 0.04,
    label: "1.4",
    day: 90,
    typeStr: "季投"
  }
};

import satelliteZh from "@/assets/images/mine/alliance/satellite-zh.png";
import satelliteEn from "@/assets/images/mine/alliance/satellite-en.png";
import planetZh from "@/assets/images/mine/alliance/planet-zh.png";
import planetEn from "@/assets/images/mine/alliance/planet-en.png";
import starZh from "@/assets/images/mine/alliance/star-zh.png";
import starEn from "@/assets/images/mine/alliance/star-en.png";
import nebulaZh from "@/assets/images/mine/alliance/nebula-zh.png";
import nebulaEn from "@/assets/images/mine/alliance/nebula-en.png";
import galaxyZh from "@/assets/images/mine/alliance/galaxy-zh.png";
import galaxyEn from "@/assets/images/mine/alliance/galaxy-en.png";
import clusterZh from "@/assets/images/mine/alliance/cluster-zh.png";
import clusterEn from "@/assets/images/mine/alliance/cluster-en.png";

export const teamConfig = {
  0: {
    label: "卫星",
    zhImg: satelliteZh,
    enImg: satelliteEn
  },
  1: {
    label: "卫星",
    zhImg: planetZh,
    enImg: planetEn
  },
  2: {
    label: "行星",
    zhImg: starZh,
    enImg: starEn
  },
  3: {
    label: "恒星",
    zhImg: nebulaZh,
    enImg: nebulaEn
  },
  4: {
    label: "星云",
    zhImg: galaxyZh,
    enImg: galaxyEn
  },
  5: {
    label: "星系",
    zhImg: clusterZh,
    enImg: clusterEn
  },
  6: {
    label: "星团",
    zhImg: import("@/assets/images/mine/alliance/cluster-zh.png"),
    enImg: import("@/assets/images/mine/alliance/cluster-en.png")
  }
};

export const INVITE_ADDRESS_STORAGE_KEY = "INVITE_ADDRESS_STORAGE_KEY";

export const allianceConfig = {};
