"use client";

import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+62");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidPhone = (number) => /^[0-9]{7,15}$/.test(number);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const user = auth.currentUser;
    if (!user) return;

    if (!isValidPhone(phone)) {
      setError("Please enter a valid phone number (7–15 digits, numbers only).");
      setLoading(false);
      return;
    }

    const fullPhone = `${countryCode}${phone}`;

    await setDoc(doc(db, "users", user.uid), {
      name: name.trim(),
      email: user.email,
      phone: fullPhone,
      balance: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-b from-[#FFF8E1] to-[#FFE082]">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="PowerDock Logo"
        className="h-12 sm:h-16 mb-6 object-contain"
      />
  
      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-[#FFE082] p-6">
        <h1 className="text-2xl font-bold text-center text-[#FF6F00] mb-6">
          Complete Your Profile
        </h1>
  
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 border border-[#FFE082] rounded-lg focus:ring focus:ring-[#FFB300]/50 focus:outline-none w-full"
          />
  
          {/* ✅ Responsive phone input */}
          <div className="flex items-center gap-2 w-full min-w-0">
  <select
    value={countryCode}
    onChange={(e) => setCountryCode(e.target.value)}
    className="p-2 border border-[#FFE082] rounded-lg bg-white focus:ring focus:ring-[#FFB300]/50 focus:outline-none w-[85px] flex-shrink-0"
  >
    <option value="+62">🇮🇩 +62</option>
    <option value="+60">🇲🇾 +60</option>
    <option value="+65">🇸🇬 +65</option>
    <option value="+1">🇺🇸 +1</option>
    <option value="+81">🇯🇵 +81</option>
  </select>

  <input
    type="tel"
    placeholder="Phone number"
    value={phone}
    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
    required
    className="p-2 border border-[#FFE082] rounded-lg flex-1 focus:ring focus:ring-[#FFB300]/50 focus:outline-none min-w-0"
  />
</div>

  
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
  
          <button
            type="submit"
            disabled={loading}
            className="bg-[#FFB300] text-white py-2 rounded-lg font-semibold hover:bg-[#FFA000] transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
  
      <p className="text-xs text-gray-500 mt-8">
        © 2025 PowerDock — Rent. Charge. Go.
      </p>
    </div>
  );
}
