import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@nextui-org/button";

import { ModalWodProps } from "@/types";

const ModalTraining = ({ isOpen, onClose, content }: ModalWodProps) => {
  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Hyrox</ModalHeader>
            <ModalBody>
              <div className="whitespace-pre-wrap">
                {Object.entries(content).map(([key, value]) => (
                  <p key={key} className="mb-2">
                    <strong className="capitalize">{key}:</strong> {value}
                  </p>
                ))}
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

export default ModalTraining;
