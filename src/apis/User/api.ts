import { Http } from "../http";

export class User extends Http {
  //  获取用户资产 https://xxxnft.p7abc.bio/api/account/asset
  async getAccountAsset(address: string): Promise<Api.Response<Api.User.AccountAssets>> {
    return this.get(`/account/asset`, { address });
  }

  // 获取我的交易记录 https://xxxnft.p7abc.bio/api/account/getTransferLog
  async getTransferLog(
    params: Api.User.TransferLogParams
  ): Promise<Api.Response<Api.User.TransferLog>> {
    return this.get(`/account/getTransferLog`, params);
  }

  // 按查询子用户 https://xxxnft.p7abc.bio/api/account/subSuerList
  async getSubSuerList(
    params: Api.User.SubSuerListParams
  ): Promise<Api.Response<Api.User.SubSuerList>> {
    return this.get(`/account/subSuerList`, params);
  }

  // 按查询子用户个数 https://xxxnft.p7abc.bio/api/account/subSuerSize
  async getSubSuerSize(
    params: Api.User.SubSuerSizeParams
  ): Promise<Api.Response<Api.User.SubSuerSize>> {
    return this.get(`/account/subSuerSize`, params);
  }

  // 获取用户团队信息 https://xxxnft.p7abc.bio/api/account/team
  async getTeam(address: string): Promise<Api.Response<Api.User.Team>> {
    return this.get(`/account/team`, { address });
  }

  // 公告 https://xxxnft.p7abc.bio/api/article/announcemenList
  async announcemenList(
    params: Api.User.announcemenListParams
  ): Promise<Api.Response<Api.User.announcemenList>> {
    return this.get(`/article/announcemenList`, params);
  }

  // 公告详情 https://xxxnft.p7abc.bio/api/article/announcemen/detail
  async announcemenDetail(id: string): Promise<Api.Response<Api.User.announcemenDetail>> {
    return this.get(`/article/announcemen/detail`, { id });
  }
}
