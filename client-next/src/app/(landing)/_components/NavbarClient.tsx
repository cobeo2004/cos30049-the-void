/**
 * @file NavbarClient.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Client-side navigation component that handles user authentication state
 * and provides navigation links for both desktop and mobile views
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { RainbowButton } from "@/components/ui/rainbow-button";
import AvatarDropdown from "./AvatarDropdown";
import Logo from "@/assets/images/image.png";
import { LoginResult } from "@/types";
import { Menu, Home, Plane, Info, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/server/auth/logout";
import { Button } from "@/components/ui/button";

// NavLink component for consistent link styling and active state handling
const NavLink = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  // Check if current path matches the link or is a sub-route
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
        isActive
          ? "bg-gradient-to-t from-[#8BDFFF] from-0% via-[#18BFFF] via-53% to-[#0B76B7] to-100% text-primary-foreground"
          : "hover:bg-gradient-to-t hover:from-[#8BDFFF] hover:from-0% hover:via-[#18BFFF] hover:via-53% hover:to-[#0B76B7] hover:to-100%"
      }`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {children}
    </Link>
  );
};

export const NavbarClient = ({ session }: { session: LoginResult | null }) => {
  const router = useRouter();

  // Refresh the page when session changes to null
  React.useEffect(() => {
    if (session === null) {
      router.refresh();
    }
  }, [session, router]);

  return (
    <nav className="flex justify-between items-center p-4 bg-background text-foreground shadow-md border-b border-border relative">
      {/* Logo and brand link */}
      <Link href="/" className="flex items-center">
        <Image src={Logo} alt="AviAI Logo" width={150} height={150} />
      </Link>

      {/* Desktop navigation links */}
      <ul className="hidden md:flex space-x-4">
        <NavLink href="/" icon={Home}>
          Home
        </NavLink>
        <NavLink href="/signed-in/flight-prices" icon={Plane}>
          Flight Prices
        </NavLink>
        <NavLink href="/signed-in/flight-informations" icon={Info}>
          Price Predictions
        </NavLink>
      </ul>

      {/* Desktop authentication section */}
      <div className="hidden md:block">
        {session?.user ? (
          <AvatarDropdown user={session.user} />
        ) : (
          <Link href="/login">
            <RainbowButton className="w-[120px]">Login</RainbowButton>
          </Link>
        )}
      </div>

      {/* Mobile navigation menu */}
      <div className="md:hidden flex items-center">
        <DropdownMenu>
          {/* Mobile menu trigger button */}
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>

          {/* Mobile menu content */}
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>AviAI</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Mobile navigation links */}
            <DropdownMenuItem asChild>
              <NavLink href="/" icon={Home}>
                Home
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NavLink href="/signed-in/flight-prices" icon={Plane}>
                Flight Prices
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NavLink href="/signed-in/flight-informations" icon={Info}>
                Price Predictions
              </NavLink>
            </DropdownMenuItem>

            {/* Mobile authentication section */}
            {session?.user ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => await logOut()}
                  className="text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/login">
                  <RainbowButton className="w-full">Login</RainbowButton>
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Show avatar dropdown in mobile view if user is logged in */}
        {session?.user && <AvatarDropdown user={session.user} />}
      </div>
    </nav>
  );
};
