/* eslint-disable prettier/prettier */
export const training_type = ["Crossfit", "Hyrox", "Endurance"];
export const max_duration = [
  "60 minutes",
  "75 minutes",
  "80 minutes",
  "90 minutes",
];

export const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const MONTH_SELECT = [
  { name: "All", value: null },
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
];

export const colorMap: { [key: string]: string } = {
  Crossfit: "#76d7c4",
  Hyrox: "#17C964",
  Endurance: "#1e8449",
};

// constants.ts
export const monthsWithTraining = new Set([0, 1, 3, 5]); // Ejemplo de meses con entrenamiento (Enero, Febrero, Abril, Junio)
