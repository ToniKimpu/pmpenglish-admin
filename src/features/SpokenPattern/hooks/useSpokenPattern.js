import {
  allPatternsByLessonId,
  allPatternsWithoutLesson,
  attachPatternToLesson,
  createSpokenPattern,
  deleteSpokenPattern,
  editSpokenPattern,
  patternList,
  unAttachPatternToLesson,
} from "@/services/spokenPattern";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

export const useSpokenPatternsWithoutLesson = () => {
  const {
    data: allPatterns,
    error,
    isLoading,
  } = useQuery(["pattern-list", "without-lesson"], allPatternsWithoutLesson, {
    staleTime: 1000 * 60 * 5,
  });

  return {
    allPatterns,
    error,
    isLoading,
  };
};

export const useAllPatternsByLessonId = (lessonId) => {
  const {
    data: allPatterns,
    error,
    isLoading,
  } = useQuery(["pattern-list"], () => allPatternsByLessonId(lessonId), {
    staleTime: 1000 * 60 * 5,
  });
  return {
    allPatterns,
    error,
    isLoading,
  };
};

export const useCreateSpokenPattern = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ pattern, title, description, audio_1, audio_2 }) =>
      createSpokenPattern(pattern, title, description, audio_1, audio_2),
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

export const useAttachPatternToLesson = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (patternRelations) => attachPatternToLesson(patternRelations),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["pattern-list"]);
      },
      onError: (error) => {
        console.error("Error attach pattern to lesson:", error);
      },
    }
  );
};

export const useUnAttachPatternToLesson = () => {
  const queryClient = useQueryClient();
  return useMutation((patternId) => unAttachPatternToLesson(patternId), {
    onSuccess: (_) => {
      queryClient.invalidateQueries(["pattern-list"]);
    },
    onError: (error) => {
      console.error("Error attach pattern to lesson:", error);
    },
  });
};
