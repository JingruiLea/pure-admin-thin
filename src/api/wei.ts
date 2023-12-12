import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type UserCall = {
  username: string;
  room: string;
  call_count: number;
};

export type UserCallListResult = {
  code: number;
  msg: string;
  data: Array<UserCall>;
};

export type IncreaseUserCallResult = {
  code: number;
  msg: string;
  data: {
    username: string;
    call_count: number;
  };
};

export type increaseUserCallRequest = {
  username: string;
  room: string;
  call_count: number;
};

/** 获取用户调用次数列表 */
export const getUserCallList = () => {
  return http.request<UserCallListResult>(
    "get",
    baseUrlApi("/user-calls/list")
  );
};

/** 增加用户的调用次数 */
export const increaseUserCall = (req: increaseUserCallRequest) => {
  return http.request<IncreaseUserCallResult>(
    "post",
    baseUrlApi(`/user-calls/add`),
    {
      data: req
    }
  );
};

export const clearUserCall = (data: { username: string; room: string }) => {
  return http.request<IncreaseUserCallResult>(
    "post",
    baseUrlApi(`/user-calls/clear`),
    { data }
  );
};
