import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../constants/auth-options';

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/not-auth');
  }

  return session?.user ?? null;
};
