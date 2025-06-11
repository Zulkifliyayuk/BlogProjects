import { api } from '@/services/api/api';

export type GetUser = {
  email: string;
};

export type ResponseGetUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  headline: string | null;
  avatarUrl: string | null;
};

export const getUser = async (
  postGetUser: GetUser
): Promise<ResponseGetUser> => {
  const response = await api.get<ResponseGetUser>(
    'https://truthful-simplicity-production.up.railway.app/users/' +
      postGetUser.email
  );
  return response.data;
};
