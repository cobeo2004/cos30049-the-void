import React from "react";
import PredictionsPage from "../_components/PredictionsPage";

function Predictions() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] to-100% flex flex-col">
      <div className="container mx-auto p-4 space-y-4">
        <header className="w-full max-w-screen mb-8 mt-4 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0B76B7] to-[#1C5BD9] bg-clip-text text-transparent">
            Flight Price Analysis
          </h1>
        </header>
        <PredictionsPage />
      </div>
    </div>
  );
}

export default Predictions;
