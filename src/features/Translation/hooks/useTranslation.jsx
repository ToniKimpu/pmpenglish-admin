import {
  addTranslationVocabularyRelation,
  allTranslations,
  allTranslationVocabularies,
  createTranslation,
  createTranslationVocabulary,
  deleteTranslation,
  editTranslation,
} from "@/services/translation/translation";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useAllTranslations = (dayId) => {
  return useQuery(["translations", dayId], () => allTranslations(dayId), {
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching translation days:", error);
    },
  });
};

export const useCreateTranslation = (dayId) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ englishText, burmeseText, words, dayId, audioPath }) =>
      createTranslation(englishText, burmeseText, words, dayId, audioPath),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["translations", dayId]);
      },
      onError: (error) => {
        console.error("Error creating translation:", error);
      },
    }
  );
};

export const useEditTranslation = (dayId) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, englishText, burmeseText, words, dayId, audioPath }) =>
      editTranslation(id, englishText, burmeseText, words, dayId, audioPath),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["translations", dayId]);
      },
      onError: (error) => {
        console.error("Error updating translation:", error);
      },
    }
  );
};

export const useDeleteTranslation = (dayId) => {
  const queryClient = useQueryClient();
  return useMutation(({ id }) => deleteTranslation(id), {
    onSuccess: (_) => {
      queryClient.invalidateQueries(["translations", dayId]);
    },
    onError: (error) => {
      console.error("Error deleting translation:", error);
    },
  });
};

export const useAllTranslationVocabularies = (translationId) => {
  return useQuery(
    ["translation-vocabularies", translationId],
    () => allTranslationVocabularies(translationId),
    {
      staleTime: 5 * 60 * 1000,
      onError: (error) => {
        console.error("Error fetching translation days:", error);
      },
    }
  );
};

export const useCreateTranslationVocabulary = (translationId) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ english, burmese }) =>
      createTranslationVocabulary(translationId, english, burmese),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries([
          "translation-vocabularies",
          translationId,
        ]);
      },
      onError: (error) => {
        console.error("Error creating translation vocabulary:", error);
      },
    }
  );
};

export const useAddTranslationVocabularyRelation = (translationId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (vocabularyRelations) =>
      addTranslationVocabularyRelation(vocabularyRelations),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries([
          "translation-vocabularies",
          translationId,
        ]);
      },
      onError: (error) => {
        console.error("Error adding lesson:", error);
      },
    }
  );
};
