"use client";
/* eslint-disable prettier/prettier */
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@nextui-org/button";

import { ModalTrainingProps } from "@/types";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ModalTrainingProps) => {
  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;
