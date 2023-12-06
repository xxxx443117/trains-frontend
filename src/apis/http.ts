import axios, { AxiosRequestConfig } from "axios";
// import { storage } from "@/config";
import { isSuccess } from "./util";

export const STORAGE_SSID = "STORAGE_SSID";

interface AxiosRequestConfigCustom extends AxiosRequestConfig {
  hideHttpError?: boolean;
  ignoreSSID?: boolean; // 是否忽略SSID
}

// import.meta.env.VITE_BASE_API_URL
const baseURL = "/api";

// console.log(baseURL, "import.meta.env.MODE");

axios.defaults.timeout = 30 * 1000;
// axios.defaults.withCredentials = false
// axios.defaults.headers.common['token'] = "";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.headers.get.Accept = "application/json";

axios.interceptors.response.use(
  response => {
    if (response.data) {
      return response;
    }
    return Promise.reject(response);
  },
  error => {
    return Promise.reject(error.response);
  }
);

export class Http {
  // eslint-disable-next-line class-methods-use-this
  async request(configs: AxiosRequestConfigCustom) {
    let response;
    const SSID = localStorage.getItem(STORAGE_SSID);

    try {
      response = await axios({
        ...configs,
        headers: SSID && !configs.ignoreSSID ? { ...configs.headers, SSID } : configs.headers
      });
      return response.data;
    } catch (e: any) {
      return e;
    }
  }

  async get(url: string, params?: any, option: AxiosRequestConfigCustom = {}) {
    const config: AxiosRequestConfigCustom = {
      method: "GET",
      url,
      baseURL,
      params,
      ...option
    };
    return this.request(config);
  }

  async getOther(
    otherBaseURL: string,
    url: string,
    params?: any,
    option: AxiosRequestConfigCustom = { ignoreSSID: true }
  ) {
    const config: AxiosRequestConfigCustom = {
      method: "GET",
      url,
      baseURL: otherBaseURL,
      params,
      ...option
    };
    return this.request(config);
  }

  async post(url: string, data?: any, option: AxiosRequestConfigCustom = {}) {
    const config: AxiosRequestConfigCustom = {
      method: "POST",
      url,
      data,
      baseURL,
      ...option
    };
    return this.request(config);
  }

  static checkSuccess(res: Api.Error) {
    return isSuccess(res);
  }
}
