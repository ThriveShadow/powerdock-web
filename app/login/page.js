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

  // ✅ Check auth state and user profile completeness
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
        if (!data.name || !data.phone) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
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
      else
        userCred = await signInWithEmailAndPassword(auth, email, password);

      const user = userCred.user;
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      // ✅ Check if user doc exists and has complete info
      if (!snap.exists()) {
        await setDoc(userRef, {
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
      console.error(err);
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
    <div className="h-[100dvh] flex flex-col justify-center items-center bg-gray-50 px-4 overflow-hidden">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          {isRegister ? "Create an account" : "Welcome back"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
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
          className="w-full border flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <p className="text-sm text-center text-gray-500 mt-3">
          {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 hover:underline"
          >
            {isRegister ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}
