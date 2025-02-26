import { Tooltip } from "@heroui/tooltip";
import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

interface TooltipButtonProps {
  tooltipText: string;
  onClick: () => void;
  disabled?: boolean;
  icon: ReactNode;
  color?: "default" | "danger" | "primary";
  variant?: "light" | "flat" | "solid";
}

const TooltipButton = ({
  tooltipText,
  onClick,
  disabled = false,
  icon,
  color = "default",
  variant = "light",
}: TooltipButtonProps) => {
  return (
    <Tooltip
      className="py-2 px-4 bg-zinc-700 text-white"
      closeDelay={0}
      content={tooltipText}
      delay={0}
      motionProps={{
        variants: {
          exit: { opacity: 0, transition: { duration: 0.1, ease: "easeIn" } },
          enter: {
            opacity: 1,
            transition: { duration: 0.15, ease: "easeOut" },
          },
        },
      }}
      showArrow={true}
    >
      <Button
        isIconOnly
        color={color}
        disabled={disabled}
        variant={variant}
        onPress={onClick}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

export default TooltipButton;
