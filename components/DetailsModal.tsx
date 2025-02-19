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
import { Divider } from "@nextui-org/divider";

interface DetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  fetchedWod: any;
}

const DetailsModal = ({
  isOpen,
  onOpenChange,
  fetchedWod,
}: DetailsModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-fit w-auto">
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-center gap-5">
              {fetchedWod.time && (
                <p className="text-xs text-gray-400">
                  <span className="text-gray-300">{fetchedWod.time}</span> min
                </p>
              )}
              <h2 className="text-2xl">{fetchedWod.type}</h2>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <div
                className={`grid gap-6 py-6 ${
                  Object.keys(fetchedWod).length > 3
                    ? "grid-cols-1 sm:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {Object.entries(fetchedWod)
                  .filter(([key]) => key !== "type" && key !== "time")
                  .map(([key, value]) =>
                    value ? (
                      <div
                        key={key}
                        className="p-4 rounded-lg shadow-md bg-content1"
                      >
                        <h3 className="text-lg font-bold uppercase text-left mb-3 text-gray-200">
                          {key}
                        </h3>
                        <Divider />
                        <pre className="whitespace-pre-wrap text-sm mt-3 text-gray-300">
                          {String(value)}
                        </pre>
                      </div>
                    ) : null
                  )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DetailsModal;
