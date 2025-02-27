import axiosInstance from "@/lib/axios";

const trail = {
  async listAll() {
    const response = await axiosInstance.get("/trail");

    const data = response.data;
    return data.data;
  },

  async fetchTrail(trailSlug: string) {
    const response = await axiosInstance.get(`/trail/${trailSlug}`);

    const data = response.data;
    return data.data;
  },
};

export default trail;
