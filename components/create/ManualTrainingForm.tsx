/* eslint-disable no-console */
"use client";

import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { Input, Textarea } from "@nextui-org/input";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

import DataService from "@/service/data.service";
import { TrainingData } from "@/types";

interface ManualTrainingFormProps {
  loading: boolean;
  onSubmit?: (formData: TrainingData) => void;
}

const ManualTrainingForm: React.FC<ManualTrainingFormProps> = ({
  loading,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    type: "",
    time: "",
    metcon: "",
    strength: "",
    accessory: "",
    warmup: "",
    name: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.type || !formData.time || !formData.name) {
      alert("Please fill in the required fields: Name, Type, and Time.");

      return;
    }

    const dataService = new DataService();
    const id = nanoid();
    const date = new Date().toISOString();
    const training = { ...formData };

    try {
      await dataService.addDocumentWithId("favorites", id, training, date);
      onSubmit?.(training);
      setFormData({
        type: "",
        time: "",
        metcon: "",
        strength: "",
        accessory: "",
        warmup: "",
        name: "",
      });
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

          <Input
            color="default"
            id="type"
            label="Type"
            name="type"
            placeholder="Enter the type of training"
            value={formData.type}
            variant="faded"
            onChange={handleChange}
          />

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
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </footer>
      </div>
    </Form>
  );
};

export default ManualTrainingForm;
