import { Button } from "@nextui-org/button";

import { FilterButtonsProps } from "@/types";

export const FilterButtons = ({
  category,
  setCategory,
  isSmall,
}: FilterButtonsProps) => {
  const categories = ["All", "Crossfit", "Hyrox", "Endurance"];

  return (
    <div className={`${isSmall ? "gap-2" : "gap-5"} flex`}>
      {categories.map((cat) => (
        <Button
          key={cat}
          color={category === cat ? "success" : "default"}
          size={isSmall ? "sm" : "md"}
          value={cat}
          variant={category === cat ? "solid" : "bordered"}
          onPress={() => setCategory(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};
