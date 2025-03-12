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

export interface TrainingState {
  favoriteList: Training[];
}

export interface TrainingProps {
  fetchedWod: TrainingData;
  setFetchedWod: (wod: TrainingData | null) => void;
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
  training?: any;
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
  onOpenChange: (isOpen: boolean) => void;
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

export interface UseEditTrainingProps {
  training: Record<string, any>;
  onSave: (training: Record<string, any>) => void;
  onClose: () => void;
}
