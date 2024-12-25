'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues, TFormRegisterValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../../title';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

interface Props {
  onClose: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success('Login successful');

      onClose?.();
    } catch (error) {
      console.log('[LOGIN] ', error);
      toast.error('Wrong email or password');
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Sign in to your account" size="md" className="font-bold" />
            <p className="text-gray-400">Enter your email to log in to your account</p>
          </div>
          <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" placeholder="Email" label="E-mail" required />
        <FormInput name="password" type="password" placeholder="Password" label="Password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Sign in
        </Button>
      </form>
    </FormProvider>
  );
};
