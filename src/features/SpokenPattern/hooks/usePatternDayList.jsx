import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  addPatternDay,
  patternDayList,
} from "../../../services/patternDayList";

export const usePatternDayList = () => {
  const queryClient = useQueryClient();

  const {
    data: days,
    error,
    isLoading,
  } = useQuery("pattern-days", patternDayList, {
    staleTime: 1000 * 60 * 5,
  });

  const addDayMutation = useMutation(addPatternDay, {
    onSuccess: () => {
      queryClient.invalidateQueries("pattern-days");
    },
    onError: (error) => {
      console.error("Failed to add pattern day:", error.message);
    },
  });

  return {
    days,
    error,
    isLoading,
    addPatternDay: addDayMutation.mutateAsync, // Expose the mutateAsync function
  };
};
