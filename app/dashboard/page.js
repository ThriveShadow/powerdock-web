"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/login");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  if (!user)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Profile Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-4">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl">
            {user.email?.[0]?.toUpperCase()}
          </div>
        )}

        <h1 className="text-2xl font-bold text-gray-800">
          {user.displayName || user.email}
        </h1>
        <p className="text-gray-500">{user.email}</p>

        <button
          onClick={async () => {
            await signOut(auth);
            router.push("/login");
          }}
          className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
