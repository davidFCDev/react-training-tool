"use client";

import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import Image from "next/image";

import { PencilIcon } from "../common/icons";

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
        className={`h-12 text-sm ${isActive ? "border-success w-12" : ""}`}
        isIconOnly={isActive}
        variant={isActive ? "bordered" : "light"}
        onPress={onClick}
      >
        {mode === "IA" ? (
          <div className="flex items-center gap-2">
            {!isActive ? (
              <Image alt="AI" height={32} src="/bot.png" width={32} />
            ) : null}
            {isActive ? (
              <Image alt="AI" height={32} src="/bot.png" width={32} />
            ) : (
              "Try with AI"
            )}
          </div>
        ) : isActive ? (
          <PencilIcon size={22} />
        ) : (
          "Try manually"
        )}
      </Button>
    </motion.div>
  );
}
