import { Http } from "../http";

export class Staking extends Http {
  //  获取投资记录 https://xxxnft.p7abc.bio/api/staking/depositLogList
  async getDepositLogList(
    params: Api.Staking.DepositLogListParams
  ): Promise<Api.Response<Api.Staking.DepositLogList>> {
    return this.get(`/staking/depositLogList`, params);
  }

  //  全网投资信息 https://xxxnft.p7abc.bio/api/staking/globalStakingStats
  async getGlobalStakingStats(): Promise<Api.Response<Api.Staking.GlobalStakingStats>> {
    return this.get(`/staking/globalStakingStats`);
  }
}
