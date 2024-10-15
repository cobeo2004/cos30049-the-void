import Footer from "@/app/(landing)/_components/Footer";
import { Navbar } from "@/app/(landing)/_components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="h-screen w-screen">{children}</div>
      <Footer />
    </>
  );
}
