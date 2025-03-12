"use client";

import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { Input, Textarea } from "@nextui-org/input";
import { useState } from "react";

interface ManualTrainingFormProps {
  onSave: (formData: {
    type: string;
    time: string;
    metcon: string;
    strength: string;
    accessory: string;
    warmup: string;
  }) => void;
  loading: boolean;
}

const ManualTrainingForm: React.FC<ManualTrainingFormProps> = ({
  onSave,
  loading,
}) => {
  const [formData, setFormData] = useState({
    type: "",
    time: "",
    metcon: "",
    strength: "",
    accessory: "",
    warmup: "",
  });

  const detailEntries = Object.entries(formData).splice(2);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="max-w-3xl w-auto flex flex-col gap-3">
        <header className="flex gap-3 justify-between w-full">
          <Input
            color="default"
            id="name"
            label="Name"
            name="name"
            placeholder="Enter your reference"
            variant="faded"
          />

          <Input
            color="default"
            id="type"
            label="Type"
            name="type"
            placeholder="Enter the type of training"
            variant="faded"
          />

          <Input
            color="default"
            id="time"
            label="Time"
            name="time"
            placeholder="Enter the time"
            variant="faded"
          />
        </header>

        <main
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${detailEntries.length}, 1fr)`,
          }}
        >
          {detailEntries.map(([key, value]) => (
            <Textarea
              key={key}
              color="default"
              id={key}
              label={key}
              minRows={8}
              name={key}
              placeholder={`Enter the ${key}`}
              value={String(value || "")}
              variant="faded"
            />
          ))}
        </main>

        <footer className="flex items-center gap-2 justify-end w-full">
          <Button
            className="w-full"
            color="success"
            type="submit"
            variant="solid"
          >
            {loading ? "Loading..." : "Create"}
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </footer>
      </div>
    </Form>
  );
};

export default ManualTrainingForm;
