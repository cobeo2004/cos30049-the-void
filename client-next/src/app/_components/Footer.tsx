import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/image.png";
function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#FFF8F8] to-[#8BDFFF] py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src={Logo} alt="AviAI Logo" width={40} height={40} />
          <span className="ml-2 text-lg font-semibold">AviAI</span>
          <span className="ml-2 text-sm">
            Predicting Skies, Optimizing Flies
          </span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/resources" className="text-sm hover:underline">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/flight-prices" className="text-sm hover:underline">
                Flight Prices
              </Link>
            </li>
            <li>
              <Link
                href="/flight-information"
                className="text-sm hover:underline"
              >
                Flight Information
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="https://facebook.com" aria-label="Facebook">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </Link>
          <Link href="https://twitter.com" aria-label="Twitter">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </Link>
          <Link href="https://linkedin.com" aria-label="LinkedIn"></Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
