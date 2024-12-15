import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addLesson,
  deleteLesson,
  lessonDetail,
  lessonList,
} from "../../../services/patternLesson";

// Fetch lessons for a specific day
export const useLessons = (dayId) => {
  return useQuery(["lessons", dayId], () => lessonList(dayId), {
    enabled: !!dayId,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching lessons:", error);
    },
  });
};

// Fetch lesson details
export const useLessonDetails = (lessonId) => {
  return useQuery(["lesson-details", lessonId], () => lessonDetail(lessonId), {
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching lesson details:", error);
    },
  });
};

// Add a new lesson
export const useAddLesson = (dayId) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ lesson_name, day_id }) => addLesson(lesson_name, day_id),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["lessons", dayId]);
      },

      onError: (error) => {
        console.error("Error adding lesson:", error);
      },
    }
  );
};

// Delete a lesson
export const useDeleteLesson = (dayId) => {
  const queryClient = useQueryClient();
  return useMutation((lesson_id) => deleteLesson(lesson_id), {
    onSuccess: (_) => {
      queryClient.invalidateQueries(["lessons", dayId]);
    },
    onError: (error) => {
      console.error("Error deleting lesson:", error);
    },
  });
};
