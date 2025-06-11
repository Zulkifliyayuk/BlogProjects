import { api } from '@/services/api/api';

export type MyBlog = {
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
export type MyBlogsResponse = {
  page: number;
  lastPage: number;
  total: number;
  data: MyBlog[];
};

export const getAllMyBlogs = async (
  page: number,
  limit: number
): Promise<MyBlogsResponse> => {
  const response = await api.get(
    `https://truthful-simplicity-production.up.railway.app/posts/my-posts?limit=${limit}&page=${page}`
  );

  return response.data;
};
