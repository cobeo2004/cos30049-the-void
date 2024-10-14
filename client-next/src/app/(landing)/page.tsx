import { type Metadata } from "next";
import { DashboardHome } from "./_components/DashboardHome";

import { Suspense } from "react";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default async function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardHome />
    </Suspense>
  );
}
