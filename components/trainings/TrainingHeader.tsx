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
      className={`${isNotFavorite ? "justify-center" : "justify-between"} flex items-center gap-4 py-4 `}
    >
      {!isNotFavorite && (
        <TooltipButton
          buttonProps={"scale-85"}
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
            className={`${isNotFavorite ? "text-base" : "text-sm"} font-bold bg-success rounded-lg text-zinc-900 px-3`}
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

      <div className="flex gap-2">
        {!isNotFavorite && (
          <div className="flex items-center">
            <TooltipButton
              buttonProps={"scale-80"}
              icon={<ArrowsPointing />}
              tooltipText="Show details"
              variant="flat"
              onClick={() => openModal("details")}
            />
            <TooltipButton
              buttonProps={"scale-80"}
              icon={<PencilIcon />}
              tooltipText="Edit workout"
              variant="flat"
              onClick={() => handleEditTraining(trainingData)}
            />
          </div>
        )}
      </div>
    </CardHeader>
  );
};

export default TrainingHeader;
