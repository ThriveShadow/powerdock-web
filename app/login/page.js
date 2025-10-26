"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, provider, db } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          router.push("/onboarding");
          return;
        }

        const data = snap.data();
        if (!data.name || !data.phone) router.push("/onboarding");
        else router.push("/dashboard");
      }
    });
    return () => unsub();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let userCred;
      if (isRegister)
        userCred = await createUserWithEmailAndPassword(auth, email, password);
      else userCred = await signInWithEmailAndPassword(auth, email, password);

      const user = userCred.user;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          email: user.email,
          balance: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        router.push("/onboarding");
      } else {
        const data = snap.data();
        if (!data.name || !data.phone) router.push("/onboarding");
        else router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          email: user.email,
          name: user.displayName || "",
          balance: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        router.push("/onboarding");
      } else {
        const data = snap.data();
        if (!data.name || !data.phone) router.push("/onboarding");
        else router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E1] to-[#FFE082] flex flex-col justify-center items-center px-4">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="PowerDock Logo"
        className="h-12 sm:h-16 mb-6 object-contain"
      />

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-[#FFE082]">
        <h1 className="text-2xl font-bold text-center text-[#FF6F00]">
          {isRegister ? "Create your account" : "Welcome back!"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-[#FFE082] rounded-lg p-2 focus:ring focus:ring-[#FFB300]/50 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-[#FFE082] rounded-lg p-2 focus:ring focus:ring-[#FFB300]/50 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFB300] text-white py-2 rounded-lg font-semibold hover:bg-[#FFA000] transition disabled:opacity-60"
          >
            {loading
              ? isRegister
                ? "Creating..."
                : "Signing in..."
              : isRegister
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        <div className="flex items-center gap-2 my-3">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full border border-[#FFE082] flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-[#FFF3E0] transition"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>

        <p className="text-sm text-center text-gray-600 mt-3">
          {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#FF6F00] font-semibold hover:underline"
          >
            {isRegister ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-500 mt-8">
        © 2025 PowerDock — Rent. Charge. Go.
      </p>
    </div>
  );
}
