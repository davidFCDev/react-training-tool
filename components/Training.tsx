"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";

import ConfirmDeleteModal from "./ConfirmDeleteModal";
import DetailsModal from "./DetailsModal";
import EditTrainingModal from "./EditTrainingModal";
import { ArrowsPointing, DeleteIcon, LoveIcon } from "./icons";
import TooltipButton from "./TooltipButton";

import useModals from "@/hooks/useModals";
import useSaveTraining from "@/hooks/useSaveTraining";
import { TrainingData, TrainingProps } from "@/types";

export const Training = ({
  fetchedWod,
  setFetchedWod,
  isNotFavorite = false,
  id,
}: TrainingProps) => {
  const { isSaving, saveTraining, deleteTraining, updateTraining } =
    useSaveTraining();
  const { isModalOpen, isTrainingModalOpen, openModal, closeModal } =
    useModals();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [trainingToEdit, setTrainingToEdit] = useState<TrainingData | null>(
    null
  );

  const handleEditTraining = (training: TrainingData) => {
    setTrainingToEdit(training);
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    deleteTraining(id);
    closeModal("delete");
  };

  const handleSave = () => {
    saveTraining(fetchedWod, () => setFetchedWod(null));
  };

  const handleUpdateTraining = async (updatedTraining: TrainingData) => {
    await updateTraining(id, updatedTraining);
    setFetchedWod(updatedTraining);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Card className="w-full max-w-3xl p-4 rounded-lg shadow-lg">
        <CardHeader className="flex justify-between items-center gap-4">
          {isNotFavorite ? (
            <Button
              color="default"
              variant="flat"
              onPress={() => setFetchedWod(null)}
            >
              Back
            </Button>
          ) : (
            fetchedWod?.time && (
              <p className="text-sm text-gray-400">
                Time: <span className="text-gray-300">{fetchedWod.time}</span>{" "}
                min
              </p>
            )
          )}
          <h2 className="font-semibold text-xl text-success-500 flex-grow text-center">
            {fetchedWod?.type || "Training"}
          </h2>
          <div className="flex gap-2">
            {isNotFavorite ? (
              <TooltipButton
                color="danger"
                disabled={isSaving}
                icon={<LoveIcon />}
                tooltipText="Save the workout"
                onClick={handleSave}
              />
            ) : (
              <TooltipButton
                color="danger"
                icon={<DeleteIcon />}
                tooltipText="Delete workout"
                onClick={() => openModal("delete")}
              />
            )}
            {!isNotFavorite && (
              <>
                <TooltipButton
                  icon={<ArrowsPointing />}
                  tooltipText="Show details"
                  variant="light"
                  onClick={() => openModal("details")}
                />
                <TooltipButton
                  icon="✏️"
                  tooltipText="Edit workout"
                  onClick={() => handleEditTraining(fetchedWod)}
                />
              </>
            )}
          </div>
        </CardHeader>
        <Divider />
        <CardBody
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 py-4 ${
            !isNotFavorite ? "mb-4 max-h-40 overflow-hidden relative" : ""
          }`}
        >
          {!isNotFavorite && (
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none" />
          )}
          {Object.entries(fetchedWod || {})
            .filter(([key]) => key !== "type" && key !== "time")
            .map(([key, value]) =>
              value ? (
                <div key={key} className="p-4 rounded-lg shadow-md bg-content1">
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
        </CardBody>
      </Card>
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
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateTraining}
        />
      )}
    </>
  );
};
