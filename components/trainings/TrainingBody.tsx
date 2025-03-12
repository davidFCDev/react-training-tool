import { CardBody } from "@nextui-org/card";

type TrainingBodyProps = {
  isNotFavorite: boolean;
  fetchedWod: any;
};

const TrainingBody = ({ isNotFavorite, fetchedWod }: TrainingBodyProps) => {
  return (
    <CardBody
      className={`grid gap-6 py-2 ${
        !isNotFavorite
          ? "max-h-40 overflow-hidden flex items-center justify-center"
          : "max-h-80 overflow-y-auto"
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
          .filter(([key]) => key !== "type" && key !== "time")
          .map(([key, value]) =>
            value ? (
              <div key={key} className="p-4 rounded-lg shadow-md bg-content1">
                <h3 className="text-lg font-bold uppercase text-left mb-3 text-zinc-200">
                  {key}
                </h3>
                <pre className="whitespace-pre-wrap text-sm mt-3 text-zinc-300">
                  {String(value)}
                </pre>
              </div>
            ) : null
          )
      ) : (
        <pre
          className="text-sm text-zinc-300 text-left"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {fetchedWod?.metcon || "No metcon available"}
        </pre>
      )}
    </CardBody>
  );
};

export default TrainingBody;
