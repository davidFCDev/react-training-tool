import { Button } from "@nextui-org/button";

interface FilterButtonsProps {
  category: string;
  setCategory: (category: string) => void;
}

export const FilterButtons = ({
  category,
  setCategory,
}: FilterButtonsProps) => {
  const categories = ["All", "Crossfit", "Hyrox", "Endurance"];

  return (
    <div className="flex gap-4 mt-5">
      {categories.map((cat) => (
        <Button
          key={cat}
          color={category === cat ? "success" : "default"}
          variant={category === cat ? "solid" : "bordered"}
          onPress={() => setCategory(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};
