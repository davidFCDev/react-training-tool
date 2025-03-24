import { CardHeader } from "@nextui-org/card";

import { ArrowsPointing, DeleteIcon, PencilIcon } from "../common/icons";
import TooltipButton from "../common/TooltipButton";

import { Training, TrainingData } from "@/types";

type TrainingHeaderProps = {
  isNotFavorite: boolean;
  openModal: (modal: "delete" | "details" | "edit" | "name") => void;
  fetchedWod: Training | TrainingData;
  handleEditTraining: (training: TrainingData) => void;
};

const TrainingHeader = ({
  isNotFavorite,
  openModal,
  fetchedWod,
  handleEditTraining,
}: TrainingHeaderProps) => {
  const trainingData: TrainingData =
    "training" in fetchedWod ? fetchedWod.training : fetchedWod;

  return (
    <CardHeader
      className={`${isNotFavorite ? "justify-center py-4" : "justify-between p-1 px-2"} flex items-center gap-4`}
    >
      {!isNotFavorite && (
        <TooltipButton
          buttonProps={"scale-80"}
          color="default"
          icon={<DeleteIcon />}
          tooltipText="Delete workout"
          variant="flat"
          onClick={() => openModal("delete")}
        />
      )}

      <div className={`${isNotFavorite ? "gap-4" : "gap-2"} flex items-center`}>
        {trainingData?.time && (
          <span
            className={`${isNotFavorite ? "text-base" : "text-sm"} font-bold bg-success rounded-md text-zinc-900 px-2`}
          >
            {trainingData.time}&apos;
          </span>
        )}
        <h2
          className={`${isNotFavorite ? "text-2xl" : "text-lg"} font-semibold text-zinc-200 flex-grow text-center anton-regular tracking-wider uppercase`}
        >
          {trainingData?.type || "Training"}
        </h2>
      </div>

      {!isNotFavorite && (
        <div className="flex items-center">
          <TooltipButton
            buttonProps={"scale-75"}
            icon={<ArrowsPointing />}
            tooltipText="Show details"
            variant="flat"
            onClick={() => openModal("details")}
          />
          <TooltipButton
            buttonProps={"scale-75"}
            icon={<PencilIcon />}
            tooltipText="Edit workout"
            variant="flat"
            onClick={() => handleEditTraining(trainingData)}
          />
        </div>
      )}
    </CardHeader>
  );
};

export default TrainingHeader;
