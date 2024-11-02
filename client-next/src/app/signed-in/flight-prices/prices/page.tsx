import React from "react";
import { FlightPricesTable } from "../_components/FlightPricesTable";
import Footer from "@/app/(landing)/_components/Footer";

function FlightPricesPage() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-t from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] to-100% py-20 flex flex-col items-center justify-center">
        <div className="pb-96">
          <header className="w-full max-w-7xl mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0B76B7] to-[#1C5BD9] bg-clip-text text-transparent">
              Prices from Google Flights
            </h1>
          </header>
          <div className="w-full max-w-[120vh] mx-auto">
            <FlightPricesTable />
          </div>
        </div>
      </div>
      <Footer
        bgColor="bg-gradient-to-b from-[#FFFFFF] via-[#D0F0FD] to-[#18BFFF]"
        className="border-transparent"
      />
    </>
  );
}

export default FlightPricesPage;
