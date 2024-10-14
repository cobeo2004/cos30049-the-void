"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/assets/images/image.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RainbowButton } from "@/components/ui/rainbow-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center p-4 bg-white text-black shadow-md border-b border-gray-200 posit">
      <div className="flex items-center">
        <Image src={Logo} alt="AviAI Logo" width={150} height={150} />
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link
            href="/"
            className={`px-3 py-2 rounded-md ${
              pathname === "/" ? "text-blue-500" : "hover:text-blue-500"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/flight-prices"
            className={`px-3 py-2 rounded-md ${
              pathname === "/flight-prices"
                ? "text-blue-500"
                : "hover:text-blue-500"
            }`}
          >
            Flight Prices
          </Link>
        </li>
        <li>
          <Link
            href="/flight-information"
            className={`px-3 py-2 rounded-md ${
              pathname === "/flight-information"
                ? "text-blue-500"
                : "hover:text-blue-500"
            }`}
          >
            Flight Information
          </Link>
        </li>
      </ul>
      <RainbowButton className="mr-8 w-[120px]">Login</RainbowButton>
    </nav>
  );
};
