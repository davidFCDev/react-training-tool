"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input, Textarea } from "@nextui-org/input";

import { PencilIcon } from "../common/icons";

import { useEditTraining } from "@/hooks/useEditTraining";
import { EditModalProps, FullTraining, TrainingData } from "@/types";

const EditTrainingModal = ({
  isOpen,
  training,
  onClose,
  onSave,
}: EditModalProps) => {
  // Detect if the training is a full training or just the data
  const isFullTraining = "id" in training;
  const initialTrainingData: TrainingData = isFullTraining
    ? (training as FullTraining).training
    : (training as TrainingData);

  const { formData, handleChange, handleSubmit } = useEditTraining({
    training: initialTrainingData,
    onSave: (updatedTraining) => {
      if (isFullTraining) {
        onSave(
          isFullTraining
            ? { ...(training as FullTraining), ...updatedTraining }
            : (updatedTraining as TrainingData)
        );
      } else {
        onSave(updatedTraining as TrainingData);
      }
    },
    onClose,
  });

  // Get the additional fields to render
  const detailEntries = Object.entries(formData).filter(
    ([key]) => !["name", "type", "time"].includes(key)
  );

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onClose}
    >
      <ModalContent className="max-w-4xl w-auto">
        <ModalHeader className="text-xl font-semibold py-4 italic flex items-center gap-2 text-zinc-300">
          <PencilIcon size={20} />
          <h2>Edit your Workout</h2>
        </ModalHeader>
        <Divider />
        <ModalBody className="py-4 flex flex-col gap-4">
          {/* Campos principales */}
          <div className="flex gap-4">
            {["name", "type", "time"].map((field) => (
              <div key={field} className="flex flex-col gap-1 items-start">
                <label
                  className="text-base font-semibold text-success"
                  htmlFor={field}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <Input
                  className="w-full"
                  color="default"
                  id={field}
                  name={field}
                  placeholder={field}
                  value={formData[field as keyof TrainingData] || ""}
                  variant="faded"
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Campos adicionales dinámicos */}
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${Math.max(detailEntries.length, 1)}, 1fr)`,
            }}
          >
            {detailEntries.map(([key, value]) => (
              <div key={key} className="flex flex-col gap-2">
                <label
                  className="text-base font-semibold text-success capitalize"
                  htmlFor={key}
                >
                  {key}
                </label>
                <Textarea
                  color="default"
                  id={key}
                  maxRows={10}
                  minRows={10}
                  name={key}
                  placeholder={`Edit ${key}`}
                  value={String(value || "")}
                  variant="faded"
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </ModalBody>
        <Divider />
        <ModalFooter className="py-4">
          <Button color="default" variant="faded" onPress={onClose}>
            Cancel
          </Button>
          <Button color="success" variant="solid" onPress={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTrainingModal;
