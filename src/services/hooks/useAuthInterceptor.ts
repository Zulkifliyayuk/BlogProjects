import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks/hooks';
import { api } from '../api/api';

export const useAuthInterceptor = () => {
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [token]);
};
