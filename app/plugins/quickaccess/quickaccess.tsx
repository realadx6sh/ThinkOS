"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { quickAccessLink } from "@/config";
import Link from "next/link";

const quickAccessAnimationVariant = {
  hidden: { opacity: 0, filter: "blur(4px)", y: 7 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

const QuickAccess: React.FC = () => {
  const [quickAccess, setQuickAccess] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        setQuickAccess((prev) => !prev);
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {quickAccess && (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-transparent backdrop-blur-[2.5px] z-30 px-4">
          <motion.div
            key="quick-access"
            variants={quickAccessAnimationVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-[520px] min-h-[300px] bg-[#201F1D] border border-[#323232]/50 z-50 rounded-[17px] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Input */}
            <input
              type="text"
              className="w-full h-12 text-white/80 font-inter text-[14px] px-5 outline-none border-b border-[#323232]/70 bg-transparent"
              placeholder="Type here to search...."
            />

            {/* Content */}
            <div className="flex flex-1">
              {/* Left */}
              <div className="flex flex-col w-1/2 py-4 border-r border-[#323232]/70">
                <p className="text-white/50 font-inter text-[12px] underline underline-offset-2 px-5 mb-2">
                  Features
                </p>

                <ul className="flex flex-col gap-2">
                  {quickAccessLink.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.path}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`block px-5 text-white/80 font-inter text-[14px] transition-all duration-150 ease-in-out underline underline-offset-2 ${
                          selectedIndex === index
                            ? "opacity-100 decoration-white"
                            : "opacity-50 decoration-white/0 hover:opacity-100 hover:decoration-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right */}
              <div className="flex flex-col w-1/2 p-4 items-start gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-[75px] aspect-square bg-[#282725] shadow-inner"></div>

                  <div className="flex flex-col items-start text-left">
                    <p className="text-white/50 text-left font-inter text-[12px] underline underline-offset-2 px-0.5 mb-2">
                      Category
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {quickAccessLink[selectedIndex].category.map((cat, i) => (
                        <li
                          key={i}
                          className="text-white/70 font-inter text-[13px] ml-0.5"
                        >
                          {`${cat}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Description */}
                <div className="flex flex-col gap-2">
                  <p className="text-white/80 font-inter text-[13px]">
                    {quickAccessLink[selectedIndex].description[0]}
                  </p>

                  <p className="text-white/50 font-inter text-[13px] leading-relaxed">
                    {quickAccessLink[selectedIndex].description[1]}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickAccess;
