export const tabsConfig = [
  // {
  //   title: "userTransfer",
  //   order_type: 0,
  //   tokenType: "HDS",
  // },
  {
    title: "interest_release",
    order_type: 10,
    tokenType: "USDT",
    transferType: 1
  },
  {
    title: "principal_release",
    order_type: 20,
    tokenType: "USDT",
    transferType: 1
  }
  // {
  //   title: "onChainWithdrawal",
  //   order_type: 30,
  //   tokenType: "HDS"
  // },
  // {
  //   title: "reStake",
  //   order_type: 40,
  //   tokenType: "HDS"
  // },
  // {
  //   title: "RankingDividends",
  //   order_type: 50,
  //   tokenType: "HDS"
  // }
];

export const getTabInfoByType = (order_type?: number) => {
  const currency = tabsConfig.find(item => order_type === item.order_type);
  return currency;
};
