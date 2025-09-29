import { create } from 'zustand';

type ProgressState = {
  correct: number;
  attempts: number;
  addResult: (isCorrect: boolean) => void;
};

export const useProgress = create<ProgressState>((set) => ({
  correct: 0,
  attempts: 0,
  addResult: (isCorrect) =>
    set((s) => ({
      attempts: s.attempts + 1,
      correct: s.correct + (isCorrect ? 1 : 0),
    })),
}));
