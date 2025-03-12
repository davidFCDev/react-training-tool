import { useState } from "react";

const useModals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  const openModal = (type: "delete" | "details" | "edit" | "name") => {
    if (type === "delete") setIsModalOpen(true);
    if (type === "details") setIsTrainingModalOpen(true);
    if (type === "edit") setIsEditModalOpen(true);
    if (type === "name") setIsNameModalOpen(true);
  };

  const closeModal = (type: "delete" | "details" | "edit" | "name") => {
    if (type === "delete") setIsModalOpen(false);
    if (type === "details") setIsTrainingModalOpen(false);
    if (type === "edit") setIsEditModalOpen(false);
    if (type === "name") setIsNameModalOpen(false);
  };

  return {
    isModalOpen,
    isTrainingModalOpen,
    isEditModalOpen,
    isNameModalOpen,
    openModal,
    closeModal,
  };
};

export default useModals;
