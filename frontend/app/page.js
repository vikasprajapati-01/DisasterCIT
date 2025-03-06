"use client";
import Navbar from "./component/navbar";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_center,_#0a1128,_#001f3f)] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-32 px-6 flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Disaster Management System</h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-3xl text-center">
          Stay informed. Stay safe. Get real-time disaster alerts and emergency resources to protect yourself and your loved ones.
        </p>
        <Link href="#services">
          <button className="mt-8 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full font-bold text-lg shadow-lg transition-all">
            Explore Services
          </button>
        </Link>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">About the Website</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Our platform provides real-time disaster alerts, emergency contacts, and safety measures to help individuals stay prepared during crises.
        </p>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-6">How It Works</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          We gather real-time disaster data from trusted sources and deliver alerts and emergency information directly to you.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-3">Real-Time Alerts</h3>
            <p className="text-gray-300">Receive instant updates on disasters happening in your area.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-3">Emergency Contacts</h3>
            <p className="text-gray-300">Access national and local emergency helplines easily.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-3">Safety Guidelines</h3>
            <p className="text-gray-300">Learn how to prepare and respond effectively during a disaster.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Have questions? Reach out to our support team anytime.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Emergency Helpline */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md flex items-center gap-4">
            <FaPhoneAlt className="text-green-400 text-2xl" />
            <p>National Helpline: <strong>+91 1123456789</strong></p>
          </div>

          {/* Fire Department */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md flex items-center gap-4">
            <FaPhoneAlt className="text-red-400 text-2xl" />
            <p>Fire Department: <strong>101</strong></p>
          </div>

          {/* Medical Emergency */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md flex items-center gap-4">
            <FaPhoneAlt className="text-blue-400 text-2xl" />
            <p>Medical Emergency: <strong>102</strong></p>
          </div>

          {/* Disaster Relief */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md flex items-center gap-4">
            <FaPhoneAlt className="text-yellow-400 text-2xl" />
            <p>Disaster Relief: <strong>108</strong></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-900">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Disaster Management System. All rights reserved.</p>
      </footer>
    </main>
  );
}
