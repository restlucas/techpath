import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3300/v1/api",
  withCredentials: true,
});

axiosInstance.defaults.headers.common["api_key"] =
  process.env.NEXT_PUBLIC_TECHPATH_API_KEY;

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.user?.id) {
    config.headers["user-id"] = session.user.id;
  }

  return config;
});

export default axiosInstance;
