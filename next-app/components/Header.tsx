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

  const handleClick = () => setIsActive(!isActive);

  return (
    <>
      <header
        className="flex h-14 md:h-24 w-full justify-between items-center fixed top-0 z-20 
   font-semibold text-base md:text-lg p-4 md:px-16 text-[#636363]"
      >
        <Link
          href="/"
          onClick={() => setIsActive(false)}
          className="font-bold md:text-xl text-[#4D77FF]"
        >
          Chingu Demographics
        </Link>

        {/* toggle mobile */}
        <div onClick={handleClick} className="md:hidden">
          {isActive ? <X /> : <Menu />}
        </div>
        {/* desktop nav */}
        <nav className="hidden md:inline-flex items-center gap-5">
          <ul className="flex items-center gap-10">
            <li>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#BFCDD2] cursor-pointer">
                <Moon className="text-sm text-black" />
              </div>
            </li>
            <li>
              <Link href="/map">map</Link>
            </li>
            <li>
              <Link href="/list">list</Link>
            </li>
            {session?.user?.name && (
              <li>
                <span className="text-sm">Welcome {session.user.name}</span>
              </li>
            )}
            <li>
              {session ? (
                <button onClick={() => signOut()}>sign out</button>
              ) : (
                <Link href="/api/auth/signin">sign in</Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
      {/* mobile full screen nav */}
      {isActive && (
        <nav>
          <ul
            className="
            fixed inset-0 bg-white z-10
            flex flex-col items-center justify-center
            gap-10 text-4xl transition-transform duration-500 ease-out md:hidden

          "
          >
            <li>
              <Link href="/" onClick={() => setIsActive(false)}>
                HOME
              </Link>
            </li>
            <li>
              <Link href="/map" onClick={() => setIsActive(false)}>
                MAP
              </Link>
            </li>
            <li>
              <Link href="/list" onClick={() => setIsActive(false)}>
                LIST
              </Link>
            </li>
            {session?.user?.name && (
              <li>
                <span className="text-2xl">Welcome {session.user.name}</span>
              </li>
            )}
            <li>
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
                <Link
                  href="/api/auth/signin"
                  onClick={() => setIsActive(false)}
                >
                  SIGN IN
                </Link>
              )}
            </li>
            <li>
              <Link href="/" onClick={() => setIsActive(false)}>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#BFCDD2] ">
                  <Moon className="text-4xl" />
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Header;
