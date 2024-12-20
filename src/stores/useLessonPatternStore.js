import { create } from "zustand";

const useLessonPatternStore = create((set) => ({
  patterns: [],
  addPattern: (pattern) => {
    set((state) => ({ patterns: [...state.patterns, pattern] }));
  },
  removePattern: (patternId) => {
    set((state) => ({
      patterns: state.patterns.filter((pattern) => pattern.id !== patternId),
    }));
  },
}));

export default useLessonPatternStore;
