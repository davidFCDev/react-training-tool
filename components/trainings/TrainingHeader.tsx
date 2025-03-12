import { Button } from "@nextui-org/button";
import { CardHeader } from "@nextui-org/card";

import { ArrowsPointing, DeleteIcon, LoveIcon } from "../common/icons";
import TooltipButton from "../common/TooltipButton";

import { TrainingData } from "@/types";

type TrainingHeaderProps = {
  isNotFavorite: boolean;
  setFetchedWod: (wod: TrainingData | null) => void;
  openModal: (modal: "delete" | "details" | "edit" | "name") => void;
  fetchedWod: TrainingData;
  isSaving: boolean;
  handleOpenNameModal: () => void;
  handleEditTraining: (training: TrainingData) => void;
};

const TrainingHeader = ({
  isNotFavorite,
  setFetchedWod,
  openModal,
  fetchedWod,
  isSaving,
  handleOpenNameModal,
  handleEditTraining,
}: TrainingHeaderProps) => {
  return (
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
            onClick={handleOpenNameModal}
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
  );
};

export default TrainingHeader;
