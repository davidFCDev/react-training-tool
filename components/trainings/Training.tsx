"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import { ArrowsPointing, DeleteIcon, LoveIcon } from "../common/icons";
import TooltipButton from "../common/TooltipButton";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import DetailsModal from "../modals/DetailsModal";
import EditTrainingModal from "../modals/EditTrainingModal";

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
    saveTraining,
    deleteTraining,
    updateTraining,
    setTrainingToEdit,
    trainingToEdit,
  } = useSaveTraining();

  const {
    isModalOpen,
    isTrainingModalOpen,
    openModal,
    closeModal,
    isEditModalOpen,
  } = useModals();

  const handleEditTraining = (training: TrainingData) => {
    setTrainingToEdit(training);
    openModal("edit");
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
    closeModal("edit");
  };

  return (
    <>
      <Card
        className={`w-full rounded-lg border border-zinc-700 ${
          isNotFavorite ? "max-w-5xl p-4" : "max-w-3xl p-2"
        }`}
      >
        <CardHeader className="flex justify-between items-center gap-4">
          {isNotFavorite ? (
            <Button
              color="default"
              variant="ghost"
              onPress={() => setFetchedWod(null)}
            >
              Back
            </Button>
          ) : (
            <TooltipButton
              buttonProps={"scale-85"}
              color="danger"
              icon={<DeleteIcon />}
              tooltipText="Delete workout"
              onClick={() => openModal("delete")}
            />
          )}
          <div className="flex items-center gap-4">
            <h2
              className={`${isNotFavorite ? "text-2xl" : "text-lg"} font-semibold text-success-500 flex-grow text-center anton-regular tracking-wider uppercase`}
            >
              {fetchedWod?.type || "Training"}
            </h2>
            {fetchedWod?.time && (
              <span className="text-sm border border-zinc-600 text-zinc-300 py-1 px-2 rounded-sm">
                {fetchedWod.time} &apos;
              </span>
            )}
          </div>
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
              <>
                <TooltipButton
                  buttonProps={"scale-80"}
                  icon={<ArrowsPointing />}
                  tooltipText="Show details"
                  variant="light"
                  onClick={() => openModal("details")}
                />
                <TooltipButton
                  buttonProps={"scale-85"}
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
          className={`grid gap-6 py-4 ${
            !isNotFavorite
              ? "max-h-40 overflow-hidden flex items-center justify-center"
              : "max-h-80 overflow-y-auto"
          }`}
          style={{
            gridTemplateColumns: isNotFavorite
              ? `repeat(${Math.min(
                  Object.keys(fetchedWod || {}).filter(
                    (key) => key !== "type" && key !== "time"
                  ).length,
                  4
                )}, minmax(200px, 1fr))`
              : "1fr",
          }}
        >
          {isNotFavorite ? (
            Object.entries(fetchedWod || {})
              .filter(([key]) => key !== "type" && key !== "time")
              .map(([key, value]) =>
                value ? (
                  <div
                    key={key}
                    className="p-4 rounded-lg shadow-md bg-content1"
                  >
                    <h3 className="text-lg font-bold uppercase text-left mb-3 text-zinc-200">
                      {key}
                    </h3>
                    <pre className="whitespace-pre-wrap text-sm mt-3 text-zinc-300">
                      {String(value)}
                    </pre>
                  </div>
                ) : null
              )
          ) : (
            <pre
              className="text-sm text-zinc-300 text-left"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {fetchedWod?.metcon || "No metcon available"}
            </pre>
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
          onClose={() => closeModal("edit")}
          onSave={handleUpdateTraining}
        />
      )}
    </>
  );
};
