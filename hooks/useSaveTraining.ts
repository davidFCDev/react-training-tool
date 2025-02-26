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

const useSaveTraining = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const dataService = new DataService();

  const saveTraining = useCallback(
    async (training: Record<string, any>, onSuccess?: () => void) => {
      if (!training || Object.keys(training).length === 0) {
        toast.error("Cannot save an empty workout.");

        return;
      }

      setIsSaving(true);
      setSaveError(null);
      const id = nanoid();

      try {
        await dataService.addDocumentWithId("favorites", id, training);
        dispatch(addFavorite({ id, training }));
        toast.success("Workout saved successfully.");
        if (onSuccess) onSuccess();
      } catch {
        setSaveError("Error saving the workout. Please try again later.");
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
        setSaveError("Error removing the workout. Please try again later.");
        toast.error("Failed to remove workout.");
      } finally {
        setIsSaving(false);
      }
    },
    [dispatch, dataService]
  );

  const updateTraining = useCallback(
    async (id: string, updatedTraining: Record<string, any>) => {
      if (
        !id ||
        !updatedTraining ||
        Object.keys(updatedTraining).length === 0
      ) {
        toast.error("Invalid workout data.");

        return;
      }

      setIsSaving(true);
      setSaveError(null);

      try {
        await dataService.updateDocument("favorites", id, updatedTraining);
        dispatch(updateFavorite({ id, training: updatedTraining }));
        toast.success("Workout updated successfully.");
      } catch {
        setSaveError("Error updating the workout. Please try again later.");
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
  };
};

export default useSaveTraining;
