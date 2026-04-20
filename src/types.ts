export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  tempo: string;
  rpe: string;
  image?: string;
}

export interface WorkoutProgram {
  [key: string]: Exercise[];
}

export interface SessionLog {
  week: number;
  workout: string;
  date: string;
  exercises: {
    [exerciseName: string]: {
      reps: string;
      rpe: string;
    };
  };
  notes: string;
}

export type DayType = 'Upper A' | 'Lower A' | 'Upper B' | 'Lower B';
