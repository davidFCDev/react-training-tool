import { Button } from "@nextui-org/button";
import { CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

type TrainingFooterProps = {
  isNotFavorite: boolean;
  setFetchedWod: (wod: any) => void;
  openModal: (modal: "delete" | "details" | "edit" | "name") => void;
  mode: "IA" | "manual";
};

const TrainingFooter = ({
  isNotFavorite,
  setFetchedWod,
  openModal,
  mode,
}: TrainingFooterProps) => {
  return (
    <div>
      {isNotFavorite && (
        <>
          <Divider />
          <CardFooter className="flex justify-end gap-4 py-4">
            <Button
              color="default"
              variant="light"
              onPress={() => setFetchedWod(null)}
            >
              Back
            </Button>
            {mode === "IA" && (
              <Button
                color="success"
                variant="solid"
                onPress={() => openModal("name")}
              >
                Save
              </Button>
            )}
          </CardFooter>
        </>
      )}
    </div>
  );
};

export default TrainingFooter;
