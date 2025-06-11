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

export type MyData = {
  id: number;
  name: string;
  email: string;
  password: string;
  headline: string | null;
  avatarUrl: string | null;
};

export const getMyBlogs = async (mydata: MyData): Promise<MyBlog[]> => {
  const limit = 10;
  let page = 1;
  let allBlogs: MyBlog[] = [];
  let lastPage = 1;

  do {
    const response = await api.get(
      `https://truthful-simplicity-production.up.railway.app/posts/recommended?limit=${limit}&page=${page}`
    );

    const filtered = response.data.data.filter(
      (blog: MyBlog) => blog.author.id === mydata.id
    );

    allBlogs = [...allBlogs, ...filtered];
    lastPage = response.data.lastPage;
    page += 1;
  } while (page <= lastPage);

  return allBlogs;
};
