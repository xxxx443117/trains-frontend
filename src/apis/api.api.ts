import { isSuccess } from "./util";
import { HelloApi } from "./Hello";
import { User } from "./User";
import { Staking } from "./Staking";

export const Api = {
  isSuccess,
  HelloApi: new HelloApi(),
  User: new User(),
  Staking: new Staking()
};
