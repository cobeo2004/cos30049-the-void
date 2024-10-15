import { DashboardHome } from "./_components/DashboardHome";

import { Suspense } from "react";
import { Navbar } from "./_components/Navbar";
import LoadingSpinner from "@/components/ui/loading-spinner";
export default function Home() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <LoadingSpinner />
          </div>
        }
      >
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        <div className="h-screen w-screen">
          <DashboardHome />
        </div>
      </Suspense>
    </>
  );
}
