'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, House, Map, List, LayoutDashboard } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ThemeToggle } from './ThemeToggle';
import Chingu from './icons/Chingu';
import { usePathname } from 'next/navigation';
import Button from './ui/Button';
import Google from './icons/Google';

interface HeaderProps {
  session: {
    user?: {
      name?: string | null;
    };
  } | null;
}

const Header = ({ session }: HeaderProps) => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  const linkTextStyle = (href: string) =>
    pathname === href
      ? 'text-blue-brand'
      : 'text-secondary-text hover:text-blue-brand/50';

  return (
    <>
      <header className="flex mx-auto h-14 md:h-20 w-full bg-background items-center fixed top-0 z-20 font-semibold px-4 md:px-8 gap-10">
        <Link href="/" className="font-bold mr-6">
          <div className="flex gap-2 items-center">
            <Chingu className="h-11 w-11" />
            <div
              className={`flex flex-col leading-5 tracking-widest text-sm md:text-base lg:text-lg ${pathname !== '/' ? 'hover:text-blue-brand/50' : ''}`}
            >
              <span>CHINGU</span>
              <span>DEMOGRAPHICS</span>
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 flex-1">
          <Link href="/map" className={linkTextStyle('/map')}>
            Map
          </Link>
          <Link href="/list" className={linkTextStyle('/list')}>
            List
          </Link>
          <Link href="/dashboard" className={linkTextStyle('/dashboard')}>
            Dashboard
          </Link>

          <div className="ml-auto flex items-center gap-6">
            <ThemeToggle />
            {session?.user?.name && <span>Welcome {session.user.name}</span>}
            {session ? (
              <Button
                variant="secondary"
                className="flex gap-1 px-4! py-2! text-sm!"
                onClick={() => signOut()}
              >
                <Google /> Sign out
              </Button>
            ) : (
              <Link href="/api/auth/signin" className="cursor-pointer">
                Sign in
              </Link>
            )}
          </div>
        </nav>

        <button
          onClick={() => setIsActive(!isActive)}
          className="md:hidden ml-auto"
        >
          {!isActive && <Menu />}
        </button>
      </header>

      {isActive && (
        <>
          <div
            onClick={() => setIsActive(false)}
            className={`fixed inset-0 bg-black/40 z-20 md:hidden transition-opacity duration-300 ${
              isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />

          <nav
            className={`fixed top-0 right-0 h-full w-2/3 bg-secondary-bg z-30 rounded-tl-2xl shadow-xl p-6 pt-14 flex flex-col gap-8 md:hidden transform transition-transform duration-300 ${isActive ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <button
              onClick={() => setIsActive(false)}
              className="absolute top-4 right-4"
            >
              <X className="w-6 h-6 " />
            </button>

            <Link
              href="/"
              onClick={() => setIsActive(false)}
              className="text-xl font-semibold flex gap-2 items-center"
            >
              <House />
              Homepage
            </Link>
            <Link
              href="/map"
              onClick={() => setIsActive(false)}
              className="text-xl font-semibold flex gap-2 items-center"
            >
              <Map />
              Map View
            </Link>
            <Link
              href="/list"
              onClick={() => setIsActive(false)}
              className="text-xl font-semibold flex gap-2 items-center"
            >
              <List />
              List View
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setIsActive(false)}
              className="text-xl font-semibold flex gap-2 items-center"
            >
              <LayoutDashboard />
              Dashboard
            </Link>

            <div className="w-10 h-10 flex items-center justify-center rounded-full  mt-6">
              <ThemeToggle />
            </div>

            {session?.user?.name && (
              <span className="text-xl font-semibold mt-4">
                Welcome {session.user.name}
              </span>
            )}

            {session ? (
              <button
                onClick={() => {
                  signOut();
                  setIsActive(false);
                }}
                className="text-xl font-semibold"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/api/auth/signin"
                onClick={() => setIsActive(false)}
                className="text-xl font-semibold"
              >
                Sign in
              </Link>
            )}
          </nav>
        </>
      )}
    </>
  );
};

export default Header;
