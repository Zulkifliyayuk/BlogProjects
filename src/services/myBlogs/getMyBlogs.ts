import { api } from '@/services/api/api';

export type Blog = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  author: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
};
export type BlogRecommendedResponse = {
  page: number;
  lastPage: number;
  total: number;
  data: Blog[];
};

export const getBlogs = async (
  page: number,
  limit: number
): Promise<BlogRecommendedResponse> => {
  const response = await api.get(
    `https://truthful-simplicity-production.up.railway.app/posts/recommended?limit=${limit}&page=${page}`
  );

  return response.data;
};
