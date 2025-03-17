import { useEffect, useState } from "react";

import { FullTraining, TrainingData, UseEditTrainingProps } from "@/types";

export const useEditTraining = ({
  training,
  onSave,
  onClose,
}: UseEditTrainingProps) => {
  const [formData, setFormData] = useState<TrainingData>({} as TrainingData);

  useEffect(() => {
    if (training) {
      setFormData(
        "id" in training ? { ...(training as FullTraining).training } : training
      );
    }
  }, [training]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const cleanedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );

    if ("id" in training) {
      onSave({ ...(training as FullTraining), training: cleanedData });
    } else {
      onSave(cleanedData as TrainingData);
    }

    onClose();
  };

  return { formData, handleChange, handleSubmit };
};
