"use client";
/* eslint-disable prettier/prettier */
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";

import { DeleteIcon } from "./Icons";

import useSaveTraining from "@/hooks/useSaveTraining";
import { TrainingProps } from "@/types";

export const Training = ({
  fetchedWod,
  setFetchedWod,
  isNotFavorite,
  id,
}: TrainingProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSaving, saveTraining, deleteTraining } = useSaveTraining();

  const handleDelete = () => {
    deleteTraining(id);
    setIsModalOpen(false);
  };

  // TODO: Extraer modal

  return (
    <>
      <Card className="w-full max-w-3xl p-6 rounded-lg shadow-lg">
        {/* Header */}
        <CardHeader className="flex justify-between items-center">
          {isNotFavorite ? (
            <Button
              color="default"
              variant="flat"
              onPress={() => setFetchedWod(null)}
            >
              Back
            </Button>
          ) : (
            <div className="invisible" />
          )}

          <h2 className="font-semibold text-2xl text-success-500">
            {fetchedWod.type}
          </h2>

          <Button
            color={isNotFavorite ? "success" : "danger"}
            disabled={isNotFavorite && isSaving}
            variant={isNotFavorite ? "flat" : "light"}
            onPress={() =>
              isNotFavorite
                ? saveTraining(JSON.stringify(fetchedWod, null, 2), () =>
                    setFetchedWod(null)
                  )
                : setIsModalOpen(true)
            }
          >
            {isNotFavorite ? isSaving ? "Saving..." : "Save" : <DeleteIcon />}
          </Button>
        </CardHeader>

        <Divider />

        {/* Column content */}
        <CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
          {Object.entries(fetchedWod)
            .filter(([key]) => key !== "type")
            .map(([key, value]) =>
              value ? (
                <div key={key} className="p-4 rounded-lg shadow-md bg-content1">
                  <h3 className="text-lg font-bold uppercase text-left mb-3">
                    {key}
                  </h3>
                  <Divider />
                  <pre className="whitespace-pre-wrap text-sm mt-3">
                    {value}
                  </pre>
                </div>
              ) : null
            )}
        </CardBody>
      </Card>

      <Modal
        isOpen={isModalOpen}
        size="xl"
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this training?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={handleDelete}>
                  Yes, Delete
                </Button>
                <Button color="default" onPress={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
