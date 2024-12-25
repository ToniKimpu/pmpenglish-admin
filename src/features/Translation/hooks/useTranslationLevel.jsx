import {
  allTranslationLevels,
  createTranslationLevel,
  deleteTranslationLevel,
  editTranslationLevel,
} from "@/services/translation/translation_level";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useAllTranslationLevels = () => {
  return useQuery(["translation-levels"], () => allTranslationLevels(), {
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching translation levels:", error);
    },
  });
};

export const useCreateTranslationLevel = () => {
  const queryClient = useQueryClient();
  return useMutation(({ level_name }) => createTranslationLevel(level_name), {
    onSuccess: (_) => {
      queryClient.invalidateQueries(["translation-levels"]);
    },
    onError: (error) => {
      console.error("Error creating translation level:", error);
    },
  });
};

export const useEditTranslationLevel = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, level_name }) => editTranslationLevel(id, level_name),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["translation-levels"]);
      },
      onError: (error) => {
        console.error("Error updating translation level:", error);
      },
    }
  );
};

export const useDeleteTranslationLevel = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id }) => deleteTranslationLevel(id), {
    onSuccess: (_) => {
      queryClient.invalidateQueries(["translation-levels"]);
    },
    onError: (error) => {
      console.error("Error deleting translation level:", error);
    },
  });
};
