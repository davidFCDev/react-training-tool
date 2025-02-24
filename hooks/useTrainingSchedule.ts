/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { toast } from "sonner";

import DataService from "@/service/data.service";

interface Training {
  id: string;
  date: string;
  training: Record<string, any>;
}

interface TrainingSchedule {
  [date: string]: Record<string, any>;
}

const useTrainingSchedule = () => {
  const [trainingSchedule, setTrainingSchedule] = useState<TrainingSchedule>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);
  const dataService = new DataService();

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async (): Promise<void> => {
    setLoading(true);
    try {
      const scheduleData: Training[] =
        await dataService.getCollection("programming");
      const formattedSchedule: TrainingSchedule = scheduleData.reduce(
        (acc: TrainingSchedule, item: Training) => {
          if (item.date) acc[item.date] = { ...item.training, date: item.date };

          return acc;
        },
        {}
      );

      setTrainingSchedule(formattedSchedule);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTraining = async (
    date: string,
    training: Record<string, any>
  ): Promise<void> => {
    try {
      await dataService.addDocument("programming", { date, training });
      setTrainingSchedule((prev) => ({ ...prev, [date]: training }));
      toast.success("Training assigned successfully!");
    } catch (error) {
      toast.error("Failed to assign training.");
      console.error("Error saving training:", error);
    }
  };

  const removeTraining = async (date: string): Promise<void> => {
    try {
      const querySnapshot: Training[] =
        await dataService.getCollection("programming");
      const docToDelete = querySnapshot.find((item) => item.date === date);

      if (docToDelete)
        await dataService.deleteDocument("programming", docToDelete.id);
      setTrainingSchedule((prev) => {
        const updatedSchedule = { ...prev };

        delete updatedSchedule[date];

        return updatedSchedule;
      });
      toast.success("Training removed successfully!");
    } catch (error) {
      toast.error("Failed to remove training.");
      console.error("Error removing training:", error);
    }
  };

  return {
    trainingSchedule,
    loading,
    fetchSchedule,
    addTraining,
    removeTraining,
  };
};

export default useTrainingSchedule;
