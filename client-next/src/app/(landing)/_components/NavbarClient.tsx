"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { RainbowButton } from "@/components/ui/rainbow-button";
import AvatarDropdown from "./AvatarDropdown";
import Logo from "@/assets/images/image.png";
import { LoginResult } from "@/types";

export const NavbarClient = ({ session }: { session: LoginResult | null }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (session === null) {
      router.refresh();
    }
  }, [session, router]);

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
            href="/signed-in/flight-prices"
            className={`px-3 py-2 rounded-md ${
              pathname === "/signed-in/flight-prices"
                ? "text-blue-500"
                : "hover:text-blue-500"
            }`}
          >
            Flight Prices
          </Link>
        </li>
        <li>
          <Link
            href="/signed-in/flight-informations"
            className={`px-3 py-2 rounded-md ${
              pathname === "/signed-in/flight-informations"
                ? "text-blue-500"
                : "hover:text-blue-500"
            }`}
          >
            Flight Information
          </Link>
        </li>
      </ul>
      {session?.user ? (
        <AvatarDropdown user={session.user} />
      ) : (
        <Link href="/login">
          <RainbowButton className="mr-8 w-[120px]">Login</RainbowButton>
        </Link>
      )}
    </nav>
  );
};
