import { useState } from "react";

const useModals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openModal = (type: "delete" | "details" | "edit") => {
    if (type === "delete") setIsModalOpen(true);
    if (type === "details") setIsTrainingModalOpen(true);
    if (type === "edit") setIsEditModalOpen(true);
  };

  const closeModal = (type: "delete" | "details" | "edit") => {
    if (type === "delete") setIsModalOpen(false);
    if (type === "details") setIsTrainingModalOpen(false);
    if (type === "edit") setIsEditModalOpen(false);
  };

  return {
    isModalOpen,
    isTrainingModalOpen,
    isEditModalOpen,
    openModal,
    closeModal,
  };
};

export default useModals;
