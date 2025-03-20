"use client";

import { Spinner } from "@nextui-org/spinner";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import ButtonMode from "@/components/create/ButtonMode";
import CreateFormContainer from "@/components/create/CreateFormContainer";
import { IATrainingForm } from "@/components/create/IATrainingForm";
import LoadingAI from "@/components/create/LoadingAI";
import ManualTrainingForm from "@/components/create/ManualTrainingForm";
import withAuth from "@/components/hoc/withAuth";
import { Training } from "@/components/trainings/Training";
import useTraining from "@/hooks/useTraining";
import { TrainingData } from "@/types";

const isEmptyTraining = (training: any) =>
  !training || Object.values(training).every((value) => !value);

const FORM_CONFIG = {
  IA: {
    title: "Coach",
    colorTitle: "AI",
    image: "/bot.png",
    subtitle: "Get a workout from our AI Training Coach",
    form: (props: any) => <IATrainingForm {...props} />,
  },
  manual: {
    title: "Workout",
    colorTitle: "New",
    image: "",
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
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              animate={{ opacity: 1 }}
              className="w-full"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CreateFormContainer
                colorTitle={currentForm.colorTitle}
                form={currentForm.form({
                  loading,
                  setFetchedWod: setFetchedTraining,
                  onSubmit: mode === "IA" ? getTraining : saveTraining,
                })}
                image={currentForm.image}
                subtitle={currentForm.subtitle}
                title={currentForm.title}
              />
            </motion.div>
          </AnimatePresence>

          <footer className="flex space-x-4">
            {Object.keys(FORM_CONFIG).map((key) => (
              <ButtonMode
                key={key}
                currentMode={mode}
                mode={key as "IA" | "manual"}
                onClick={() => setMode(key as "IA" | "manual")}
              />
            ))}
          </footer>
        </>
      )}

      {loading && mode === "IA" ? (
        <LoadingAI />
      ) : loading ? (
        <div className="flex justify-center items-center h-80">
          <Spinner color="success" size="lg" />
        </div>
      ) : null}

      {!loading && fetchedTraining && !isEmptyTraining(fetchedTraining) && (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="min-w-80 mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <Training
            fetchedWod={fetchedTraining}
            id=""
            isNotFavorite={true}
            mode={mode}
            setFetchedWod={(wod) =>
              setFetchedTraining(wod as TrainingData | null)
            }
          />
        </motion.div>
      )}
    </div>
  );
}

export default withAuth(Create);
