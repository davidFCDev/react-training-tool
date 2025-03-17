import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";
import { toast } from "sonner";

import AddNameModal from "../modals/AddNameModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import DetailsModal from "../modals/DetailsModal";
import EditTrainingModal from "../modals/EditTrainingModal";

import TrainingBody from "./TrainingBody";
import TrainingFooter from "./TrainingFooter";
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

  const {
    isModalOpen,
    isTrainingModalOpen,
    isEditModalOpen,
    isNameModalOpen,
    openModal,
    closeModal,
  } = useModals();

  const [trainingName, setTrainingName] = useState("");

  const isFullTraining = (fetchedWod as FullTraining)?.id !== undefined;
  const trainingData = isFullTraining
    ? (fetchedWod as FullTraining).training
    : fetchedWod;
  const date = isFullTraining ? (fetchedWod as FullTraining).date : null;

  const handlers = {
    editTraining: (training: TrainingData | FullTraining) => {
      setTrainingToEdit((training as FullTraining)?.training || training);
      openModal("edit");
    },
    deleteTraining: () => {
      deleteTraining(id);
      closeModal("delete");
    },
    saveWithName: () => {
      if (!trainingName.trim()) {
        toast.error("Please enter a workout name.");

        return;
      }
      saveTraining({ ...fetchedWod, name: trainingName }, () => {
        setFetchedWod(null);
        setTrainingName("");
        closeModal("name");
      });
    },
    updateTraining: async (updatedTraining: TrainingData) => {
      await updateTraining(id, updatedTraining);
      setFetchedWod(
        isFullTraining
          ? { ...(fetchedWod as FullTraining), training: updatedTraining }
          : updatedTraining
      );
      closeModal("edit");
    },
  };

  return (
    <>
      <Card
        className={`w-full rounded-lg border border-zinc-700 ${isNotFavorite ? "" : "min-w-96 p-2 hover:border-zinc-600"}`}
      >
        <TrainingHeader
          {...{
            isNotFavorite,
            openModal,
            fetchedWod,
          }}
          handleEditTraining={handlers.editTraining}
        />
        <Divider />

        <TrainingBody {...{ isNotFavorite, fetchedWod, date }} />

        <TrainingFooter
          {...{ isNotFavorite, setFetchedWod, openModal, mode }}
        />
      </Card>

      {/* Modales */}
      <AddNameModal
        isOpen={isNameModalOpen}
        setTrainingName={setTrainingName}
        trainingName={trainingName}
        onClose={() => closeModal("name")}
        onSave={handlers.saveWithName}
      />
      <DetailsModal
        fetchedWod={trainingData}
        isOpen={isTrainingModalOpen}
        onEditTraining={handlers.editTraining}
        onOpenChange={() => closeModal("details")}
      />
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => closeModal("delete")}
        onConfirm={handlers.deleteTraining}
      />
      {trainingToEdit && (
        <EditTrainingModal
          isOpen={isEditModalOpen}
          training={trainingToEdit}
          onClose={() => closeModal("edit")}
          onSave={handlers.updateTraining}
        />
      )}
    </>
  );
};
