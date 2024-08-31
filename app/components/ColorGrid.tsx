"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const gridSize = 32;
const intervalTime = 1000;
const gridColorCount = 5;

const ColorGrid = () => {
  //   const [activeBlocks, setActiveBlocks] = useState<number[]>([]);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       let newActiveBlocks = [];
  //       for (let i = 0; i < gridColorCount; i++) {
  //         newActiveBlocks.push(Math.floor(Math.random() * gridSize * gridSize));
  //       }
  //       setActiveBlocks(newActiveBlocks);
  //     }, intervalTime);

  //     return () => clearInterval(interval);
  //   }, []);

  return (
    <div
      className="max-md:hidden grid -z-50 fixed top-0 w-full h-full left-0 shadow-2xl shadow-neutral-900"
      style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
    >
      {[...Array(gridSize * gridSize)].map((_, index) => (
        <motion.div
          key={index + "key"}
          className=" col-span-1 aspect-square w-full border-b border-r border-neutral-300"
          //   style={{
          //     background: activeBlocks.includes(index)
          //       ? "#ff7f50"
          //       : "transparent",
          //   }}
          initial={{ backgroundColor: "transparent" }}
          //   animate={{
          //     backgroundColor: activeBlocks.includes(index)
          //       ? "#ff7f50"
          //       : "transparent",
          //   }}
          //   transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
};

export default ColorGrid;
