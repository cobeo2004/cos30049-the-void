import Footer from "@/app/(landing)/_components/Footer";
import React from "react";
import FlightInformationsSearchMenu from "./_components/FlightInformationsSearchMenu";

function FlightInformations() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-t from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] to-100% flex flex-col">
        <FlightInformationsSearchMenu />
      </div>
      <Footer
        bgColor="bg-gradient-to-b from-[#FFFFFF] via-[#D0F0FD] to-[#18BFFF]"
        className="border-transparent"
      />
    </>
  );
}

export default FlightInformations;
