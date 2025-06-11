import { useMutation } from '@tanstack/react-query';
import { logIn } from '@/services/Login/login';
import type { PostSignIn } from '@/services/Login/login';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { setEmail, setToken } from '@/redux/slice/authSlice';

export const useLogIn = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (data: PostSignIn) => logIn(data),
    onSuccess: (response) => {
      dispatch(setToken(response.token));
      dispatch(setEmail(response.email));
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};
