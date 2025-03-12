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
  !training || Object.values(training).every((value) => value === "");

const FORM_CONFIG = {
  IA: {
    title: "Generator",
    colorTitle: "Workout",
    subtitle:
      "Select your workout type and duration, then generate your custom workout!",
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
  const { getTraining, loading, fetchedTraining, setFetchedTraining } =
    useTraining();
  const [mode, setMode] = useState<"IA" | "manual">("manual");

  const currentForm = FORM_CONFIG[mode];

  const handleSave = (formData: any) => {
    setFetchedTraining(formData);
  };

  return (
    <div className="w-full min-w-80 h-[80vh] flex flex-col items-center justify-between">
      {/* Conditionally render forms */}
      {!loading && (!fetchedTraining || isEmptyTraining(fetchedTraining)) && (
        <CreateFormContainer
          colorTitle={currentForm.colorTitle}
          form={currentForm.form({
            loading,
            setFetchedWod: setFetchedTraining,
            onSubmit: mode === "IA" ? getTraining : handleSave,
          })}
          subtitle={currentForm.subtitle}
          title={currentForm.title}
        />
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center items-center h-80">
          <Spinner color="success" size="lg" />
        </div>
      )}

      {/* Show training if available */}
      {!loading && fetchedTraining && !isEmptyTraining(fetchedTraining) && (
        <div className="min-w-80">
          <Training
            fetchedWod={fetchedTraining}
            id=""
            isNotFavorite={true}
            setFetchedWod={setFetchedTraining}
          />
        </div>
      )}

      {/* Mode toggle buttons */}
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
    </div>
  );
}

export default withAuth(Create);
