import { Textarea } from "@heroui/input";
import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { Select, SelectItem } from "@nextui-org/select";
import { toast } from "sonner";

import { max_duration, training_type } from "@/constants";
import { TrainingFormProps } from "@/types";

export function IATrainingForm({
  onSubmit,
  loading,
  setFetchedWod,
}: TrainingFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      const formData = new FormData(e.target);
      const observations = formData.get("observations") as string;
      const trainingType = formData.get("wod-type") as string;
      const durationRaw = formData.get("duration") as string;
      const duration = durationRaw.split(" ")[0];

      if (!trainingType || !duration) {
        toast.error("Please select a training and a duration");

        return;
      }

      onSubmit(trainingType, duration, observations);
    }
  };

  return (
    <Form
      className="w-full flex flex-col gap-3"
      validationBehavior="native"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full gap-3">
        <div className="flex w-full flex-wrap md:flex-nowrap">
          <Select
            className="w-full"
            color="default"
            label="Select training"
            name="wod-type"
            variant="faded"
          >
            {training_type.map((type) => (
              <SelectItem key={type} aria-label="wod-type">
                {type}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap">
          <Select
            className="w-full"
            label="Select max duration"
            name="duration"
            variant="faded"
          >
            {max_duration.map((duration) => (
              <SelectItem key={duration} aria-label="duration">
                {duration}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap">
        <Textarea
          label="Observations"
          minRows={8}
          name="observations"
          placeholder="Enter any observations about the training here"
          variant="faded"
        />
      </div>
      <div className="flex items-center gap-2 justify-end w-full">
        <Button
          className="w-full"
          color="success"
          type="submit"
          variant="solid"
        >
          {loading ? "Loading..." : "Generate"}
        </Button>
        <Button
          type="reset"
          variant="bordered"
          onPress={() => setFetchedWod(null)}
        >
          Reset
        </Button>
      </div>
    </Form>
  );
}
