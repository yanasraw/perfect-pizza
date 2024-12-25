import React from 'react';
import { cn } from '@/shared/lib/utils';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
  className?: string;
  onClickSignIn?: () => void;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session, status } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button
          loading={status === 'loading'}
          onClick={onClickSignIn}
          variant={'outline'}
          className={status === 'loading' ? 'flex w-28 items-center gap-1' : 'flex items-center gap-1'}
        >
          <User size={16} />
          Sign in
        </Button>
      ) : (
        <Link href={`/profile`}>
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={16} />
            Profile
          </Button>
        </Link>
      )}
    </div>
  );
};
