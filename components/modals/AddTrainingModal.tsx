/* eslint-disable no-console */
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Spinner } from "@nextui-org/spinner";
import { useState } from "react";

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
}: AddTrainingModalProps) => {
  const [category, setCategory] = useState("All");

  // Función para verificar si el entrenamiento ya está asignado
  const isTrainingAssigned = (trainingId: string): boolean => {
    return Object.values(trainingSchedule).some((day) => day.id === trainingId);
  };

  // Filtrar entrenamientos por categoría
  const filteredTrainings = filteredTrainingList.filter((training) =>
    category === "All" ? true : training.training.type === category
  );

  return (
    <Modal
      backdrop="blur"
      className="p-3"
      isOpen={isModalOpen}
      size="lg"
      onClose={() => setIsModalOpen(false)}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <span>Trainings</span>
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
            <Select
              label="Choose Training"
              variant="faded"
              onSelectionChange={(keys) =>
                handleTrainingSelect(Array.from(keys)[0] as string)
              }
            >
              {filteredTrainings.map((training) => {
                const isAssigned = isTrainingAssigned(training.id);

                return (
                  <SelectItem
                    key={training.id}
                    aria-selected={isAssigned}
                    value={training.id}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="flex items-center gap-2">
                        {`${training.training.time}' - ${training.training.type} - ${training.training.name}`}{" "}
                        {isAssigned && (
                          <CheckIcon className="text-success" size={20} />
                        )}{" "}
                        {/* Agrega el check si está asignado */}
                      </p>
                    </div>
                  </SelectItem>
                );
              })}
            </Select>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
