import { Button } from "@nextui-org/button";
import { CardHeader } from "@nextui-org/card";

import {
  ArrowsPointing,
  DeleteIcon,
  LoveIcon,
  PencilIcon,
} from "../common/icons";
import TooltipButton from "../common/TooltipButton";

import { Training, TrainingData } from "@/types";

type TrainingHeaderProps = {
  isNotFavorite: boolean;
  setFetchedWod: (wod: Training | TrainingData | null) => void;
  openModal: (modal: "delete" | "details" | "edit" | "name") => void;
  fetchedWod: Training | TrainingData;
  handleOpenNameModal: () => void;
  handleEditTraining: (training: TrainingData) => void;
  mode: "IA" | "manual";
  isSaving: boolean;
};

const TrainingHeader = ({
  isNotFavorite,
  setFetchedWod,
  openModal,
  fetchedWod,
  isSaving,
  handleOpenNameModal,
  handleEditTraining,
  mode,
}: TrainingHeaderProps) => {
  const trainingData: TrainingData =
    "training" in fetchedWod ? fetchedWod.training : fetchedWod;

  return (
    <CardHeader className="flex justify-between items-center gap-4 py-4">
      {isNotFavorite ? (
        <Button
          color="default"
          variant="light"
          onPress={() => setFetchedWod(null)}
        >
          Back
        </Button>
      ) : (
        <TooltipButton
          buttonProps={"scale-85"}
          color="default"
          icon={<DeleteIcon />}
          tooltipText="Delete workout"
          onClick={() => openModal("delete")}
        />
      )}
      <div className={`${isNotFavorite ? "gap-4" : "gap-2"} flex items-center`}>
        {trainingData?.time && (
          <span
            className={`${isNotFavorite ? "text-lg" : "text-sm"} text-zinc-900 bg-success-500 font-semibold px-2 rounded-sm`}
          >
            {trainingData.time} &apos;
          </span>
        )}
        <h2
          className={`${isNotFavorite ? "text-3xl" : "text-lg"} font-semibold text-zinc-200 flex-grow text-center anton-regular tracking-wider uppercase`}
        >
          {trainingData?.type || "Training"}
        </h2>
        {trainingData?.name && isNotFavorite && " - "}
        {trainingData?.name && isNotFavorite && (
          <span className="text-zinc-300 italic">{trainingData.name}</span>
        )}
      </div>
      <div className="flex gap-2">
        {mode === "IA" ? (
          isNotFavorite ? (
            <TooltipButton
              color="danger"
              disabled={isSaving}
              icon={<LoveIcon />}
              tooltipText="Save the workout"
              onClick={handleOpenNameModal}
            />
          ) : (
            <div className="flex items-center">
              <TooltipButton
                buttonProps={"scale-80"}
                icon={<ArrowsPointing />}
                tooltipText="Show details"
                variant="light"
                onClick={() => openModal("details")}
              />
              <TooltipButton
                buttonProps={"scale-80"}
                icon={<PencilIcon />}
                tooltipText="Edit workout"
                onClick={() => handleEditTraining(trainingData)}
              />
            </div>
          )
        ) : mode === "manual" ? (
          <TooltipButton
            buttonProps={"scale-80"}
            icon={<PencilIcon />}
            tooltipText="Edit workout"
            onClick={() => handleEditTraining(trainingData)}
          />
        ) : null}
      </div>
    </CardHeader>
  );
};

export default TrainingHeader;
