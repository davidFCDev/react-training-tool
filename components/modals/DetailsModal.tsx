"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";

import { DeleteIcon, UpdateIcon } from "../common/icons";
import InfoCard from "../common/InfoCard";
import TooltipButton from "../common/TooltipButton";

import { DetailsModalProps, FullTraining, TrainingData } from "@/types";

const DetailsModal = ({
  isOpen,
  onOpenChange,
  fetchedWod = {} as TrainingData | FullTraining, // Default value to avoid errors
  showChangeButton = false,
  onChangeTraining,
  onDeleteTraining,
}: DetailsModalProps) => {
  // Detect if fetchedWod is a FullTraining or a TrainingData
  const trainingData: TrainingData =
    "training" in fetchedWod ? fetchedWod.training : fetchedWod;

  const { type, time, name, ...details } = trainingData;

  // Order to display the details
  const order = ["warmup", "strength", "metcon", "accessory"];
  const detailEntries = Object.entries(details)
    .filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
    .sort(([a], [b]) => order.indexOf(a) - order.indexOf(b));

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="max-w-4xl w-auto">
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-center gap-5 py-4">
              <div className="flex items-center gap-4">
                {time && (
                  <span className="text-zinc-900 bg-success-500 font-bold text-sm px-2 py-1 rounded-lg">
                    {time}&apos;
                  </span>
                )}
                <h2 className="text-3xl font-semibold text-zinc-200 text-center anton-regular tracking-wider uppercase">
                  {type || "Training"}
                </h2>
                {name && (
                  <span className="text-zinc-300 italic bg-zinc-800 px-3 py-1 rounded-lg">
                    {name}
                  </span>
                )}
              </div>
            </ModalHeader>

            <Divider />

            <ModalBody>
              <div
                className="grid gap-3 py-4"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(
                    detailEntries.length,
                    4
                  )}, minmax(200px, 1fr))`,
                }}
              >
                {detailEntries.map(([key, value]) => (
                  <InfoCard key={key} content={String(value)} title={key} />
                ))}
              </div>
            </ModalBody>

            <Divider />

            <ModalFooter className="flex justify-end">
              {showChangeButton && (
                <div className="flex gap-1">
                  {onChangeTraining && (
                    <TooltipButton
                      icon={<UpdateIcon />}
                      tooltipText="Change workout"
                      variant="light"
                      onClick={onChangeTraining}
                    />
                  )}

                  {onDeleteTraining && (
                    <TooltipButton
                      color="danger"
                      icon={<DeleteIcon />}
                      tooltipText="Delete workout"
                      variant="light"
                      onClick={onDeleteTraining}
                    />
                  )}
                </div>
              )}

              <Button color="default" variant="faded" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DetailsModal;
