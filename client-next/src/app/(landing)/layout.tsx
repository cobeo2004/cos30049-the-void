import { type Metadata } from "next";
import LoadingComponent from "../(auth)/_components/loading";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
}
