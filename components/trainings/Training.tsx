"use client";

import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
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
import { TrainingData, TrainingProps } from "@/types";

export const Training = ({
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
    setFetchedWod(updatedTraining);
    closeModal("edit");
  };

  return (
    <>
      <Card
        className={`w-full rounded-lg border border-zinc-700 ${
          isNotFavorite ? "max-w-5xl p-4" : "max-w-3xl p-2"
        }`}
      >
        <TrainingHeader
          {...{
            isNotFavorite,
            setFetchedWod,
            openModal,
            fetchedWod,
            isSaving,
            handleOpenNameModal,
            handleEditTraining,
          }}
        />

        <Divider />

        <TrainingBody
          {...{
            isNotFavorite,
            fetchedWod,
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
        fetchedWod={fetchedWod}
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
