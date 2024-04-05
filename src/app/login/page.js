"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false, // Prevent NextAuth from redirecting
      username: login,
      password: password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-300 to-blue-600">
      <div className="px-7 py-4 shadow-lg bg-white rounded-lg flex flex-col gap-4">
        <h1 className="text-xl text-black font-bold text-center">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Username or Email"
            className="p-2 border rounded-md text-black"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 border rounded-md text-black"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 color-black"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-black">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-700 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
