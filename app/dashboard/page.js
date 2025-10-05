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

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}</h1>
      <button
        onClick={async () => {
          await signOut(auth);
          router.push("/login");
        }}
        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
      >
        Log Out
      </button>
    </div>
  );
}
