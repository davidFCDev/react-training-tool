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
}

export interface TrainingProps {
  fetchedWod: TrainingData;
  setFetchedWod: (wod: TrainingData | null) => void;
  isNotFavorite?: boolean;
  id: string;
}

export interface TrainingData {
  warmup?: string;
  strength?: string;
  metcon?: string;
  accessory?: string;
  type?: string;
  time?: string;
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
  fetchedWod: Record<string, any>;
  showChangeButton?: boolean;
  onChangeTraining?: () => void;
  onDeleteTraining?: () => void;
  onEditTraining: (training: Record<string, any>) => void;
}

export interface AddTrainingModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (arg0: boolean) => void;
  loading: boolean;
  filteredTrainingList: any[];
  handleTrainingSelect: (arg0: string) => void;
}

export interface TrainingScheduleItem {
  id: string;
  date: string;
  training: any;
}
