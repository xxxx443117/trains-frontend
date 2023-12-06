import { getTabInfoByType } from "./datas";

export const getTransferLogState = (state: number) => {
  // 0:待处理 10:提现成功 20:提现失败
  switch (state) {
    case 0:
      return {
        label: "pending",
        color: "",
      };
    case 10:
      return {
        label: "success",
        color: "g-c-text-green",
      };
    case 20:
      return {
        label: "fail",
        color: "g-c-text-red",
      };
    default:
      return {
        label: "",
        color: "red",
      };
  }
};

export const getTransferLogType = (type: number, transferIn?: boolean) => {
  const current = getTabInfoByType(type);
  if (!current)
    return {
      title: "",
      prefix: "",
    };
  if (current.order_type === 0) {
    if (transferIn)
      return {
        title: "transferIn",
        prefix: "+",
      };
    return {
      title: "transferOut",
      prefix: "-",
    };
  }
  if (current.order_type === 40) {
    return {
      title: "reStake",
      prefix: "-",
    };
  }
  const prefix = current.order_type === 30 ? "-" : "+";
  return {
    title: current.title,
    prefix,
  };
};
