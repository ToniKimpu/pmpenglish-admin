import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  addPatternDay,
  patternDayList,
} from "../../../services/patternDayList";

export const usePatternDayList = (dayId) => {
  const {
    data: days,
    error,
    isLoading,
  } = useQuery(["pattern-days", dayId], patternDayList, {
    staleTime: 1000 * 60 * 5,
  });

  return {
    days,
    error,
    isLoading,
  };
};
export const useAddPatternDay = () => {
  const queryClient = useQueryClient();

  const addDayMutation = useMutation(addPatternDay, {
    onSuccess: () => {
      queryClient.invalidateQueries("pattern-days");
    },
    onError: (error) => {
      console.error("Failed to add pattern day:", error.message);
    },
  });

  return {
    addPatternDay: addDayMutation.mutateAsync,
    adding: addDayMutation.isLoading, // Expose the mutateAsync function
  };
};
