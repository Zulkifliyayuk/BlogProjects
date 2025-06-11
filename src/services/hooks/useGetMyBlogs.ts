import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useUserByEmail } from './useGetUser';
import { getMyBlogs, type MyBlog } from '../getMyBlogs/getMyBlogs';

export const useGetMyBlogs = () => {
  const emailUser = useAppSelector((state) => state.auth.email);
  const { data: mydata } = useUserByEmail(emailUser);

  return useQuery<MyBlog[]>({
    queryKey: ['myBlogs'],
    queryFn: () => getMyBlogs(mydata!),
    enabled: !!mydata,
  });
};
