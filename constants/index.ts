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

export const trainingChartColorMap: { [key: string]: string } = {
  Crossfit: "#76d7c4",
  Hyrox: "#3DE25B",
  Endurance: "#0b6e4f",
};

// Exercise types
export const STRENGTH = {
  SNATCH: [
    "snatch",
    "power snatch",
    "squat snatch",
    "hang snatch",
    "hang power snatch",
    "high hang snatch",
    "snatch balance",
    "overhead squat",
    "snatch grip deadlift",
    "snatch pull",
    "snatch high pull",
    "snatch grip press",
  ],
  CLEAN: [
    "clean",
    "power clean",
    "squat clean",
    "clean grip deadlift",
    "clean pull",
    "clean high pull",
    "clean grip press",
    "hang clean",
    "hang power clean",
    "high hang clean",
  ],
  SQUAT: ["back squat", "front squat", "overhead squat"],
  PRESS: [
    "push press",
    "shoulder press",
    "strict press",
    "split jerk",
    "push jerk",
    "jerk balance",
    "jerk dip",
    "jerk drive",
  ],
  CAJ: [
    "clean and jerk",
    "clean & jerk",
    "clean to jerk",
    "clean to push jerk",
    "clean to split jerk",
  ],
  DEADLIFT: ["deadlift", "sumo deadlift", "romanian deadlift", "dead lift"],
};

export const GYMNASTICS = {
  PULL: [
    "pull up",
    "chest to bar",
    "strict pull up",
    "strict pull-up",
    "strict pullup",
    "strict pull-ups",
    "strict chest to bar",
    "strict chest-to-bar",
    "strict chest-to-bars",
    "strict chest to bars",
    "kipping pull up",
    "kipping pull-up",
    "kipping pullup",
    "kipping pull-ups",
    "kipping chest to bar",
    "kipping chest-to-bar",
    "kipping chest-to-bars",
    "kipping chest to bars",
  ],
  MU: ["bar muscle up", "bar muscle-up", "bar muscleup", "bar muscle-ups"],
  RMU: [
    "ring muscle up",
    "ring muscle-up",
    "ring muscleup",
    "ring muscle-ups",
    "strict ring muscle up",
    "strict ring muscle-up",
    "strict ring muscleup",
    "strict ring muscle-ups",
  ],
  CORE: [
    "sit-up",
    "sit up",
    "sit ups",
    "toes to bar",
    "toes to rings",
    "knees to elbow",
  ],
  HANDSTAND: [
    "hand stand hold",
    "hand stand push up",
    "hand stand walk",
    "handstand",
    "handstand walk",
    "strict handstand push up",
    "strict handstand push-up",
    "strict handstand pushup",
    "strict handstand push-ups",
    "handstand push up",
    "handstand push-up",
    "handstand pushup",
    "handstand push-ups",
    "handstand hold",
    "handstand walk",
    "handstand walking",
    "handstand walk",
    "kipping handstand push up",
    "kipping handstand push-up",
    "kipping handstand pushup",
    "kipping handstand push-ups",
    "kipping handstand push ups",
  ],
};
