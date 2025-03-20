"use client";

import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import Image from "next/image";

interface ButtonModeProps {
  mode: "IA" | "manual";
  currentMode: "IA" | "manual";
  onClick: () => void;
}

export default function ButtonMode({
  mode,
  currentMode,
  onClick,
}: ButtonModeProps) {
  const isActive = mode === currentMode;

  return (
    <motion.div
      className="cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        className={`h-12 text-sm ${isActive ? "border-success" : ""}`}
        variant={isActive ? "bordered" : "flat"}
        onPress={onClick}
      >
        {mode === "IA" ? (
          <div className="flex items-center gap-2">
            {!isActive ? (
              <Image alt="AI" height={32} src="/bot.png" width={32} />
            ) : null}
            {isActive ? "Let's do it!" : "Create with AI"}
          </div>
        ) : isActive ? (
          "Create"
        ) : (
          "New workout"
        )}
      </Button>
    </motion.div>
  );
}
