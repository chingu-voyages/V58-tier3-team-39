import Link from 'next/link';
import { signOut } from '@/lib/auth-helpers';

interface HeaderProps {
  session: {
    user?: {
      name?: string | null;
    };
  } | null;
}

const Header = ({ session }: HeaderProps) => {
  return (
    <header className="w-full h-[70vh] bg-gray-800 text-white flex flex-col items-center">
      <div className="w-full max-w-7xl px-4">
        <div className="flex justify-between items-center pt-6 pb-4">
          <div>
            {session?.user?.name && (
              <span className="text-2xl">Welcome {session.user.name}</span>
            )}
          </div>
          {session ? (
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button
                type="submit"
                className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/api/auth/signin"
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              Sign in
            </Link>
          )}
        </div>
        <h1 className="text-5xl text-center mt-12">Chingu Project</h1>
      </div>
    </header>
  );
};

export default Header;
