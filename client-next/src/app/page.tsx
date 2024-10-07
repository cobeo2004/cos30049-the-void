import { type Metadata } from "next";
import { DashboardHome } from "./_components/DashboardHome";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default function Home() {
  return <DashboardHome />;
}
