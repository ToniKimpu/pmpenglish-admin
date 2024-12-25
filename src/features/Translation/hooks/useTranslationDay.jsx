import {
  allTranslationDays,
  createTranslationDay,
  deleteTranslationDay,
  editTranslationDay,
} from "@/services/translation/translation_day";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useAllTranslationDays = (level_id) => {
  return useQuery(
    ["translation-days", level_id],
    () => allTranslationDays(level_id),
    {
      staleTime: 5 * 60 * 1000,
      onError: (error) => {
        console.error("Error fetching translation days:", error);
      },
    }
  );
};

export const useCreateTranslationDay = (level_id) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ level_id, day_name }) => createTranslationDay(level_id, day_name),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["translation-days", level_id]);
      },
      onError: (error) => {
        console.error("Error creating translation day:", error);
      },
    }
  );
};

export const useEditTranslationDay = (level_id) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ level_id, day_name }) => editTranslationDay(level_id, day_name),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["translation-days", level_id]);
      },
      onError: (error) => {
        console.error("Error updating translation day:", error);
      },
    }
  );
};

export const useDeleteTranslationDay = (level_id) => {
  const queryClient = useQueryClient();
  return useMutation(({ id }) => deleteTranslationDay(id), {
    onSuccess: (_) => {
      queryClient.invalidateQueries(["translation-days", level_id]);
    },
    onError: (error) => {
      console.error("Error deleting translation day:", error);
    },
  });
};
