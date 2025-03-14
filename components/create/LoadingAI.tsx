"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LoadingAI() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center gap-8 h-80"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        alt="AI Bot"
        className="border-4 border-success rounded-full p-4 animate-[bounce_2s_infinite]"
        height={140}
        src="/bot.png"
        width={140}
      />
      <motion.p
        animate={{ opacity: [0.6, 1, 0.6] }}
        className="text-lg font-medium"
        transition={{ duration: 1.5 }}
      >
        We are working on it! 🚀
      </motion.p>
    </motion.div>
  );
}
