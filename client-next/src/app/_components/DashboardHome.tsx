"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { globeConfig } from "@/lib/config/globe.config";
import { sampleArcs } from "@/lib/config/globe.config";
import { Highlight } from "@/components/ui/hero-highlight";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);

export function DashboardHome() {
  return (
    <div className="h-full w-full bg-gradient-to-t from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] to-100% py-20">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4 py-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h2
            className={`text-center h-full w-full pb-4 text-6xl lg:text-6xl md:text-5xl font-bold bg-gradient-to-r from-[#0B76B7] to-[#1C5BD9] bg-clip-text text-transparent`}
          >
            Predicting Skies, Optimizing Flies
          </h2>
          <p
            className={`text-center text-4xl lg:text-5xl md:text-3xl font-bold ${"text-neutral-700"} mt-2 mx-auto w-full`}
          >
            Your <Highlight className="text-white">AI-Powered</Highlight> Flight
            Insight
          </p>
        </motion.div>
        {/* <div
          className={`absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent ${"to-white"} z-40`}
        /> */}
        <div className="absolute w-full md:-bottom-20 -bottom-10 pr-0 md:pr-0 sm:pr-10 pt-0 md:pt-10 sm:h-[660px] xs:h-[600px] h-[600px] z-10">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4 py-4">
        <div className="z-10 flex min-h-72 items-center justify-center">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Introducing Magic UI</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>
      </div>
    </div>
  );
}
