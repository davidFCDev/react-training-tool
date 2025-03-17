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
      className={`grid gap-5 ${
        isNotFavorite
          ? "max-h-80 overflow-y-auto p-4"
          : "max-h-40 overflow-hidden flex items-center justify-center py-4 mt-2"
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
        <div className="flex flex-col items-center justify-start gap-3 w-full text-sm">
          {!!trainingData?.name && (
            <div className="flex items-center bg-zinc-800 p-2 rounded-md w-full justify-center">
              <p className="font-semibold">{trainingData.name}</p>
            </div>
          )}

          <div className="flex items-center bg-zinc-800 p-2 rounded-md w-full justify-center">
            <p className="font-light italic text-zinc-300">
              {date
                ? new Date(date).toLocaleDateString("en-EN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "No date available"}
            </p>
          </div>
        </div>
      )}
    </CardBody>
  );
};

export default TrainingBody;
