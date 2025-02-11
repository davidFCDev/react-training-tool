/* eslint-disable no-console */
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface Training {
  warmup?: string;
  strength?: string;
  metcon?: string;
  accessory?: string;
  notes?: string;
}

interface TrainingResponse {
  training: Training;
}

const initialTrainingState: Training = {
  warmup: "",
  strength: "",
  metcon: "",
  accessory: "",
  notes: "",
};

const useTraining = () => {
  const [fetchedTraining, setFetchedTraining] = useState<Training | null>(
    initialTrainingState
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTraining = useCallback(
    async (trainingType: string, duration: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/trainner?training_type=${trainingType}&duration=${duration}`
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: TrainingResponse = await response.json();

        if (!data?.training || typeof data.training !== "object") {
          throw new Error(
            "La respuesta no contiene un objeto 'training' válido."
          );
        }

        setFetchedTraining(data.training);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";

        setError(errorMessage);
        toast.error("No se ha podido generar el entrenamiento");
        console.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    fetchedTraining,
    loading,
    error,
    getTraining,
    setFetchedTraining,
  };
};

export default useTraining;
