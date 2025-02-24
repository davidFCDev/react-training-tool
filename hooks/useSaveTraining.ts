import { useCallback, useState } from "react";
import { toast } from "sonner";

import { removeFavorite } from "@/redux/favoritesReducer";
import { useAppDispatch } from "@/redux/store";
import DataService from "@/service/data.service";

const useSaveTraining = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const saveTraining = useCallback(
    async (training: string, onSuccess?: () => void) => {
      if (!training.trim()) {
        toast.error("Cannot save an empty workout.");

        return;
      }

      setIsSaving(true);
      setSaveError(null);
      const dataService = new DataService();

      try {
        await dataService.addDocument("favorites", { training });
        toast.success("Workout saved successfully.");

        if (onSuccess) onSuccess();
      } catch {
        setSaveError("Error saving the workout. Please try again later.");
        toast.error("Failed to save workout.");
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  const deleteTraining = useCallback(
    async (id: string) => {
      if (!id) {
        toast.error("Invalid workout ID.");

        return;
      }

      setIsSaving(true);
      setSaveError(null);
      const dataService = new DataService();

      try {
        await dataService.deleteDocument("favorites", id);
        toast.success("Workout removed successfully.");

        // 🔥 ACTUALIZAR REDUX
        dispatch(removeFavorite(id));
      } catch {
        setSaveError("Error removing the workout. Please try again later.");
        toast.error("Failed to remove workout.");
      } finally {
        setIsSaving(false);
      }
    },
    [dispatch]
  );

  return { isSaving, saveError, saveTraining, deleteTraining };
};

export default useSaveTraining;
