import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/services/getUser/getUser';
import type { ResponseGetUser } from '@/services/getUser/getUser';

export const useUserByEmail = (email: string) => {
  return useQuery<ResponseGetUser>({
    queryKey: ['getUser', email],
    queryFn: () => getUser({ email }),
    enabled: !!email, // hanya fetch jika email tidak kosong/null
  });
};
