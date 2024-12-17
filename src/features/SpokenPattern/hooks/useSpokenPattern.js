import {
  createSpokenPattern,
  deleteSpokenPattern,
  editSpokenPattern,
  patternList,
} from "@/services/spokenPattern";
import { useQuery, useQueryClient } from "react-query";

export const useSpokenPatterns = () => {
  const {
    data: patterns,
    error,
    isLoading,
  } = useQuery(["pattern-list"], patternList, {
    staleTime: 1000 * 60 * 5,
  });

  return {
    patterns,
    error,
    isLoading,
  };
};

export const useCreateSpokenPattern = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ pattern, title, description, audio_path }) =>
      createSpokenPattern(pattern, title, description, audio_path),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["pattern-list"]);
      },
      onError: (error) => {
        console.error("Error creating pattern:", error);
      },
    }
  );
};

export const useEditSpokenPattern = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, pattern, title, description, audio_path }) =>
      editSpokenPattern(id, pattern, title, description, audio_path),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["pattern-list"]);
      },
      onError: (error) => {
        console.error("Error edit pattern:", error);
      },
    }
  );
};

export const useDeleteSpokenPattern = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id }) => deleteSpokenPattern(id), {
    onSuccess: (_) => {
      queryClient.invalidateQueries(["pattern-list"]);
    },
    onError: (error) => {
      console.error("Error delete pattern:", error);
    },
  });
};
