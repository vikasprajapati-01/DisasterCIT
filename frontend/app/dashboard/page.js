"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If not logged in, redirect to login
  if (status === "loading") {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-96">
        <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}!</h1>
        <p className="text-lg">Email: {session.user?.email}</p>

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
