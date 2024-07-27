import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { notify } from "./notify";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const request = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  data: any,
  callback: (response: AxiosResponse) => any,
  callbackerr: (error: any) => void,
  headers?: any
) => {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
    };

    if (method === "get" || method === "delete") {
      config.params = data;
    } else {
      config.data = data;
    }
    if (headers) {
      config.headers = headers;
    }
    const response: AxiosResponse = await api.request(config);
    return callback(response?.data);
  } catch (error: any) {
    if (error?.response?.data?.message) {
      notify({
        message: error?.response?.data?.message,
        timeout: 3000,
        type: "error",
      });
    }
    return callbackerr(error);
  }
};

const createMethod = (method: "get" | "post" | "put" | "delete") => {
  return (
    url: string,
    data: any,
    callback: (response: any) => any,
    callbackerr: (error: any) => void,
    headers?: any
  ) => request(method, url, data, callback, callbackerr, headers);
};

const API = {
  get: createMethod("get"),
  post: createMethod("post"),
  put: createMethod("put"),
  delete: createMethod("delete"),
};

export default API;
