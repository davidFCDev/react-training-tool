import { Divider } from "@mui/material";
import { Card } from "@nextui-org/card";
import { useState } from "react";
import { toast } from "sonner";

import AddNameModal from "../modals/AddNameModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import DetailsModal from "../modals/DetailsModal";
import EditTrainingModal from "../modals/EditTrainingModal";

import TrainingBody from "./TrainingBody";
import TrainingHeader from "./TrainingHeader";

import useModals from "@/hooks/useModals";
import useSaveTraining from "@/hooks/useSaveTraining";
import { FullTraining, TrainingData, TrainingProps } from "@/types";

export const Training = ({
  mode,
  fetchedWod,
  setFetchedWod,
  isNotFavorite = false,
  id,
}: TrainingProps) => {
  const {
    isSaving,
    trainingToEdit,
    saveTraining,
    deleteTraining,
    updateTraining,
    setTrainingToEdit,
  } = useSaveTraining();

  const [trainingName, setTrainingName] = useState("");

  const {
    isModalOpen,
    isTrainingModalOpen,
    isEditModalOpen,
    isNameModalOpen,
    openModal,
    closeModal,
  } = useModals();

  // Detecta si es FullTraining o TrainingData
  const isFullTraining = (fetchedWod as FullTraining)?.id !== undefined;

  // Extraer datos según el tipo
  const trainingData = isFullTraining
    ? (fetchedWod as FullTraining).training
    : fetchedWod;
  const date = isFullTraining ? (fetchedWod as FullTraining).date : null;

  const handleEditTraining = (training: TrainingData) => {
    setTrainingToEdit(training);
    openModal("edit");
  };

  const handleDelete = () => {
    deleteTraining(id);
    closeModal("delete");
  };

  const handleOpenNameModal = () => {
    openModal("name");
  };

  const handleSaveWithName = () => {
    if (!trainingName.trim()) {
      toast.error("Please enter a workout name.");

      return;
    }

    const trainingWithName = { ...fetchedWod, name: trainingName };

    saveTraining(trainingWithName, () => {
      setFetchedWod(null);
      setTrainingName("");
      closeModal("name");
    });
  };

  const handleUpdateTraining = async (updatedTraining: TrainingData) => {
    await updateTraining(id, updatedTraining);
    setFetchedWod(
      isFullTraining
        ? { ...(fetchedWod as FullTraining), training: updatedTraining }
        : updatedTraining
    );
    closeModal("edit");
  };

  return (
    <>
      <Card
        className={`w-full rounded-lg border border-zinc-700 ${
          isNotFavorite ? "max-w-5xl p-4" : "min-w-96 p-2 hover:border-zinc-600"
        }`}
      >
        <TrainingHeader
          {...{
            isNotFavorite,
            setFetchedWod,
            openModal,
            fetchedWod: trainingData,
            isSaving,
            handleOpenNameModal,
            handleEditTraining,
            mode,
            date,
          }}
        />

        <Divider />

        <TrainingBody
          {...{
            isNotFavorite,
            fetchedWod: trainingData,
            mode,
            date,
          }}
        />
      </Card>

      <AddNameModal
        isOpen={isNameModalOpen}
        setTrainingName={setTrainingName}
        trainingName={trainingName}
        onClose={() => closeModal("name")}
        onSave={handleSaveWithName}
      />

      <DetailsModal
        fetchedWod={trainingData}
        isOpen={isTrainingModalOpen}
        onEditTraining={handleEditTraining}
        onOpenChange={() => closeModal("details")}
      />

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => closeModal("delete")}
        onConfirm={handleDelete}
      />

      {trainingToEdit && (
        <EditTrainingModal
          isOpen={isEditModalOpen}
          training={trainingToEdit}
          onClose={() => closeModal("edit")}
          onSave={handleUpdateTraining}
        />
      )}
    </>
  );
};
