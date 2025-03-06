"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Disaster Management</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center justify-center">
          <li><button onClick={scrollToTop} className="hover:text-gray-400 cursor-pointer">Home</button></li>
          <li><a href="#services" className="hover:text-gray-400 cursor-pointer">Services</a></li>
          <li><a href="#about" className="hover:text-gray-400 cursor-pointer">About</a></li>
          <li><a href="#contact" className="hover:text-gray-400 cursor-pointer">Contact</a></li>
          <li><Link href="/prediction">Prediction</Link></li>
          <li>
            <Link href="/login">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold transition-all">
                Login
              </button>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-gray-800 py-4 space-y-4 absolute top-16 left-0 w-full">
          <li><button onClick={scrollToTop} className="hover:text-gray-400 cursor-pointer">Home</button></li>
          <li><a href="#services" onClick={() => setIsOpen(false)} className="hover:text-gray-400 cursor-pointer">Services</a></li>
          <li><a href="#about" onClick={() => setIsOpen(false)} className="hover:text-gray-400 cursor-pointer">About</a></li>
          <li><a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-gray-400 cursor-pointer">Contact</a></li>
          <li>
            <Link href="/login">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold transition-all">
                Login
              </button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
