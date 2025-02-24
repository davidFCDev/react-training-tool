/* eslint-disable no-console */
"use client";

import { AddTrainingModal } from "@/components/AddTrainingModal";
import Calendar from "@/components/Calendar";
import DaysOfWeek from "@/components/DaysOfWeek";
import DetailsModal from "@/components/DetailsModal";
import MonthSelector from "@/components/MonthSelector";
import YearSelector from "@/components/YearSelector";
import withAuth from "@/hoc/withAuth";
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
    <div className="w-full min-w-80 flex flex-col items-center justify-center p-4">
      <header className="mb-6">
        <h1 className="title">Program</h1>
        <p className="subtitle">Create your own training program</p>
      </header>

      <div className="mb-4 flex gap-4">
        <MonthSelector
          {...{ selectedMonth, setSelectedMonth, monthsWithTraining }}
        />

        <YearSelector {...{ selectedYear, setSelectedYear }} />
      </div>

      <main className="grid grid-cols-7 gap-2 w-full">
        <DaysOfWeek />
        <Calendar
          days={days}
          handleDateClick={handleDateClick}
          trainingSchedule={trainingSchedule}
        />
      </main>

      <AddTrainingModal
        filteredTrainingList={filteredTrainingList}
        handleTrainingSelect={handleTrainingSelect}
        isModalOpen={isAddTrainingModalOpen}
        loading={loading}
        setIsModalOpen={setIsAddTrainingModalOpen}
      />

      <DetailsModal
        fetchedWod={selectedTraining || {}}
        isOpen={isDetailsModalOpen}
        showChangeButton={true}
        onChangeTraining={() => setIsAddTrainingModalOpen(true)}
        onDeleteTraining={onDeleteTraining}
        onOpenChange={setIsDetailsModalOpen}
      />
    </div>
  );
};

export default withAuth(Program);
