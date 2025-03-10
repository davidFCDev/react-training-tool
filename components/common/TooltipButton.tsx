import { Tooltip } from "@heroui/tooltip";
import { Button } from "@nextui-org/button";

import { TooltipButtonProps } from "@/types";

const TooltipButton = ({
  tooltipText,
  onClick,
  disabled = false,
  icon,
  color = "default",
  variant = "light",
  buttonProps,
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
        className={`${buttonProps}`}
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
