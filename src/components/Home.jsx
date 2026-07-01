import React from 'react';
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { TypewriterEffectSmooth } from './ui/typewriter-effect';

import { Vortex } from "./ui/vortex";

export function VortexDemo() {
  return (
    <div className="mx-auto rounded-md min-h-[26rem] sm:h-[30rem] overflow-hidden w-full scroller">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-4 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center w-full">
        <TypewriterEffectSmoothDemo />
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">

        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto px-6 sm:px-0">
          <button className="w-full sm:w-auto border-2 border-purple-500 text-white px-[10px] py-[10px] font-medium text-lg md:text-xl bg-gradient-to-r from-purple-900 via-black to-black rounded-lg">
            Join Community
          </button>
          <button className="w-full sm:w-auto px-4 py-[10px] font-medium border-2 rounded-lg bg-black text-white"> <a href='/list'>Watch trailer</a></button>
        </div>
      </Vortex>
    </div>
  );
}





const TypewriterEffectSmoothDemo = () => {
    const words = [
        {
            text: "Track",
        },
        {
            text: "AVS ,",
        },
        {
            text: "Operator, Node data with",
        },
        {
            text: "InsightOps.",
            className: "text-purple-500 dark:text-purple-500",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center h-[5rem] mt-[40px]">
            <TypewriterEffectSmooth words={words} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            </div>
        </div>
    );
}

function Home() {
    return (
        <div className='flex flex-col items-center bg-black scroller h-screen'>

    <div className='mt-[80px] flex flex-col gap-y-[80px] text-white mb-[30px]'>
    <VortexDemo/>
    </div>
</div>

    )
}

export default Home