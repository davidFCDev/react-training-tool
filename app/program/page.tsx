/* eslint-disable no-console */
"use client";

import withAuth from "@/components/hoc/withAuth";
import DetailsModal from "@/components/modals/DetailsModal";
import { AddTrainingModal } from "@/components/program/AddTrainingModal";
import Calendar from "@/components/program/Calendar";
import DaysOfWeek from "@/components/program/DaysOfWeek";
import MonthSelector from "@/components/program/MonthSelector";
import YearSelector from "@/components/program/YearSelector";
import useProgram from "@/hooks/useProgram";

const Program: React.FC = () => {
  const {
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    trainingSchedule,
    loading,
    days,
    isAddTrainingModalOpen,
    setIsAddTrainingModalOpen,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    selectedTraining,
    filteredTrainingList,
    handleDateClick,
    handleTrainingSelect,
    onDeleteTraining,
    monthsWithTraining,
  } = useProgram();

  return (
    <div className="w-full min-w-80 flex flex-col items-center justify-center">
      <header className="mb-6 text-center">
        <h1 className="title">
          <span className="text-success">P</span>rogram
        </h1>
        <p className="subtitle">Create your own training program</p>
      </header>

      <div className="mb-4 flex gap-4">
        <MonthSelector
          monthsWithTraining={monthsWithTraining}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />

        <YearSelector
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>

      <main className="grid grid-cols-7 gap-3 w-full">
        <DaysOfWeek />
        <Calendar
          days={days}
          handleDateClick={handleDateClick}
          trainingSchedule={trainingSchedule}
        />
      </main>

      {isAddTrainingModalOpen && (
        <AddTrainingModal
          filteredTrainingList={filteredTrainingList.filter(
            (training) => training.training !== null
          )}
          handleTrainingSelect={handleTrainingSelect}
          isModalOpen={isAddTrainingModalOpen}
          loading={loading}
          setIsModalOpen={setIsAddTrainingModalOpen}
        />
      )}

      {isDetailsModalOpen && (
        <DetailsModal
          showChangeButton
          fetchedWod={selectedTraining ?? {}}
          isOpen={isDetailsModalOpen}
          onChangeTraining={() => setIsAddTrainingModalOpen(true)}
          onDeleteTraining={onDeleteTraining}
          onEditTraining={(training) => console.log("Edit training", training)}
          onOpenChange={setIsDetailsModalOpen}
        />
      )}
    </div>
  );
};

export default withAuth(Program);
