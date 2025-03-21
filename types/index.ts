import { ReactNode, SVGProps } from "react";

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
  name?: string;
}

export interface FullTraining {
  id: string;
  date: string;
  training: TrainingData;
}

export interface Training {
  id: string;
  training: TrainingData;
  date: string;
}

export interface TrainingDay {
  id: string;
  training: TrainingData;
  date: string;
}

export interface TrainingSchedule {
  [date: string]: TrainingDay;
}

export interface TrainingState {
  favoriteList: Training[];
}

export interface TrainingProps {
  mode: "IA" | "manual";
  fetchedWod: TrainingData | FullTraining;
  setFetchedWod: (wod: TrainingData | FullTraining | null) => void;
  isNotFavorite?: boolean;
  id: string;
}

export interface YearSelectorProps {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export interface AuthFormProps {
  title: string;
  subtitle: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errorMessage: string | null;
  linkText: string;
  linkHref: string;
}

export interface BoxDateProps {
  isPlaceholder: boolean;
  isSunday: boolean;
  dayIndex: number;
  training?: TrainingData | FullTraining;
  onClick: () => void;
}

export interface CalendarProps {
  days: any;
  trainingSchedule: any;
  handleDateClick: (dayIndex: number) => void;
}

export interface InfoCardProps {
  title: string;
  content: string;
}

export interface MonthSelectorProps {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  monthsWithTraining: Set<number>;
}

export interface TooltipButtonProps {
  tooltipText: string;
  onClick: () => void;
  disabled?: boolean;
  icon: ReactNode;
  color?: "default" | "danger" | "primary";
  variant?: "light" | "flat" | "solid";
  buttonProps?: any;
}

export interface FilterButtonsProps {
  category: string;
  setCategory: (category: string) => void;
  isSmall?: boolean;
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  training: TrainingData;
  onSave: (training: TrainingData) => void;
}

export interface TrainingFormProps {
  onSubmit: (
    trainingType: string,
    duration: string,
    observations: string
  ) => void;
  loading: boolean;
  setFetchedWod: (training: TrainingData | FullTraining | null) => void;
}

export interface ModalTrainingProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface DetailsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  fetchedWod: TrainingData | FullTraining;
  showChangeButton?: boolean;
  onChangeTraining?: () => void;
  onDeleteTraining?: () => void;
  onEditTraining: (training: TrainingData | FullTraining) => void;
}

export interface AddTrainingModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  loading: boolean;
  filteredTrainingList: Training[];
  handleTrainingSelect: (trainingId: string) => void;
  trainingSchedule: TrainingSchedule;
  removeTraining: (date: string) => Promise<void>;
}

export interface TrainingScheduleItem {
  id: string;
  date: string;
  training: TrainingData;
}

export interface UseEditTrainingProps {
  training: TrainingData | FullTraining;
  onSave: (training: TrainingData | FullTraining) => void;
  onClose: () => void;
}
