import { Modal, ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@nextui-org/button";

import { ModalTrainingProps } from "@/types";

const ModalTraining = ({ isOpen, onClose, onConfirm }: ModalTrainingProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Confirm Deletion</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this training?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onPress={onConfirm}>
          Yes, Delete
        </Button>
        <Button color="default" onPress={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalTraining;
