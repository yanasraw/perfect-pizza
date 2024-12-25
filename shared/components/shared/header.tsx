'use client';
import { cn } from '@/shared/lib/utils';
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from './index';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import toast from 'react-hot-toast';
interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  classname?: string;
}
export const Header: React.FC<Props> = ({ classname, hasSearch = true, hasCart = true }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'The order is paid!';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Your account has been activated!';
    }

    if (toastMessage) {
      setTimeout(() => {
        toast.success(toastMessage, { duration: 3000 });
        router.replace('/');
      }, 500);
    }
  }, []);

  return (
    <header className={cn('border-b', classname)}>
      <Container className="flex items-center justify-between py-8">
        <Link href={'/'}>
          <div className="flex items-center gap-4">
            <Image src={'/assets/logo.png'} alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Perfect Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">tastes better than ever</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1 ">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
