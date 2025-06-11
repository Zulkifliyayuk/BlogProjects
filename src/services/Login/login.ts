import { api } from '@/services/api/api';

export type PostSignIn = {
  email: string;
  password: string;
};

export type ResponseSignIn = {
  token: string;
  email: string;
};

export const logIn = async (
  postSignIn: PostSignIn
): Promise<ResponseSignIn> => {
  const response = await api.post<ResponseSignIn>(
    'https://truthful-simplicity-production.up.railway.app/auth/login',
    postSignIn
  );
  return {
    ...response.data,
    email: postSignIn.email,
  };
};
