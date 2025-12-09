import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth-helpers';
import './globals.css';

import Header from '@/components/Header';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Chingu Demographics',
  description: 'Demographic insights and data visualizations about the Chingu community.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`} suppressHydrationWarning>
        <SessionProvider session={session}>
          <Header session={session} />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
