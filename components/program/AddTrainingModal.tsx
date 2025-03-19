/* eslint-disable no-console */
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useState } from "react";

import { FilterButtons } from "../common/FilterButtons";
import { CheckIcon } from "../common/icons";

import DataService from "@/service/data.service";
import { AddTrainingModalProps } from "@/types";

export const AddTrainingModal = ({
  isModalOpen,
  setIsModalOpen,
  loading,
  filteredTrainingList,
  handleTrainingSelect,
}: AddTrainingModalProps) => {
  const [occupiedDates, setOccupiedDates] = useState<string[]>([]);
  const [category, setCategory] = useState("All");
  const dataService = new DataService();

  useEffect(() => {
    const fetchOccupiedDates = async () => {
      try {
        const dates = await dataService.getOccupiedDates("programming");

        setOccupiedDates(dates);
      } catch (error) {
        console.error("Error fetching occupied dates:", error);
      }
    };

    fetchOccupiedDates();
  }, []);

  // Filtrar entrenamientos según la categoría seleccionada
  const filteredTrainings = filteredTrainingList.filter((training) =>
    category === "All" ? true : training.training.type === category
  );

  return (
    <Modal
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
                const trainingDate = training.date.split("T")[0];
                const isOccupied = occupiedDates.includes(trainingDate);

                return (
                  <SelectItem
                    key={training.id}
                    textValue={training.date}
                    value={training.id}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p>{`${training.training.time}' - ${training.training.type} - ${training.training.name}`}</p>
                      {isOccupied && (
                        <CheckIcon className="text-success" size={20} />
                      )}
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
