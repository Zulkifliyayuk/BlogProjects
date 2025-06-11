import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/services/signUp/signUp';
import type { PostSignUp } from '@/services/signUp/signUp';

import { useLogIn } from './useLogIn';
import type { PostSignIn } from '../Login/login';

export const useSignUp = () => {
  const { mutate } = useLogIn();

  return useMutation({
    mutationFn: (data: PostSignUp) => signUp(data),
    onSuccess: (response) => {
      const postData: PostSignIn = {
        email: response.email,
        password: response.password,
      };
      mutate(postData);
    },
    onError: (error) => {
      console.error('Register failed:', error);
    },
  });
};
