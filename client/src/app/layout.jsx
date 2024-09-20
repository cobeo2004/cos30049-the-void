import React from "react";
import { Navbar } from "components/navbar";
/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {React.JSX.Element}
 */
const RootLayout = (props) => {
  return (
    <div>
      <Navbar />
      <div className="h-screen w-full">{props.children}</div>
    </div>
  );
};

export default RootLayout;
