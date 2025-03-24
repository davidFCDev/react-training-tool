/* eslint-disable no-console */
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { useState } from "react";
import { toast } from "sonner";

import { FilterButtons } from "../common/FilterButtons";
import { CheckIcon } from "../common/icons";

import { AddTrainingModalProps } from "@/types";

export const AddTrainingModal = ({
  isModalOpen,
  setIsModalOpen,
  loading,
  filteredTrainingList,
  handleTrainingSelect,
  trainingSchedule,
  removeTraining,
}: AddTrainingModalProps) => {
  const [category, setCategory] = useState("All");

  const isTrainingAssigned = (trainingId: string): boolean => {
    return Object.values(trainingSchedule).some((day) => day.id === trainingId);
  };

  const handleSelectTraining = (trainingId: string) => {
    if (isTrainingAssigned(trainingId)) {
      toast.error("This training is already assigned!");

      return;
    }
    handleTrainingSelect(trainingId);
  };

  const handleUnassignTraining = async (trainingId: string) => {
    const date = Object.keys(trainingSchedule).find(
      (key) => trainingSchedule[key].id === trainingId
    );

    if (date) {
      await removeTraining(date);
    }
  };

  const filteredTrainings = filteredTrainingList.filter((training) =>
    category === "All" ? true : training.training.type === category
  );

  return (
    <Modal
      backdrop="blur"
      className="p-3"
      isOpen={isModalOpen}
      size="xl"
      onClose={() => setIsModalOpen(false)}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <span>Training List</span>
          <FilterButtons
            category={category}
            isSmall={true}
            setCategory={setCategory}
          />
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <Spinner />
          ) : (
            <Dropdown className="w-full">
              <DropdownTrigger className="w-full flex justify-start">
                <Button className="text-left w-full" variant="faded">
                  Choose Training
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="w-full">
                {filteredTrainings.map((training) => {
                  const isAssigned = isTrainingAssigned(training.id);

                  return (
                    <DropdownItem
                      key={training.id}
                      className="w-full min-w-[450px]"
                      variant="faded"
                      onPress={() => handleSelectTraining(training.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <p className="flex items-center gap-2">
                          {`${training.training.time}' - ${training.training.type} - ${training.training.name}`}
                          {isAssigned && (
                            <CheckIcon className="text-success" size={20} />
                          )}
                        </p>
                        {isAssigned && (
                          <button
                            className="text-danger hover:underline"
                            onClick={() => {
                              handleUnassignTraining(training.id);
                            }}
                          >
                            Release
                          </button>
                        )}
                      </div>
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
