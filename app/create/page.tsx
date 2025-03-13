"use client";

import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { useState } from "react";

import CreateFormContainer from "@/components/create/CreateFormContainer";
import { IATrainingForm } from "@/components/create/IATrainingForm";
import ManualTrainingForm from "@/components/create/ManualTrainingForm";
import withAuth from "@/components/hoc/withAuth";
import { Training } from "@/components/trainings/Training";
import useTraining from "@/hooks/useTraining";

const isEmptyTraining = (training: any) =>
  !training || Object.values(training).every((value) => !value);

const FORM_CONFIG = {
  IA: {
    title: "Generator",
    colorTitle: "AI",
    subtitle: "Generate a workout using the AI Training Generator",
    form: (props: any) => <IATrainingForm {...props} />,
  },
  manual: {
    title: "Workout",
    colorTitle: "New",
    subtitle: "Create your custom workout by filling the form below",
    form: (props: any) => <ManualTrainingForm {...props} />,
  },
};

function Create() {
  const {
    getTraining,
    saveTraining,
    loading,
    fetchedTraining,
    setFetchedTraining,
  } = useTraining();
  const [mode, setMode] = useState<"IA" | "manual">("manual");

  const currentForm = FORM_CONFIG[mode];

  return (
    <div className="w-full min-w-80 h-[80vh] flex flex-col items-center justify-between">
      {!loading && (!fetchedTraining || isEmptyTraining(fetchedTraining)) && (
        <>
          <CreateFormContainer
            colorTitle={currentForm.colorTitle}
            form={currentForm.form({
              loading,
              setFetchedWod: setFetchedTraining,
              onSubmit: mode === "IA" ? getTraining : saveTraining,
            })}
            subtitle={currentForm.subtitle}
            title={currentForm.title}
          />

          <footer className="flex space-x-4">
            {Object.keys(FORM_CONFIG).map((key) => (
              <Button
                key={key}
                color={mode === key ? "success" : "default"}
                variant="light"
                onPress={() => setMode(key as "IA" | "manual")}
              >
                {key === "IA"
                  ? "IA Training Generator"
                  : "Manual Training Generator"}
              </Button>
            ))}
          </footer>
        </>
      )}

      {loading && (
        <div className="flex justify-center items-center h-80">
          <Spinner color="success" size="lg" />
        </div>
      )}

      {!loading && fetchedTraining && !isEmptyTraining(fetchedTraining) && (
        <div className="min-w-80 mt-10">
          <Training
            fetchedWod={fetchedTraining}
            id=""
            isNotFavorite={true}
            mode={mode}
            setFetchedWod={setFetchedTraining}
          />
        </div>
      )}
    </div>
  );
}

export default withAuth(Create);
