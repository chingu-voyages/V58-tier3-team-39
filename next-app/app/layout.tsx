import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth-helpers';
import './globals.css';

import Header from '@/components/Header';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

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
      <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>
        <SessionProvider session={session}>
          <Header session={session} />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
