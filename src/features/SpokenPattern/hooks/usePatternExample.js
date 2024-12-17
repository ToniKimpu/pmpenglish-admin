import {
  createPatternExample,
  deletePatternExample,
  editPatternExample,
  patternExamples,
} from "../../../services/patternExample";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const usePatternExamples = (patternId) => {
  const {
    data: examples,
    error,
    isLoading,
  } = useQuery(
    ["pattern-examples", patternId],
    () => patternExamples(patternId),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  return {
    examples,
    error,
    isLoading,
  };
};

export const useCreatePatternExample = (patternId) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ patternId, english_text, burmese_text }) =>
      createPatternExample(patternId, english_text, burmese_text),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["pattern-examples", patternId]);
      },
      onError: (error) => {
        console.error("Error adding lesson:", error);
      },
    }
  );
};

export const useEditPatternExample = (patternId) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, english_text, burmese_text }) =>
      editPatternExample(id, english_text, burmese_text),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["pattern-examples", patternId]);
      },
      onError: (error) => {
        console.error("Error adding lesson:", error);
      },
    }
  );
};

export const useDeletePatternExample = (patternId) => {
  const queryClient = useQueryClient();
  return useMutation(({ id }) => deletePatternExample(id), {
    onSuccess: (_) => {
      queryClient.invalidateQueries(["pattern-examples", patternId]);
    },
    onError: (error) => {
      console.error("Error adding lesson:", error);
    },
  });
};
