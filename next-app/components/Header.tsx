'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Moon, X } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  session: {
    user?: {
      name?: string | null;
    };
  } | null;
}

const Header = ({ session }: HeaderProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <header className="flex h-14 md:h-20 w-full items-center fixed top-0 z-20 font-semibold text-base md:text-lg px-4 md:px-8 text-[#636363] bg-white shadow-sm">
        <Link href="/" className="font-bold md:text-xl text-[#4D77FF] mr-6">
          Chingu Demographics
        </Link>

        <nav className="hidden md:flex items-center gap-6 flex-1">
          <Link href="/map">map</Link>
          <Link href="/list">list</Link>
          <Link href="/dashboard">dashboard</Link>

          <div className="ml-auto flex items-center gap-6">
            
              <ThemeToggle />
            

            {session?.user?.name && <span>Welcome {session.user.name}</span>}

            {session ? (
              <button onClick={() => signOut()} className="cursor-pointer">
                sign out
              </button>
            ) : (
              <Link href="/api/auth/signin" className="cursor-pointer">
                sign in
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
            className={`fixed top-0 right-0 h-full w-2/3 bg-white text-[#636363] z-30 shadow-xl p-6 pt-14 flex flex-col gap-8 md:hidden transform transition-transform duration-300 ${isActive ? 'translate-x-0' : 'translate-x-full'}`}
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
              className="text-xl font-semibold"
            >
              HOME
            </Link>
            <Link
              href="/map"
              onClick={() => setIsActive(false)}
              className="text-xl font-semibold"
            >
              MAP
            </Link>
            <Link
              href="/list"
              onClick={() => setIsActive(false)}
              className="text-xl font-semibold"
            >
              LIST
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setIsActive(false)}
              className="text-xl font-semibold"
            >
              DASHBOARD
            </Link>

            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#BFCDD2] mt-6">
              <Moon className="w-6 h-6" />
            </button>

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
                SIGN OUT
              </button>
            ) : (
              <Link
                href="/api/auth/signin"
                onClick={() => setIsActive(false)}
                className="text-xl font-semibold"
              >
                SIGN IN
              </Link>
            )}
          </nav>
        </>
      )}
    </>
  );
};

export default Header;
