"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

interface AddNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  trainingName: string;
  setTrainingName: (name: string) => void;
}

const AddNameModal = ({
  isOpen,
  onClose,
  onSave,
  trainingName,
  setTrainingName,
}: AddNameModalProps) => {
  return (
    <Modal
      backdrop="blur"
      className="text-zinc-200"
      isOpen={isOpen}
      size="sm"
      onClose={onClose}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Add a &quot;name&quot; to your workout</ModalHeader>
            <ModalBody>
              <Input
                color="default"
                label="Workout Id"
                value={trainingName}
                variant="faded"
                onChange={(e) => setTrainingName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button className="w-full" color="success" onPress={onSave}>
                Save
              </Button>
              <Button onPress={onClose}>Cancel</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNameModal;
