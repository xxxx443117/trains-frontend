declare namespace Api {
  namespace User {
    interface AccountAssets {
      nonce: 0;
      role: "string";
      createdAt: "string";
      id: 0;
      symbol: "string";
      balance: 0;
      balanceFreeze: 0;
      totalStakingAmount: 0;
      totalMinedAmount: 0;
      totalPowerValue: 0;
    }

    interface TransferLogParams {
      address: string; // 用户地址

      page?: number; // Default: 1 分页号,默认1

      size?: number; // Default: 20 分页数量,最大20

      tokenType?: string; // 类型 USDT

      transferTyp?: number; // 资金流向:0 接收和转出 1 接收 2 转出

      orderType?: number[]; // 0:用户转账 10:利息释放 20:本金释放 30:链上提币 40:复投扣款
    }
    interface TransferLog {
      list: [
        {
          id: 0;
          from: "string";
          to: "string";
          beforeBalance: 0;
          afterBalance: 0;
          requestAmount: 0;
          receiveAmount: 0;
          tokenType: "string";
          reqTxHash: "string";
          orderType: 0;
          state: 0;
          businessLogId: 0;
          createdAt: "string";
          updatedAt: "string";
        }
      ];
      total: 0;
    }
    interface SubSuerListParams {
      address: string; // 用户地址

      page?: number; // Default: 1 分页号,默认1

      size?: number; // Default: 20 分页数量,最大20

      role?: string; // 角色等级 0: 普通 1:卫星 2:行星 3:恒星 ....

      levelGap?: number; // 层级
    }
    interface SubSuerList {
      list: {
        userAddress: "string";
        nonce: 0;
        role: "string";
        createdAt: "string";
      }[];
      total: 0;
    }

    interface SubSuerSizeParams {
      address: string; // 用户地址

      role?: string; // 角色等级 0: 普通 1:卫星 2:行星 3:恒星 ....

      levelGap?: number; // 层级
    }
    interface SubSuerSize {
      size: 0;
    }

    interface Team {
      teamSize: 0;
      teamStakingTotal: 0;
      smallTeamStakingTotal: 0;
      smallTeamStakingTotalToday: 0;
      largeTeamStakingTotal: 0;
      LargeTeamStakingTotalToday: 0;
    }

    interface announcemenList {
      list: [
        {
          id: 0;
          type: string;
          language: string;
          title: string;
          article: string;
          indexImg: string;
          startTime: number;
          endTime: number;
          status: boolean;
          createdAt: number;
          updatedAt: number;
        }
      ];
    }
    interface announcemenDetail {
      id: 0;
      type: string;
      language: string;
      title: string;
      article: string;
      indexImg: string;
      startTime: number;
      endTime: number;
      status: boolean;
      createdAt: number;
      updatedAt: number;
    }
    interface announcemenListParams {
      page: number;
      size: number;
      type: number;
      language: string;
    }
  }
}
