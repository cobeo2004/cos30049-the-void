import React, { Suspense } from "react";
import LoadingComponent from "../(auth)/_components/loading";

async function layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
}

export default layout;
