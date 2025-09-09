import axios from "axios";
import qs from "qs";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API || "",
  withCredentials: true,
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

AxiosInstance.defaults.headers.post["Content-Type"] = "application/json";
AxiosInstance.defaults.headers["Accept"] = "application/json";
AxiosInstance.defaults.headers["Content-Type"] = "application/json";
