declare namespace Api {
  namespace Staking {
    interface DepositLogListParams {
      address: string; // 用户地址

      page?: number; // Default: 1 分页号,默认1

      size?: number; // Default: 20 分页数量,最大20

      categoryId?: number; // number 种类id
    }
    interface DepositLogList {
      total: 0;
      list: [
        {
          id: 0;
          userAddress: "string"; // 用户地址
          powerValue: 0; // 最终算力
          stakingValue: 0; // 质押总量
          accMinedAmount: 0; // 累计产出
          categoryId: 0; // 类型Id
          txHash: "string"; // 交易哈希
          state: 0; // 0:待处理 10:已处理
          expirationTime: "string"; // 到期时间
          createdAt: "string"; // 创建时间
          updatedAt: "string"; // 更新时间
        }
      ];
    }

    // 全网投资信息
    interface GlobalStakingStats {
      totalStakingAmount: 0; // 总质押
      totalMinedAmount: 0; // 已收益;
      totalPowerValue: 0; // 预计总收益;
      numberOfStaker: 0; // 质押人数;
    }
  }
}
