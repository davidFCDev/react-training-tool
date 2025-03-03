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

import { DeleteIcon, UpdateIcon } from "./icons";
import InfoCard from "./InfoCard";
import TooltipButton from "./TooltipButton";

import { DetailsModalProps } from "@/types";

const DetailsModal = ({
  isOpen,
  onOpenChange,
  fetchedWod = {},
  showChangeButton = false,
  onChangeTraining,
  onDeleteTraining,
}: DetailsModalProps) => {
  const { type, time, ...details } = fetchedWod;
  const detailEntries = Object.entries(details).filter(([, value]) => value);

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="max-w-fit w-auto">
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center gap-5">
                <div className="flex items-center gap-4">
                  <h2
                    className={`text-xl font-semibold text-success-500 flex-grow text-center anton-regular tracking-wider uppercase`}
                  >
                    {type || "Training"}
                  </h2>
                  {time && (
                    <span className="text-sm border border-zinc-600 text-zinc-300 py-1 px-2 rounded-sm">
                      {fetchedWod.time} &apos;
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
                    )}, 1fr)`,
                  }}
                >
                  {detailEntries.map(([key, value]) => (
                    <InfoCard key={key} content={String(value)} title={key} />
                  ))}
                </div>
              </ModalBody>

              <ModalFooter className="flex justify-between">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                {showChangeButton && (
                  <div className="flex gap-4">
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
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailsModal;
