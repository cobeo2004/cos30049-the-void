import Footer from "@/app/(landing)/_components/Footer";
import React from "react";
import SearchMenu from "./_components/SearchMenu";

function FlightPricePage() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-t from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] to-100% flex flex-col">
        <SearchMenu />
      </div>
      <Footer />
    </>
  );
}

export default FlightPricePage;
