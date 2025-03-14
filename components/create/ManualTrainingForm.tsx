/* eslint-disable no-console */
"use client";

import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { toast } from "sonner";

import DataService from "@/service/data.service";
import { TrainingData } from "@/types";

interface ManualTrainingFormProps {
  loading: boolean;
  onSubmit?: (formData: TrainingData) => void;
}

const initialFormData = {
  type: "",
  time: "",
  metcon: "",
  strength: "",
  accessory: "",
  warmup: "",
  name: "",
};

const ManualTrainingForm: React.FC<ManualTrainingFormProps> = ({
  loading,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.type || !formData.time || !formData.name) {
      toast.error("Please fill all the required fields.");

      return;
    }

    const dataService = new DataService();
    const id = nanoid();
    const date = new Date().toISOString();
    const training = { ...formData };

    try {
      await dataService.addDocumentWithId("favorites", id, training, date);
      onSubmit?.(training);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error saving workout:", error);
    }
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
            value={formData.name}
            variant="faded"
            onChange={handleChange}
          />

          <Select
            color="default"
            id="type"
            label="Type"
            name="type"
            placeholder="Select the type of training"
            value={formData.type}
            variant="faded"
            onChange={handleChange}
          >
            {["Crossfit", "Hyrox", "Endurance"].map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>

          <Input
            color="default"
            id="time"
            label="Time"
            name="time"
            placeholder="Enter the time"
            value={formData.time}
            variant="faded"
            onChange={handleChange}
          />
        </header>

        <main className="grid grid-cols-4 gap-3">
          {["warmup", "strength", "metcon", "accessory"].map((key) => (
            <Textarea
              key={key}
              color="default"
              id={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              minRows={8}
              name={key}
              placeholder={`Enter the ${key}`}
              value={formData[key as keyof typeof formData]}
              variant="faded"
              onChange={handleChange}
            />
          ))}
        </main>

        <footer className="flex items-center gap-2 justify-end w-full">
          <Button
            className="w-full"
            color="success"
            disabled={loading}
            type="submit"
            variant="solid"
          >
            {loading ? "Saving..." : "Create"}
          </Button>
          <Button
            type="button"
            variant="bordered"
            onPress={() => setFormData(initialFormData)}
          >
            Reset
          </Button>
        </footer>
      </div>
    </Form>
  );
};

export default ManualTrainingForm;
