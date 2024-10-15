"use client";

import React from "react";
import { Facebook, Twitter, Youtube, Linkedin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/image.png";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const pathname = usePathname();

  return (
    <footer className="bg-gradient-to-t from-[#FFFFFF] via-[#D0F0FD] to-[#18BFFF] text-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-row md:flex-row justify-between items-start">
          {/* Logo and Company Info */}
          <div className="mb-8 md:mb-0">
            <Image
              src={logo}
              alt="AviAI logo"
              width={200}
              height={50}
              className="mb-4"
            />
            <p className="text-xl font-bold mb-4">
              Predicting Skies, Optimizing Flies
            </p>
            <div className="flex items-center">
              <Phone size={18} className="mr-2 text-gray-600" />
              <span className="text-lg">+81 69996699</span>
            </div>
          </div>

          {/* Resources */}
          <div className="mb-8 md:mb-0">
            <h3 className="font-bold text-xl mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className={`font-semibold text-base ${
                    pathname === "/"
                      ? "text-[#3758F9]"
                      : "text-gray-700 hover:text-[#3758F9]"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/flight-prices"
                  className={`font-semibold text-base ${
                    pathname === "/flight-prices"
                      ? "text-[#3758F9]"
                      : "text-gray-700 hover:text-[#3758F9]"
                  }`}
                >
                  Flight Prices
                </Link>
              </li>
              <li>
                <Link
                  href="/flight-information"
                  className={`font-semibold text-base ${
                    pathname === "/flight-information"
                      ? "text-[#3758F9]"
                      : "text-gray-700 hover:text-[#3758F9]"
                  }`}
                >
                  Flight Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-xl mb-4">Follow Us On</h3>
            <div className="flex space-x-4 mb-6">
              <Link
                href="#"
                className="bg-white p-2 rounded-full border border-gray-300 hover:bg-blue-50"
              >
                <Facebook size={24} className="text-[#3B5998]" />
              </Link>
              <Link
                href="#"
                className="bg-white p-2 rounded-full border border-gray-300 hover:bg-blue-50"
              >
                <Twitter size={24} className="text-[#1DA1F2]" />
              </Link>
              <Link
                href="#"
                className="bg-white p-2 rounded-full border border-gray-300 hover:bg-blue-50"
              >
                <Youtube size={24} className="text-[#FF0000]" />
              </Link>
              <Link
                href="#"
                className="bg-white p-2 rounded-full border border-gray-300 hover:bg-blue-50"
              >
                <Linkedin size={24} className="text-[#0A66C2]" />
              </Link>
            </div>
            {/* Copyright */}
            <div className="text-left mt-8 text-sm text-gray-600">
              © 2024 AviAI
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;