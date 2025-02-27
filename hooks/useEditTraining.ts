// useEditTraining.js
import { useEffect, useState } from "react";

interface UseEditTrainingProps {
  training: Record<string, any>;
  onSave: (training: Record<string, any>) => void;
  onClose: () => void;
}

export const useEditTraining = ({
  training,
  onSave,
  onClose,
}: UseEditTrainingProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    setFormData(training || {});
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

    onSave(cleanedData);
    onClose();
  };

  const orderedKeys = ["warmup", "strength", "metcon", "accessory"];
  const detailEntries = orderedKeys
    .map((key) => [key, formData[key] || ""])
    .filter(([key]) => key !== "type" && key !== "time");

  return { formData, handleChange, handleSubmit, detailEntries };
};
