import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export interface TrainingData {
  warmup?: string;
  strength?: string;
  metcon?: string;
  accessory?: string;
  type?: string;
  time?: string;
  observations?: string;
}

export interface Training {
  id: string;
  training: TrainingData;
  date: string;
  parsedTraining: {
    type: string;
    time: string;
  };
}

export interface TrainingState {
  favoriteList: Training[];
}

export interface TrainingProps {
  fetchedWod: TrainingData;
  setFetchedWod: (wod: TrainingData | null) => void;
  isNotFavorite?: boolean;
  id: string;
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  training: Record<string, any>;
  onSave: (training: Record<string, any>) => void;
}

export interface TrainingFormProps {
  onSubmit: (
    trainingType: string,
    duration: string,
    observations: string
  ) => void;
  loading: boolean;
  setFetchedWod: (training: TrainingData | null) => void;
}

export interface ModalTrainingProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface DetailsModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  fetchedWod: TrainingData;
  showChangeButton?: boolean;
  onChangeTraining?: () => void;
  onDeleteTraining?: () => void;
  onEditTraining: (training: TrainingData) => void;
}

export interface AddTrainingModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  loading: boolean;
  filteredTrainingList: Training[];
  handleTrainingSelect: (trainingId: string) => void;
}

export interface TrainingScheduleItem {
  id: string;
  date: string;
  training: TrainingData;
}
