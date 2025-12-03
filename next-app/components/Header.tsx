'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Moon, X } from 'lucide-react';
import { signOut } from 'next-auth/react';

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
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#BFCDD2]">
              <Moon className="w-4 h-4 text-black" />
            </button>

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
          {isActive ? <X /> : <Menu />}
        </button>
      </header>

      {isActive && (
        <nav className="fixed inset-0 bg-white z-2000 flex flex-col items-center justify-center gap-10 text-4xl md:hidden">
          <Link href="/" onClick={() => setIsActive(false)}>
            HOME
          </Link>
          <Link href="/map" onClick={() => setIsActive(false)}>
            MAP
          </Link>
          <Link href="/list" onClick={() => setIsActive(false)}>
            LIST
          </Link>
          <Link href="/dashboard" onClick={() => setIsActive(false)}>
            DASSHBOARD
          </Link>

          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#BFCDD2]">
            <Moon className="w-6 h-6" />
          </button>

          {session?.user?.name && (
            <span className="text-2xl">Welcome {session.user.name}</span>
          )}

          {session ? (
            <button
              onClick={() => {
                signOut();
                setIsActive(false);
              }}
            >
              SIGN OUT
            </button>
          ) : (
            <Link href="/api/auth/signin" onClick={() => setIsActive(false)}>
              SIGN IN
            </Link>
          )}
        </nav>
      )}
    </>
  );
};

export default Header;
