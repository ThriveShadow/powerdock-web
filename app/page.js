import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white">
        <div className="flex items-center gap-2">
          <Image src="/battery.svg" alt="PowerDock logo" width={32} height={32} />
          <h1 className="font-bold text-xl">PowerDock</h1>
        </div>
        <div className="space-x-6 text-sm font-medium">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center mt-16 px-6">
        <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4">
          Rent. Charge. Go. ⚡
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8">
          PowerDock lets you rent powerbanks anytime, anywhere. Pick up, charge your phone, 
          and drop it off at any nearby station.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row">
          <a
            href="#get-started"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="border border-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </div>
        <div className="mt-12">
          <Image
            src="/powerbank-demo.png"
            alt="PowerDock app preview"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </div>
      </main>

      {/* Features */}
      <section id="features" className="mt-24 px-8 max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-10">Why Choose PowerDock?</h3>
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <Image src="/location.svg" alt="Map" width={40} height={40} className="mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Find Stations Easily</h4>
            <p className="text-gray-600">Use our map to locate the nearest charging dock in seconds.</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <Image src="/phone.svg" alt="Phone" width={40} height={40} className="mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Scan & Go</h4>
            <p className="text-gray-600">Simply scan the QR code to rent or return your powerbank.</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <Image src="/clock.svg" alt="Clock" width={40} height={40} className="mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Affordable & Fast</h4>
            <p className="text-gray-600">Low hourly rates and instant charging to keep you powered up.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-24 bg-gray-900 text-gray-300 py-12 text-center">
        <h4 className="text-2xl font-bold mb-4 text-white">Power up with PowerDock</h4>
        <p className="mb-6">Join the network of users who never run out of battery.</p>
        <a
          href="#get-started"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Get Started Now
        </a>
        <p className="mt-8 text-sm text-gray-500">© 2025 PowerDock. All rights reserved.</p>
      </footer>
    </div>
  );
}
