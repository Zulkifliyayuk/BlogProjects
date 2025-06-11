// services/signup.ts
import { api } from '@/services/api/api';

export type PostSignUp = {
  name: string;
  email: string;
  password: string;
};

export type ResponseSignUp = {
  id: number;
  email: string;
  password: string;
};

export const signUp = async (
  postSignUp: PostSignUp
): Promise<ResponseSignUp> => {
  const response = await api.post<ResponseSignUp>(
    'https://truthful-simplicity-production.up.railway.app/auth/register',
    postSignUp
  );
  return {
    ...response.data,
    password: postSignUp.password,
  };
};
