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
}

export interface TrainingFormProps {
  onSubmit: (trainingType: string, duration: string) => void;
  loading: boolean;
  setFetchedWod: (training: TrainingData | null) => void;
}

export interface ModalTrainingProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
