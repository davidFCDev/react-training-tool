import { useState } from "react";

const useModals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);

  const openModal = (type: "delete" | "details") => {
    if (type === "delete") setIsModalOpen(true);
    if (type === "details") setIsTrainingModalOpen(true);
  };

  const closeModal = (type: "delete" | "details") => {
    if (type === "delete") setIsModalOpen(false);
    if (type === "details") setIsTrainingModalOpen(false);
  };

  return {
    isModalOpen,
    isTrainingModalOpen,
    openModal,
    closeModal,
  };
};

export default useModals;
