"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-sm bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img
            src="https://placecats.com/60/60"
            alt="PowerDock logo"
            className="w-7 h-7 rounded-full"
          />
          <h1 className="font-bold text-lg sm:text-xl">PowerDock</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Login / Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
            <a href="#features" className="hover:text-blue-600 transition-colors" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors" onClick={() => setMenuOpen(false)}>Contact</a>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Login / Register
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center mt-12 px-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
          Rent. Charge. Go. ⚡
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl mb-8">
          PowerDock lets you rent powerbanks anytime, anywhere. Pick up, charge your phone, 
          and drop it off at any nearby station.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="#get-started"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition w-full sm:w-auto text-center"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="border border-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition w-full sm:w-auto text-center"
          >
            Learn More
          </a>
        </div>

        {/* Hero Image */}
        <div className="mt-10 w-full flex justify-center">
          <div className="relative w-full max-w-md sm:max-w-2xl aspect-[3/2]">
            <img
              src="https://placecats.com/800/500"
              alt="PowerDock demo placeholder"
              className="object-cover rounded-2xl shadow-lg w-full h-full"
            />
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="mt-24 px-6 max-w-5xl mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl font-bold mb-10">Why Choose PowerDock?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: "https://placecats.com/200/200",
              title: "Find Stations Easily",
              desc: "Use our map to locate the nearest charging dock in seconds."
            },
            {
              icon: "https://placecats.com/201/200",
              title: "Scan & Go",
              desc: "Simply scan the QR code to rent or return your powerbank."
            },
            {
              icon: "https://placecats.com/202/200",
              title: "Affordable & Fast",
              desc: "Low hourly rates and instant charging to keep you powered up."
            }
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl shadow p-6">
              <img src={icon} alt={title} width={60} height={60} className="mx-auto mb-4 rounded-lg" />
              <h4 className="font-semibold text-lg mb-2">{title}</h4>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-24 bg-gray-900 text-gray-300 py-12 text-center px-6">
        <h4 className="text-xl sm:text-2xl font-bold mb-4 text-white">Power up with PowerDock</h4>
        <p className="mb-6 text-sm sm:text-base">Join the network of users who never run out of battery.</p>
        <a
          href="#get-started"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Get Started Now
        </a>
        <p className="mt-8 text-xs sm:text-sm text-gray-500">© 2025 PowerDock. All rights reserved.</p>
      </footer>
    </div>
  );
}
