import axiosInstance from "@/lib/axios";
import { Account, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

export const sendUserDataToBackend = async (
  user: User | AdapterUser,
  account: Account | null,
  username: string,
) => {
  const userData = {
    name: user.name,
    email: user.email,
    image: user.image,
    username: username,
    provider: account?.provider,
    providerAccountId: account?.providerAccountId,
  };

  const response = await axiosInstance.post("/auth", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = response.data;

  return data.data;
};
