import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addLesson,
  deleteLesson,
  lessonDetail,
  lessonList,
} from "../../../services/patternLesson";

// Fetch lessons for a specific day
export const useLessons = (dayId) => {
  return useQuery(["lessons"], () => lessonList(dayId), {
    enabled: !!dayId,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching lessons:", error);
    },
  });
};

// Fetch lesson details
export const useLessonDetails = (lessonId) => {
  return useQuery(["lesson-details"], () => lessonDetail(lessonId), {
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching lesson details:", error);
    },
  });
};

// Add a new lesson
export const useAddLesson = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ lesson_name, day_id }) => addLesson(lesson_name, day_id),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries(["lessons"]);
      },
      onError: (error) => {
        console.error("Error adding lesson:", error);
      },
    }
  );
};

// Delete a lesson
export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation((lesson_id) => deleteLesson(lesson_id), {
    onSuccess: (_) => {
      queryClient.invalidateQueries(["lessons"]);
    },
    onError: (error) => {
      console.error("Error deleting lesson:", error);
    },
  });
};
