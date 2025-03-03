/* eslint-disable no-console */
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import {
  addFavorite,
  removeFavorite,
  updateFavorite,
} from "@/redux/favoritesReducer";
import { useAppDispatch } from "@/redux/store";
import DataService from "@/service/data.service";
import { TrainingData } from "@/types";

const useSaveTraining = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [trainingToEdit, setTrainingToEdit] = useState<TrainingData | null>(
    null
  );
  const dispatch = useAppDispatch();
  const dataService = new DataService();

  const saveTraining = useCallback(
    async (training: TrainingData, onSuccess?: () => void) => {
      if (!training || Object.keys(training).length === 0) {
        toast.error("Cannot save an empty workout.");

        return;
      }

      setIsSaving(true);
      setSaveError(null);

      const id = nanoid();
      const createdAt = new Date().toISOString();

      try {
        await dataService.addDocumentWithId(
          "favorites",
          id,
          training,
          createdAt
        );
        dispatch(addFavorite({ id, createdAt, training }));
        toast.success("Workout saved successfully.");
        onSuccess?.();
      } catch {
        setSaveError("Error saving workout.");
        toast.error("Failed to save workout.");
      } finally {
        setIsSaving(false);
      }
    },
    [dispatch, dataService]
  );

  const deleteTraining = useCallback(
    async (id: string) => {
      if (!id) {
        toast.error("Invalid workout ID.");

        return;
      }

      setIsSaving(true);
      setSaveError(null);

      try {
        await dataService.deleteDocument("favorites", id);
        dispatch(removeFavorite(id));
        toast.success("Workout removed successfully.");
      } catch {
        setSaveError("Error removing workout.");
        toast.error("Failed to remove workout.");
      } finally {
        setIsSaving(false);
      }
    },
    [dispatch, dataService]
  );

  const updateTraining = useCallback(
    async (id: string, training: TrainingData) => {
      if (!id || !training || Object.keys(training).length === 0) {
        toast.error("Invalid workout data.");

        return;
      }

      setIsSaving(true);
      setSaveError(null);

      const updatedData = { createdAt: new Date().toISOString(), training };

      try {
        await dataService.updateDocument("favorites", id, updatedData);
        dispatch(updateFavorite({ id, ...updatedData }));
        toast.success("Workout updated successfully.");
      } catch {
        setSaveError("Error updating workout.");
        toast.error("Failed to update workout.");
      } finally {
        setIsSaving(false);
      }
    },
    [dispatch, dataService]
  );

  return {
    isSaving,
    saveError,
    saveTraining,
    deleteTraining,
    updateTraining,
    trainingToEdit,
    setTrainingToEdit,
  };
};

export default useSaveTraining;
