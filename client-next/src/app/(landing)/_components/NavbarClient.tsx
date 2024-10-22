"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { RainbowButton } from "@/components/ui/rainbow-button";
import AvatarDropdown from "./AvatarDropdown";
import Logo from "@/assets/images/image.png";
import { LoginResult } from "@/types";
import {
  Menu,
  Home,
  Plane,
  Info,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
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
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
      }`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {children}
    </Link>
  );
};

export const NavbarClient = ({ session }: { session: LoginResult | null }) => {
  const router = useRouter();

  console.log("userValue: ", session?.user);

  React.useEffect(() => {
    if (session === null) {
      router.refresh();
    }
  }, [session, router]);

  return (
    <nav className="flex justify-between items-center p-4 bg-background text-foreground shadow-md border-b border-border relative">
      <div className="flex items-center">
        <Image src={Logo} alt="AviAI Logo" width={150} height={150} />
      </div>

      {/* Desktop view */}
      <ul className="hidden md:flex space-x-4">
        <NavLink href="/" icon={Home}>
          Home
        </NavLink>
        <NavLink href="/signed-in/flight-prices" icon={Plane}>
          Flight Prices
        </NavLink>
        <NavLink href="/signed-in/flight-informations" icon={Info}>
          Flight Information
        </NavLink>
      </ul>
      <div className="hidden md:block">
        {session?.user ? (
          <AvatarDropdown user={session.user} />
        ) : (
          <Link href="/login">
            <RainbowButton className="w-[120px]">Login</RainbowButton>
          </Link>
        )}
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Navigation</DropdownMenuLabel>
            <DropdownMenuSeparator />
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
                Flight Information
              </NavLink>
            </DropdownMenuItem>
            {session?.user ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help" className="flex items-center">
                    <HelpCircle className="mr-2 h-4 w-4" /> Help
                  </Link>
                </DropdownMenuItem>
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
        {session?.user && <AvatarDropdown user={session.user} />}
      </div>
    </nav>
  );
};
