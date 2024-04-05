"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed");
      }

      router.push("/login");
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-300 to-blue-600">
      <div className="px-7 py-4 shadow-lg bg-white rounded-lg flex flex-col gap-4">
        <h1 className="text-xl text-black font-bold text-center">Sign up</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignup} className="flex flex-col gap-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="p-2 border rounded-md text-black"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Signup
          </button>
          <p className="text-sm text-center text-black">
            Have an account?{" "}
            <Link href="/login" className="text-blue-700 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
