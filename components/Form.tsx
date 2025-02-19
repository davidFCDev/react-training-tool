/* eslint-disable prettier/prettier */
import { Textarea } from "@heroui/input";
import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { Select, SelectItem } from "@nextui-org/select";
import { toast } from "sonner";

import { max_duration, training_type } from "@/constants";
import { TrainingFormProps } from "@/types";

export function TrainingForm({
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
      className="w-full"
      validationBehavior="native"
      onSubmit={handleSubmit}
    >
      <div className="text-left mb-6 max-w-sm mx-auto flex flex-col">
        <h1 className="title">
          <span className="text-success">Workout</span> Generator
        </h1>
        <p className="subtitle">
          Select your workout type and duration, then generate your custom
          workout!
        </p>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Select className="w-full" label="Select training" name="wod-type">
          {training_type.map((type) => (
            <SelectItem key={type} aria-label="wod-type">
              {type}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Select className="w-full" label="Select max duration" name="duration">
          {max_duration.map((duration) => (
            <SelectItem key={duration} aria-label="duration">
              {duration}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Textarea
          label="Observations"
          name="observations"
          placeholder="Enter any observations here"
        />
      </div>
      <div className="flex gap-2 mt-4">
        <Button color="success" type="submit" variant="solid">
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
