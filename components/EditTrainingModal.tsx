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

import { useEditTraining } from "@/hooks/useEditTraining";
import { EditModalProps } from "@/types";

const EditTrainingModal = ({
  isOpen,
  training,
  onClose,
  onSave,
}: EditModalProps) => {
  const { formData, handleChange, handleSubmit, detailEntries } =
    useEditTraining({
      training,
      onSave,
      onClose,
    });

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onClose}
    >
      <ModalContent className="max-w-4xl w-auto">
        <ModalHeader className="text-2xl font-bold flex items-center justify-between py-6">
          <h2 className="text-success">
            Edit <span className="text-zinc-200">Training</span>
          </h2>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <label className="text-sm font-medium uppercase" htmlFor="type">
                Type
              </label>
              <Input
                color="default"
                id="type"
                name="type"
                placeholder="Type"
                value={formData.type || ""}
                variant="faded"
                onChange={(e) => handleChange("type", e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label className="text-sm font-medium uppercase" htmlFor="time">
                Time
              </label>
              <Input
                color="default"
                id="time"
                name="time"
                placeholder="Time"
                value={formData.time || ""}
                variant="faded"
                onChange={(e) => handleChange("time", e.target.value)}
              />
            </div>
          </div>
        </ModalHeader>

        <Divider />
        <ModalBody>
          <div
            className="grid gap-6 py-6"
            style={{
              gridTemplateColumns: `repeat(${detailEntries.length}, 1fr)`,
            }}
          >
            {detailEntries.map(([key, value]) => (
              <div key={key} className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase" htmlFor={key}>
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
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="success" onPress={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTrainingModal;
