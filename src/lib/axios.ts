import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TECHPATH_API_URL,
  withCredentials: true,
});

axiosInstance.defaults.headers.common["api-key"] =
  process.env.NEXT_PUBLIC_TECHPATH_API_KEY;

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.user?.id) {
    config.headers["x-user-id"] = session.user.id;
  }

  return config;
});

export default axiosInstance;
