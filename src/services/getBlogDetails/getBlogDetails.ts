import { api } from '@/services/api/api';

export type GetBlogDetails = {
  id: number;
};

export type ResponseGetBlogDetails = {
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

export const getBlogDetails = async (
  GetBlogDetails: GetBlogDetails
): Promise<ResponseGetBlogDetails> => {
  const response = await api.get<ResponseGetBlogDetails>(
    'https://truthful-simplicity-production.up.railway.app/posts/' +
      GetBlogDetails.id
  );
  return response.data;
};
