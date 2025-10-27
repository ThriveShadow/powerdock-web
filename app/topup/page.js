"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function TopUpPage() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // load Midtrans Snap script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY);
    document.body.appendChild(script);
  }, []);

  const handleTopUp = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first.");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      // Get Snap token
      const res = await fetch("/api/topup-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseInt(amount),
          email: user.email,
          uid: user.uid,
        }),
      });

      const { token } = await res.json();
      if (!token) throw new Error("Failed to get payment token");

      // Show Snap popup
      window.snap.pay(token, {
        onSuccess: async function () {
          // ✅ update Firestore after payment success
          const ref = doc(db, "users", user.uid);
          await updateDoc(ref, {
            balance: increment(parseInt(amount)),
          });

          alert("Top up successful!");
          router.push("/dashboard");
        },
        onPending: function () {
          alert("Payment pending. Please complete it to get the balance.");
        },
        onError: function () {
          alert("Payment failed. Please try again.");
        },
        onClose: function () {
          console.log("User closed payment window");
        },
      });
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF8E1] to-[#FFE082] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-[#FF6F00] mb-4">Top Up Balance</h1>
        <input
          type="number"
          placeholder="Enter amount (IDR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-[#FFB300]/50 rounded-lg px-4 py-2 mb-4 text-center focus:ring-2 focus:ring-[#FFB300] outline-none"
        />
        <button
          onClick={handleTopUp}
          disabled={loading}
          className="w-full bg-[#FFB300] text-white py-2 rounded-lg font-semibold hover:bg-[#FFA000] transition disabled:opacity-60"
        >
          {loading ? "Processing..." : "Top Up Now"}
        </button>
      </div>
    </div>
  );
}
