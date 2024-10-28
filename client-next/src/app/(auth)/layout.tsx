import React, { Suspense } from "react";
import LoadingComponent from "./_components/loading";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
}

export default AuthLayout;
