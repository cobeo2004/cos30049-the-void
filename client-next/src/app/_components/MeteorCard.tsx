import React from "react";
import { Meteors } from "@/components/ui/meteors";

type MeteorCardProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonFunction: VoidFunction;
};
export function MeteorCard({
  title,
  description,
  buttonText,
  buttonFunction,
}: MeteorCardProps) {
  return (
    <div className="">
      <div className=" w-full relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gradient-to-br from-[#18BFFF] via-[#88DFFF] to-[#FFF8F8] border border-gray-400  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            {title}
          </h1>

          <p className="font-bold text-base text-slate-900 mb-4 relative z-50">
            {description}
          </p>

          <button
            className="border px-4 py-1 rounded-lg  border-gray-500 text-slate-900"
            onClick={buttonFunction}
          >
            {buttonText}
          </button>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
