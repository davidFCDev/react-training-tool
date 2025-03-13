import { CardBody } from "@nextui-org/card";

import InfoCard from "../common/InfoCard";

type TrainingBodyProps = {
  isNotFavorite: boolean;
  fetchedWod: any;
};

const TrainingBody = ({ isNotFavorite, fetchedWod }: TrainingBodyProps) => {
  return (
    <CardBody
      className={`grid gap-6  ${
        !isNotFavorite
          ? "max-h-40 overflow-hidden flex items-center justify-center py-6"
          : "max-h-80 overflow-y-auto py-4"
      }`}
      style={{
        gridTemplateColumns: isNotFavorite
          ? `repeat(${Math.min(
              Object.keys(fetchedWod || {}).filter(
                (key) => key !== "type" && key !== "time"
              ).length,
              4
            )}, minmax(200px, 1fr))`
          : "1fr",
      }}
    >
      {isNotFavorite ? (
        Object.entries(fetchedWod || {})
          .filter(([key]) => key !== "type" && key !== "time" && key !== "name")
          .map(([key, value]) =>
            value ? (
              <InfoCard key={key} content={String(value)} title={key} />
            ) : null
          )
      ) : (
        <div className="flex items-center justify-start gap-3">
          <h3 className="text-base font-bold uppercase text-left text-success-500">
            Info:
          </h3>
          <pre className="whitespace-pre-wrap text-base text-zinc-300">
            {fetchedWod?.name || "No description available"}
          </pre>
        </div>
      )}
    </CardBody>
  );
};

export default TrainingBody;
