import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useUserByEmail } from './useGetUser';
import {
  getUserBlogs,
  type UserBlogsResponse,
} from '../getUserBlogs/getUserBlogs';

export const useGetUserBlogs = () => {
  const emailUser = useAppSelector((state) => state.user.email);
  const { data: userdata } = useUserByEmail(emailUser);

  return useQuery<UserBlogsResponse>({
    queryKey: ['UserBlogs', emailUser],
    queryFn: () => getUserBlogs(userdata!),
    enabled: !!userdata,
  });
};
