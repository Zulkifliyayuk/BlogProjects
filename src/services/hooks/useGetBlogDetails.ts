import { useQuery } from '@tanstack/react-query';
import {
  getBlogDetails,
  type ResponseGetBlogDetails,
} from '../getBlogDetails/getBlogDetails';

export const useGetBlogDetails = (id: number) => {
  return useQuery<ResponseGetBlogDetails>({
    queryKey: ['getBlogDetails', id],
    queryFn: () => getBlogDetails({ id }),
    enabled: !!id, // hanya fetch jika email tidak kosong/null
  });
};
