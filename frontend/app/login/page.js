"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect user if already logged in
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-96">
        <h1 className="text-2xl font-bold mb-6">Login to Disaster Management</h1>

        {/* Google Login */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg mb-4"
        >
          <FaGoogle className="mr-3" /> Sign in with Google
        </button>

        {/* GitHub Login */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center w-full bg-gray-700 hover:bg-gray-800 py-3 rounded-lg mb-4"
        >
          <FaGithub className="mr-3" /> Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
