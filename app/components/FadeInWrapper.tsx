"use client";
import React from "react";
import { motion } from "framer-motion";
const FadeInWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      className="page-height px-1"
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWrapper;
