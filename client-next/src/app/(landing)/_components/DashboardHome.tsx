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
import { InfiniteMovingCards } from "@/components/ui/image-infinite-moving-card";
import { products } from "@/lib/constant";
import { clientsImages } from "@/lib/constant";
import { HeroParallax } from "@/components/ui/hero-parallax";
import Footer from "./Footer";
import ExploreLatestProduct from "./ExploreLatestProduct";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);
export function DashboardHome() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-t from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] to-100% py-20 flex flex-col">
        <div className="flex-grow mx-auto w-full relative overflow-hidden px-4 py-4">
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
              Your <Highlight className="text-white">AI-Powered</Highlight>{" "}
              Flight Insight
            </p>
          </motion.div>
          <div className="w-full mt-10 sm:h-[660px] xs:h-[600px] h-[600px] z-10">
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div>
        </div>
        <div className="z-10 flex items-center justify-center min-h-40">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-lg text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-6 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span className="text-xl font-semibold">✨ Our Clients</span>
              <ArrowRightIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <InfiniteMovingCards
            items={clientsImages()}
            direction="right"
            speed="slow"
            className=""
          />
        </div>
        <div className="flex items-center justify-center">
          <HeroParallax products={products} />
        </div>
      </div>
      <ExploreLatestProduct />
      <Footer bgColor="bg-gradient-to-t from-[#FFFFFF] via-[#D0F0FD] to-[#18BFFF]" />
    </>
  );
}
