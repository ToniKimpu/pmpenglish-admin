import {
  allExercises,
  createExercise,
  deleteExercise,
  editExercise,
} from "@/services/exercise";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useExercises = (dayId) => {
  return useQuery(["exercises", dayId], () => allExercises(dayId), {
    enabled: !!dayId,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching lessons:", error);
    },
  });
};

export const useAddExercise = (dayId) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ exercise_name, day_id }) => createExercise(exercise_name, day_id),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["exercises", dayId]);
      },

      onError: (error) => {
        console.error("Error adding lesson:", error);
      },
    }
  );
};

export const useEditExercise = (dayId) => {
  const queryClient = useQueryClient();
  return useMutation(({ id, exerciseName }) => editExercise(id, exerciseName), {
    onSuccess: (_) => {
      queryClient.invalidateQueries(["exercises", dayId]);
    },

    onError: (error) => {
      console.error("Error adding lesson:", error);
    },
  });
};

export const useDeleteExercise = (dayId) => {
  const queryClient = useQueryClient();
  return useMutation(({ id }) => deleteExercise(id), {
    onSuccess: (_) => {
      queryClient.invalidateQueries(["exercises", dayId]);
    },

    onError: (error) => {
      console.error("Error adding lesson:", error);
    },
  });
};
