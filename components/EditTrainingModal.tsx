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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { updateFavoriteAsync } from "@/redux/favoritesReducer";
import { AppDispatch } from "@/redux/store";

interface Training {
  id: string;
  type: string;
  time: string;
  warmup: string;
  strength: string;
  metcon: string;
  accessory: string;
}

interface EditTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainingToEdit: Training | null;
}

const EditTrainingModal: React.FC<EditTrainingModalProps> = ({
  isOpen,
  onClose,
  trainingToEdit,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [trainingData, setTrainingData] = useState<Omit<Training, "id">>({
    type: "",
    time: "",
    warmup: "",
    strength: "",
    metcon: "",
    accessory: "",
  });

  useEffect(() => {
    if (trainingToEdit) {
      const { id, ...rest } = trainingToEdit;

      setTrainingData(rest);
    }
  }, [trainingToEdit]);

  const handleChange = (field: keyof Training, value: string) => {
    setTrainingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (trainingToEdit) {
      await dispatch(
        updateFavoriteAsync({
          collectionName: "trainings",
          updatedTraining: {
            id: trainingToEdit.id,
            training: trainingData.type,
            ...trainingData,
          },
        })
      );
      onClose();
    }
  };

  if (!trainingToEdit) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Editar Entrenamiento</ModalHeader>
        <ModalBody>
          {Object.entries(trainingData).map(([key, value]) => (
            <Input
              key={key}
              fullWidth
              aria-label={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              placeholder={`Edita ${key}`}
              value={value}
              onChange={(e) =>
                handleChange(key as keyof Training, e.target.value)
              }
            />
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="success"
            disabled={Object.values(trainingData).some(
              (value) => !value.trim()
            )}
            onPress={handleSave}
          >
            Guardar cambios
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTrainingModal;
