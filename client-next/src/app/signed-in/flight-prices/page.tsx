import Footer from "@/app/(landing)/_components/Footer";
import React from "react";
import FlightPricesSearchMenu from "./_components/FlightPricesSearchMenu";

function FlightPricePage() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-t from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] to-100% flex flex-col">
        <FlightPricesSearchMenu />
      </div>
      <Footer
        bgColor="bg-gradient-to-b from-[#FFFFFF] via-[#D0F0FD] to-[#18BFFF]"
        className="border-transparent"
      />
    </>
  );
}

export default FlightPricePage;
