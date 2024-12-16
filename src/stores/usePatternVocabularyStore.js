import { create } from "zustand";

const usePatternVocabularyStore = create((set) => ({
  vocabularies: [],
  addVocabulary: (vocabulary) => {
    set((state) => ({ vocabularies: [...state.vocabularies, vocabulary] }));
  },
  removeVocabulary: (vocabularyId) => {
    set((state) => ({
      vocabularies: state.vocabularies.filter(
        (vocabulary) => vocabulary.id !== vocabularyId
      ),
    }));
  },
}));

export default usePatternVocabularyStore;
