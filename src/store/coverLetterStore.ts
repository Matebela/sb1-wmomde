import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CoverLetter {
  jobTitle: string;
  content: string;
  timestamp: number;
}

interface CoverLetterState {
  coverLetters: CoverLetter[];
  addCoverLetter: (jobTitle: string, content: string) => void;
}

export const useCoverLetterStore = create<CoverLetterState>()(
  persist(
    (set) => ({
      coverLetters: [],
      addCoverLetter: (jobTitle, content) =>
        set((state) => ({
          coverLetters: [
            {
              jobTitle,
              content,
              timestamp: Date.now(),
            },
            ...state.coverLetters,
          ].slice(0, 10), // Keep only the last 10 cover letters
        })),
    }),
    {
      name: 'cover-letters-storage',
    }
  )
);