import home from "@/assets/images/menu/home.png";
import funding from "@/assets/images/menu/funding.png";
import nft from "@/assets/images/menu/nft.png";
import stake from "@/assets/images/menu/stake.png";
import team from "@/assets/images/menu/team.png";
import finance from "@/assets/images/menu/finance.png";
import notice from "@/assets/images/menu/notice.png";
import service from "@/assets/images/menu/service.png";

export type MenuConfigItem = {
  name: string;
  path: string;
  icon?: string;
  external?: boolean;
  soon?: boolean;
};
export type MenuConfig = {
  //  name: string;
  //  path: string;
  //  icon: string;
  //  id: string;
  child?: MenuConfigItem[];
} & MenuConfigItem;

export const _menuConfig: MenuConfig[] = [
  {
    name: "frontPage",
    path: "/",
    icon: home
  },
  {
    name: "invest",
    path: "/funding",
    icon: funding
  },
  {
    name: "governance",
    path: "/nft",
    soon: true,
    icon: nft
  },
  {
    name: "digging",
    path: "/nft/stake",
    soon: true,
    icon: stake
  },
  {
    name: "teamBonus",
    path: "/team",
    soon: true,
    icon: team
  },
  {
    name: "assets",
    path: "",
    icon: finance,
    child: [
      {
        name: "investment_account",
        soon: true,
        path: "/finance/stake"
      },
      {
        name: "NFT_account",
        soon: true,
        path: "/finance/nft"
      }
    ]
  },
  {
    name: "announcement",
    path: "/notice",
    // soon: true,
    icon: notice
  },
  {
    name: "customer_service",
    path: "/service",
    soon: true,
    icon: service
  }
];

// faucet - smart;
const devConfig = [
  {
    name: "faucetSmart",
    path: `/faucet-smart`,
    icon: service
  }
  // {
  //   name: "释放",
  //   path: `/release`,
  //   icon: info
  // }
];

export const menuConfig: MenuConfig[] =
  import.meta.env.VITE_BASE_MODE === "TEST" ? [..._menuConfig, ...devConfig] : [..._menuConfig];
