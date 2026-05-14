'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { OptionLetter } from '@/lib/questions';

export type Answers = Record<string, OptionLetter>;

interface AssessmentState {
  answers: Answers;
  currentSection: 1 | 2 | 3 | 4;
  leadId: string | null;
  leadName: string | null;
  setAnswer: (questionId: string, letter: OptionLetter) => void;
  setCurrentSection: (section: 1 | 2 | 3 | 4) => void;
  setLeadId: (id: string | null) => void;
  setLeadName: (name: string | null) => void;
  reset: () => void;
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      answers: {},
      currentSection: 1,
      leadId: null,
      leadName: null,
      setAnswer: (questionId, letter) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: letter },
        })),
      setCurrentSection: (section) => set({ currentSection: section }),
      setLeadId: (id) => set({ leadId: id }),
      setLeadName: (name) => set({ leadName: name }),
      reset: () => set({ answers: {}, currentSection: 1, leadId: null, leadName: null }),
    }),
    {
      name: 'agentic-mindshift-assessment',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : (undefined as unknown as Storage),
      ),
    },
  ),
);
