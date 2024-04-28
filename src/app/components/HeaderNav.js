import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function HeaderNav() {
  const { data: session } = useSession();

  return (
    <header className="bg-slate-700 shadow-md p-4 flex justify-between items-center px-20">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/images/CatalogLogo.webp"
            alt="Car Catalog"
            width={100}
            height={50}
            className="rounded-full"
          />
        </Link>
      </div>

      <nav className="flex items-center gap-20 text-2xl">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          Home
        </Link>
        <Link href="/about" className="text-blue-600 hover:text-blue-800">
          About
        </Link>
        <Link href="/cars" className="text-blue-600 hover:text-blue-800">
          Cars
        </Link>
        {session && (
          <Link href="/favorites" className="text-blue-600 hover:text-blue-800">
            Favorites
          </Link>
        )}

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <div className="flex items-center gap-2">
                <Link href="userProfile" className="text-blue-600 hover:text-blue-800" >
                <span className="text-blue-600">{session.user.name}</span>


                </Link>
                <Image
                  src="/images/ProfilePlaceholder.webp"
                  alt="Profile"
                  width={100}
                  height={40}
                  className="rounded-full mr-4"
                />
                <button
                  onClick={() => signOut()}
                  className="bg-blue-500 text-white px-5 py-1 rounded-md hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 text-white px-5 py-1 rounded-md hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
