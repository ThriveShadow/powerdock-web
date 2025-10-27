"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { Clock, PlusCircle, MapPin, Ticket, Home, QrCode, User } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) router.push("/login");
      else {
        setUser(currentUser);
        // Fetch balance from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) setBalance(userDoc.data().balance || 0);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!user)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8E1] to-[#FFE082]">
      {/* Top Bar */}
      <div className="flex justify-center items-center py-6">
        <img src="/logo.png" alt="PowerDock" className="h-8 sm:h-10 object-contain" />
      </div>

      {/* Balance Card */}
      <div className="flex justify-center mb-6">
        <div className="bg-white shadow-md rounded-xl px-6 py-4 w-[80%] text-center">
          <p className="text-gray-700 font-medium">Saldo Anda</p>
          <p className="text-2xl font-bold text-[#FF6F00]">
            Rp {balance?.toLocaleString("id-ID") || "0"}
          </p>
        </div>
      </div>

      {/* Menu Buttons */}
      <div className="flex flex-col gap-4 items-center w-full px-8 flex-1">
        <DashboardButton icon={<Clock size={24} />} label="Riwayat" color="#FFD54F" />
        <DashboardButton icon={<PlusCircle size={24} />} label="TopUp" color="#FFD54F" />
        <DashboardButton icon={<MapPin size={24} />} label="Lokasi" color="#FFD54F" />
        <DashboardButton icon={<Ticket size={24} />} label="Voucher" color="#FFD54F" />
      </div>

      {/* Bottom Nav */}
      <div className="flex justify-around items-center py-3 border-t border-gray-300 bg-white rounded-t-2xl">
        <NavItem icon={<Home size={22} />} label="Home" active />
        <NavItem icon={<QrCode size={22} />} label="Scan QR Code" />
        <NavItem icon={<User size={22} />} label="Profile" />
      </div>
    </div>
  );
}

// Reusable Dashboard button
function DashboardButton({ icon, label, color }) {
  return (
    <button
      className="w-full max-w-xs flex items-center gap-3 px-5 py-3 rounded-xl shadow-md font-semibold text-gray-800 text-lg"
      style={{ backgroundColor: color }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// Bottom navigation item
function NavItem({ icon, label, active }) {
  return (
    <button
      className={`flex flex-col items-center text-sm ${
        active ? "text-[#FF6F00]" : "text-gray-500"
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}
