'use server';

import { signIn } from '@/lib/auth';

interface SignInResponse {
  error?: string;
  ok?: boolean;
}

export async function loginUser(email: string, password: string) {
  try {
    const res = await signIn('credentials', {
      email,
      password,
    
      redirect: true,
    }) as SignInResponse;

    if (res.error) {
      console.log('Login error:', res.error);
      return { success: false, message: res.error };
    }

    if (res.ok) {
      return { success: true, redirectTo: '/me' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
