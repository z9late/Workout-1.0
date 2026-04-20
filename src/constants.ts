import { WorkoutProgram, DayType } from './types';

export const DAYS: DayType[] = ['Upper A', 'Lower A', 'Upper B', 'Lower B'];

export const PROGRAM: WorkoutProgram = {
  'Upper A': [
    { name: 'Push-ups (standard)', sets: 3, reps: '8-10', tempo: '3-0-1-0', rpe: '7-8', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800' },
    { name: 'Pike Push-ups', sets: 3, reps: '6-8', tempo: '2-0-1-0', rpe: '7-8', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800' },
    { name: 'Dips', sets: 3, reps: '4-6', tempo: '2-0-1-0', rpe: '7-8', image: 'https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?auto=format&fit=crop&q=80&w=800' },
    { name: 'DB Lateral Raise', sets: 3, reps: '12-15', tempo: '2-0-1-1', rpe: '7', image: 'https://images.unsplash.com/photo-1541534741688-6078c64b52d3?auto=format&fit=crop&q=80&w=800' },
    { name: 'DB Tricep Extension', sets: 3, reps: '10-12', tempo: '3-0-1-0', rpe: '7', image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=800' },
    { name: 'Plank', sets: 3, reps: '30-45s', tempo: '—', rpe: '7-8', image: 'https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&q=80&w=800' }
  ],
  'Lower A': [
    { name: 'Bodyweight Squat', sets: 3, reps: '15-20', tempo: '3-0-1-0', rpe: '7', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800' },
    { name: 'Single Leg RDL', sets: 3, reps: '8-10/leg', tempo: '3-0-1-0', rpe: '7-8', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&q=80&w=800' },
    { name: 'Bulgarian Split Squat', sets: 3, reps: '8-10/leg', tempo: '2-0-1-0', rpe: '7-8', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800' },
    { name: 'Nordic Curl (eccentric)', sets: 3, reps: '3-5', tempo: '5-0-X-0', rpe: '8', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' },
    { name: 'Single Leg Calf Raise', sets: 3, reps: '12-15/leg', tempo: '2-1-1-1', rpe: '7', image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=800' }
  ],
  'Upper B': [
    { name: 'Pull-ups', sets: 4, reps: '3-5', tempo: '2-0-1-0', rpe: '7-8', image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&q=80&w=800' },
    { name: 'Chin-ups', sets: 3, reps: '4-6', tempo: '2-0-1-0', rpe: '7-8', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&q=80&w=800' },
    { name: 'Inverted Rows', sets: 3, reps: '8-12', tempo: '2-0-1-0', rpe: '7-8', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800' },
    { name: 'DB Hammer Curl', sets: 3, reps: '10-12', tempo: '2-0-1-1', rpe: '7', image: 'https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?auto=format&fit=crop&q=80&w=800' },
    { name: 'DB Curl', sets: 3, reps: '10-12', tempo: '2-0-1-1', rpe: '7', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800' },
    { name: 'Hollow Body Hold', sets: 3, reps: '20-30s', tempo: '—', rpe: '7-8', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' }
  ],
  'Lower B': [
    { name: 'Jump Squat', sets: 3, reps: '8-10', tempo: 'explosive', rpe: '7-8', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800' },
    { name: 'Walking Lunges', sets: 3, reps: '10-12/leg', tempo: '2-0-1-0', rpe: '7-8', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' },
    { name: 'Single Leg Glute Bridge', sets: 3, reps: '10-12/leg', tempo: '2-1-1-0', rpe: '7-8', image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=800' },
    { name: 'Sissy Squat (assisted)', sets: 3, reps: '6-8', tempo: '3-0-1-0', rpe: '7-8', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800' },
    { name: 'Standing Calf Raise (BW)', sets: 3, reps: '15-20', tempo: '2-1-1-1', rpe: '7', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800' }
  ]
};

export const COLOR_VARIANTS: Record<string, { bg: string; text: string; light: string }> = {
  'Upper A': { bg: 'bg-[#D4AF37]', text: 'accent-text', light: 'bg-white/5' },
  'Lower A': { bg: 'bg-zinc-400', text: 'text-zinc-400', light: 'bg-white/5' },
  'Upper B': { bg: 'bg-zinc-500', text: 'text-zinc-500', light: 'bg-white/5' },
  'Lower B': { bg: 'bg-[#B08D57]', text: 'text-[#B08D57]', light: 'bg-white/5' }
};
