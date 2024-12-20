import {
  addPatternExerciseVocabularyRelation,
  allPatternExercises,
  createPatternExercise,
  patternExerciseVocabularies,
} from "@/services/patternExercise";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const usePatternExercises = (exerciseId) => {
  return useQuery(
    ["pattern-exercises", exerciseId],
    () => allPatternExercises(exerciseId),
    {
      enabled: !!exerciseId,
      staleTime: 5 * 60 * 1000,
      onError: (error) => {
        console.error("Error fetching lessons:", error);
      },
    }
  );
};

export const usePatternExerciseVocabularies = (exerciseId) => {
  return useQuery(
    ["pattern-exercises-vocabularies", exerciseId],
    () => patternExerciseVocabularies(exerciseId),
    {
      enabled: !!exerciseId,
      staleTime: 5 * 60 * 1000,
      onError: (error) => {
        console.error("Error fetching lessons:", error);
      },
    }
  );
};

export const useCreatePatternExercise = (exerciseId) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ english_text, burmese_text, exercise_id, audio }) =>
      createPatternExercise(english_text, burmese_text, exercise_id, audio),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["pattern-exercises", exerciseId]);
      },

      onError: (error) => {
        console.error("Error adding lesson:", error);
      },
    }
  );
};

export const useAddPatternExerciseVocabularyRelation = (exerciseId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (vocabularyRelations) =>
      addPatternExerciseVocabularyRelation(vocabularyRelations),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries([
          "pattern-exercises-vocabularies",
          exerciseId,
        ]);
      },
      onError: (error) => {
        console.error("Error adding lesson:", error);
      },
    }
  );
};
