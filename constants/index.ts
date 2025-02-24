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
