"use client";
/* eslint-disable prettier/prettier */

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import ConfirmDeleteModal from "./ConfirmDeleteModal";
import DetailsModal from "./DetailsModal";
import { ArrowsPointing, DeleteIcon } from "./icons";

import useModals from "@/hooks/useModals";
import useSaveTraining from "@/hooks/useSaveTraining";
import { TrainingProps } from "@/types";

export const Training = ({
  fetchedWod,
  setFetchedWod,
  isNotFavorite,
  id,
}: TrainingProps) => {
  const { isSaving, saveTraining, deleteTraining } = useSaveTraining();
  const { isModalOpen, isTrainingModalOpen, openModal, closeModal } =
    useModals();

  const handleDelete = () => {
    deleteTraining(id);
    closeModal("delete");
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
            fetchedWod.time && (
              <p className="text-sm text-gray-400">
                Time: <span className="text-gray-300">{fetchedWod.time}</span>{" "}
                min
              </p>
            )
          )}
          <h2 className="font-semibold text-xl text-success-500 flex-grow text-center">
            {fetchedWod.type}
          </h2>
          <div className="flex gap-2">
            <Button
              color={isNotFavorite ? "success" : "danger"}
              disabled={isNotFavorite && isSaving}
              variant={isNotFavorite ? "flat" : "light"}
              onPress={() =>
                isNotFavorite
                  ? saveTraining(JSON.stringify(fetchedWod, null, 2), () =>
                      setFetchedWod(null)
                    )
                  : openModal("delete")
              }
            >
              {isNotFavorite ? isSaving ? "Saving..." : "Save" : <DeleteIcon />}
            </Button>
            {!isNotFavorite && (
              <Button variant="light" onPress={() => openModal("details")}>
                <ArrowsPointing />
              </Button>
            )}
          </div>
        </CardHeader>
        <Divider />
        <CardBody
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 py-4 ${!isNotFavorite ? "mb-4 max-h-40 overflow-hidden relative" : ""}`}
        >
          {!isNotFavorite && (
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />
          )}
          {Object.entries(fetchedWod)
            .filter(([key]) => key !== "type" && key !== "time")
            .map(([key, value]) =>
              value ? (
                <div key={key} className="p-4 rounded-lg shadow-md bg-content1">
                  <h3 className="text-lg font-bold uppercase text-left mb-3 text-gray-200">
                    {key}
                  </h3>
                  <Divider />
                  <pre className="whitespace-pre-wrap text-sm mt-3 text-gray-300">
                    {value}
                  </pre>
                </div>
              ) : null
            )}
        </CardBody>
      </Card>
      <DetailsModal
        fetchedWod={fetchedWod}
        isOpen={isTrainingModalOpen}
        onOpenChange={() => closeModal("details")}
      />
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => closeModal("delete")}
        onConfirm={handleDelete}
      />
    </>
  );
};
