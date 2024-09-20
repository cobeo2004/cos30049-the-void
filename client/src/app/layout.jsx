import React from "react";

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {React.JSX.Element}
 */
const RootLayout = (props) => {
  return (
    <div>
      <h1>Root Layout</h1>
      {props.children}
    </div>
  );
};

export default RootLayout;
