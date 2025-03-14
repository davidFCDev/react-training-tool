import { CardBody } from "@nextui-org/card";

import InfoCard from "../common/InfoCard";

type TrainingBodyProps = {
  isNotFavorite: boolean;
  fetchedWod: Record<string, any>;
};

const TrainingBody = ({ isNotFavorite, fetchedWod }: TrainingBodyProps) => {
  const fields = ["warmup", "strength", "metcon", "accessory"];
  const filteredFields = fields.filter((key) => fetchedWod[key]);

  return (
    <CardBody
      className={`grid gap-6 ${
        !isNotFavorite
          ? "max-h-40 overflow-hidden flex items-center justify-center py-6"
          : "max-h-80 overflow-y-auto py-4"
      }`}
      style={{
        gridTemplateColumns: `repeat(${filteredFields.length || 1}, minmax(200px, 1fr))`,
      }}
    >
      {isNotFavorite ? (
        filteredFields.map((key) => (
          <InfoCard key={key} content={String(fetchedWod[key])} title={key} />
        ))
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
