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
export type BlogsMostLikedResponse = {
  page: number;
  lastPage: number;
  total: number;
  data: Blog[];
};

export const getBlogsMostLiked = async (
  page: number,
  limit: number
): Promise<BlogsMostLikedResponse> => {
  const response = await api.get(
    `https://truthful-simplicity-production.up.railway.app/posts/most-liked?limit=${limit}&page=${page}`
  );

  return response.data;
};
