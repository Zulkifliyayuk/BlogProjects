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
export type BlogSearchResponse = {
  page: number;
  lastPage: number;
  total: number;
  data: Blog[];
};

export const getSearchBlogs = async (
  query: string,
  page: number,
  limit: number
): Promise<BlogSearchResponse> => {
  const response = await api.get(
    `https://truthful-simplicity-production.up.railway.app/posts/search?query=${query}&limit=${limit}&page=${page}`
  );

  return response.data;
};
