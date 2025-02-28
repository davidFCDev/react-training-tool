import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Spinner } from "@nextui-org/spinner";

import { AddTrainingModalProps } from "@/types";

export const AddTrainingModal = ({
  isModalOpen,
  setIsModalOpen,
  loading,
  filteredTrainingList,
  handleTrainingSelect,
}: AddTrainingModalProps) => {
  return (
    <Modal
      className="pb-2"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <ModalContent>
        <ModalHeader>Select a Training</ModalHeader>
        <ModalBody>
          {loading ? (
            <Spinner />
          ) : (
            <Select
              label="Choose Training"
              onSelectionChange={(keys) =>
                handleTrainingSelect(Array.from(keys)[0] as string)
              }
            >
              {filteredTrainingList.map((training) => (
                <SelectItem key={training.id} value={training.id}>
                  {`${training.training.type} - ${training.training.time} mins`}
                </SelectItem>
              ))}
            </Select>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
