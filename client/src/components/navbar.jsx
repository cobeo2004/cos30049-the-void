import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/image.png";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white text-black shadow-md">
      <div className="flex items-center">
        <img src={Logo} alt="AviAI Logo" className="h-16 mr-2" />
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
        </li>
        <li>
          <Link to="/flight-prices" className="hover:text-blue-500">
            Flight Prices
          </Link>
        </li>
        <li>
          <Link to="/flight-information" className="hover:text-blue-500">
            Flight Information
          </Link>
        </li>
      </ul>
    </nav>
  );
};
