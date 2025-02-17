/* eslint-disable no-console */
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface Training {
  type?: string;
  warmup?: string;
  strength?: string;
  metcon?: string;
  accessory?: string;
}

interface TrainingResponse {
  training: Training;
}

const initialTrainingState: Training = {
  type: "",
  warmup: "",
  strength: "",
  metcon: "",
  accessory: "",
};

const useTraining = () => {
  const [fetchedTraining, setFetchedTraining] = useState<Training | null>(
    initialTrainingState
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTraining = useCallback(
    async (trainingType: string, duration: string, observations?: string) => {
      setLoading(true);
      setError(null);

      try {
        // Dinamic URL
        let url = `/api/trainner?training_type=${trainingType}&duration=${duration}`;

        if (observations) {
          url += `&observations=${encodeURIComponent(observations)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: TrainingResponse = await response.json();

        if (!data?.training || typeof data.training !== "object") {
          throw new Error(
            "Response is not valid. Please check the API response"
          );
        }

        setFetchedTraining(data.training);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";

        setError(errorMessage);
        toast.error("Error getting training. Please try again later");
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
