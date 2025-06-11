import { api } from '@/services/api/api';

export type UserBlog = {
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
export type UserBlogsResponse = {
  page: number;
  lastPage: number;
  total: number;
  data: UserBlog[];
};

export type UserData = {
  id: number;
  name: string;
  email: string;
  password: string;
  headline: string | null;
  avatarUrl: string | null;
};

export const getUserBlogs = async (
  userdata: UserData
): Promise<UserBlogsResponse> => {
  let page = 1;
  const limit = 50; // default value
  let allBlogs: UserBlog[] = [];
  let lastPage = 1;

  while (true) {
    const response = await api.get(
      `https://truthful-simplicity-production.up.railway.app/posts/recommended?limit=${limit}&page=${page}`
    );

    const fetchedBlogs: UserBlog[] = response.data.data;
    const filteredBlogs = fetchedBlogs.filter(
      (blog) => blog.author.id === userdata.id
    );

    allBlogs = [...allBlogs, ...filteredBlogs];

    lastPage = response.data.lastPage;
    if (page >= lastPage) break;
    page++;
  }

  return {
    page: 1,
    lastPage,
    total: allBlogs.length,
    data: allBlogs,
  };
};
