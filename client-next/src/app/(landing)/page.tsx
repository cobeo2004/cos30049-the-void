import { DashboardHome } from "./_components/DashboardHome";

import { Navbar } from "./_components/Navbar";
export default async function Home() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="h-screen w-screen">
        <DashboardHome />
      </div>
    </>
  );
}
