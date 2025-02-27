import axiosInstance from "@/lib/axios";

const lessonService = {
  async fetch(lessonSlug: string) {
    const response = await axiosInstance.get(`/lesson/${lessonSlug}`);

    const data = response.data;
    return data.data;
  },
};

export default lessonService;
