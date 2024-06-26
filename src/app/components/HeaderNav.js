"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function HeaderNav() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!session) return;
      try {
        const response = await fetch("/api/user/details");
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await response.json();
        setUsername(userData.username);
        setProfileImage(
          userData.profile_imageurl || "/images/ProfilePlaceholder.webp"
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [session]);

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
        {session && (
          <Link
            href="/userprofile"
            className="text-blue-600 hover:text-blue-800"
          >
            Profile
          </Link>
        )}

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">{username}</span>
                <img
                  src={profileImage}
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
