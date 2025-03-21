/* eslint-disable no-console */
import { useMemo, useState } from "react";

import useDateSelector from "@/hooks/useDateSelector";
import { useFavorites } from "@/hooks/useFavorites";
import useTrainingSchedule from "@/hooks/useTrainingSchedule";
import { getDaysInMonth } from "@/utils/dateUtils";

const useProgram = () => {
  const [isAddTrainingModalOpen, setIsAddTrainingModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);

  const {
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    selectedDate,
    setSelectedDate,
    formatDate,
  } = useDateSelector();

  const { filteredTrainingList } = useFavorites();
  const {
    trainingSchedule,
    loading,
    addTraining,
    removeTraining,
    setTrainingSchedule,
  } = useTrainingSchedule();

  const days = useMemo(() => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDayOfMonth =
      (new Date(selectedYear, selectedMonth, 1).getDay() + 6) % 7;
    const totalDays = firstDayOfMonth + daysInMonth;

    return Array.from({ length: totalDays }, (_, i) => {
      const dayIndex = i - firstDayOfMonth + 1;

      return {
        dayIndex,
        isPlaceholder: dayIndex < 1 || dayIndex > daysInMonth,
        isSunday:
          (new Date(selectedYear, selectedMonth, dayIndex).getDay() + 6) % 7 ===
          6,
        date: formatDate(dayIndex),
      };
    });
  }, [selectedMonth, selectedYear, formatDate]);

  const handleDateClick = (dayIndex: number) => {
    if (dayIndex < 1) return;
    const date = formatDate(dayIndex);

    setSelectedDate(date);

    const training = trainingSchedule[date];

    training ? openDetailsModal(training) : openAddTrainingModal();
  };

  const openAddTrainingModal = () => setIsAddTrainingModalOpen(true);

  const openDetailsModal = (training: any) => {
    setSelectedTraining(training.training);
    setIsDetailsModalOpen(true);
  };

  const handleTrainingSelect = async (trainingId: string) => {
    if (!selectedDate) return;

    const selectedTraining = filteredTrainingList.find(
      (t) => t?.id === trainingId
    );

    if (selectedTraining && selectedTraining.training) {
      await addTraining(
        selectedDate,
        selectedTraining.training,
        selectedTraining.id
      );
      closeModals();
    } else {
      console.warn("No valid training found for the selected ID.");
    }
  };

  const onDeleteTraining = async () => {
    if (selectedDate) {
      await removeTraining(selectedDate);
      closeModals();
    }
  };

  const closeModals = () => {
    setIsAddTrainingModalOpen(false);
    setIsDetailsModalOpen(false);
    setSelectedTraining(null);
  };

  const getMonthsWithTraining = (year: number) => {
    const monthsWithTraining = new Set<number>();

    Object.keys(trainingSchedule).forEach((date) => {
      const trainingDate = new Date(date);

      if (trainingDate.getFullYear() === year) {
        monthsWithTraining.add(trainingDate.getMonth());
      }
    });

    return monthsWithTraining;
  };

  const monthsWithTraining = getMonthsWithTraining(selectedYear);

  return {
    selectedMonth,
    selectedYear,
    trainingSchedule,
    loading,
    days,
    isAddTrainingModalOpen,
    isDetailsModalOpen,
    selectedTraining,
    filteredTrainingList,
    monthsWithTraining,
    removeTraining,
    setSelectedMonth,
    setSelectedYear,
    setIsAddTrainingModalOpen,
    setIsDetailsModalOpen,
    setTrainingSchedule,
    handleDateClick,
    handleTrainingSelect,
    onDeleteTraining,
    openAddTrainingModal,
  };
};

export default useProgram;
