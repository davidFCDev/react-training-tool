/* eslint-disable no-console */
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { TrainingData } from "@/types";

interface TrainingResponse {
  training: TrainingData;
}

const initialTrainingState: TrainingData = {
  type: "",
  warmup: "",
  strength: "",
  metcon: "",
  accessory: "",
};

const useTraining = () => {
  const [fetchedTraining, setFetchedTraining] = useState<TrainingData | null>(
    initialTrainingState
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get training from API
  const getTraining = useCallback(
    async (trainingType: string, duration: string, observations?: string) => {
      setLoading(true);
      setError(null);

      try {
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
            "Response is not valid. Please check the API response."
          );
        }

        setFetchedTraining(data.training);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";

        setError(errorMessage);
        toast.error("Error getting training. Please try again later.");
        console.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Save training manually
  const saveTraining = useCallback(async (formData: TrainingData) => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFetchedTraining(formData);
      toast.success("Workout saved successfully!");
    } catch (error) {
      console.error("Error saving training:", error);
      toast.error("Error saving training. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchedTraining,
    loading,
    error,
    getTraining,
    saveTraining,
    setFetchedTraining,
  };
};

export default useTraining;
