import NextAuth from 'next-auth';
import { authConfig } from './auth';

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
