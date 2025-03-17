import { CardBody } from "@nextui-org/card";

import InfoCard from "../common/InfoCard";

import { FullTraining, TrainingData } from "@/types";

type TrainingBodyProps = {
  isNotFavorite: boolean;
  fetchedWod: FullTraining | TrainingData;
  date: string | null;
};

const TrainingBody = ({
  isNotFavorite,
  fetchedWod,
  date,
}: TrainingBodyProps) => {
  const trainingData: TrainingData =
    (fetchedWod as FullTraining)?.training ?? fetchedWod;

  const fields = ["warmup", "strength", "metcon", "accessory"];
  const filteredFields = fields.filter(
    (key) => trainingData[key as keyof TrainingData]
  );

  return (
    <CardBody
      className={`grid gap-6 ${
        isNotFavorite
          ? "max-h-80 overflow-y-auto py-4"
          : "max-h-40 overflow-hidden flex items-center justify-center py-6"
      }`}
      style={{
        gridTemplateColumns: `repeat(${filteredFields.length || 1}, minmax(200px, 1fr))`,
      }}
    >
      {isNotFavorite ? (
        filteredFields.map((key) => (
          <InfoCard
            key={key}
            content={String(trainingData[key as keyof TrainingData])}
            title={key}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-start gap-3">
          {!!trainingData?.name && (
            <div className="flex items-center gap-2">
              <h4>Info:</h4>
              <p>{trainingData.name}</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <h4>Created:</h4>
            <p>{date}</p>
          </div>
        </div>
      )}
    </CardBody>
  );
};

export default TrainingBody;
