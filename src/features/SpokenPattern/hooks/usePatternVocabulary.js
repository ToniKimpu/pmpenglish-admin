import {
  allPatternVocabularies,
  createPatternVocabulary,
  deletePatternVocabulary,
  editPatternVocabulary,
  patternVocabularies,
} from "@/services/patternVocabulary";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useAllPatternVocabularies = () => {
  const {
    data: allVocabularies,
    error,
    isLoading,
  } = useQuery(["all-pattern-vocabulary-list"], () => allPatternVocabularies, {
    staleTime: 1000 * 60 * 5,
  });
  return {
    allVocabularies,
    error,
    isLoading,
  };
};

export const usePatternVocabularies = (patternId) => {
  const {
    data: vocabularies,
    error,
    isLoading,
  } = useQuery(
    ["pattern-vocabulary-list", patternId],
    () => patternVocabularies(patternId),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  return {
    vocabularies,
    error,
    isLoading,
  };
};

export const useCreatePatternVocabulary = (patternId) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ patternId, english_text, burmese_text }) =>
      createPatternVocabulary(patternId, english_text, burmese_text),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["pattern-vocabulary-list", patternId]);
      },
      onError: (error) => {
        console.error("Error adding lesson:", error);
      },
    }
  );
};

export const useEditPatternVocabulary = (patternId) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ vocabularyId, english_text, burmese_text }) =>
      editPatternVocabulary(vocabularyId, english_text, burmese_text),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["pattern-vocabulary-list", patternId]);
      },
      onError: (error) => {
        console.error("Error adding lesson:", error);
      },
    }
  );
};

export const useDeletePatternVocabulary = (patternId) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ vocabularyId }) => deletePatternVocabulary(vocabularyId),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["pattern-vocabulary-list", patternId]);
      },
      onError: (error) => {
        console.error("Error adding lesson:", error);
      },
    }
  );
};
