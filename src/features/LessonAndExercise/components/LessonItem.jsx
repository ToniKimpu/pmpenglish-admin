import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner2";
import { useDeleteLesson } from "../hooks/usePatternLesson";

const LessonItem = ({ lesson, dayId }) => {
  const navigate = useNavigate();

  const { mutate: deleteLesson, isLoading: isDeletingLesson } =
    useDeleteLesson(dayId);

  const handleDeleteLesson = (event) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      deleteLesson(lesson.id);
    }
  };

  return (
    <div
      className="flex gap-2 items-center px-2 py-2 cursor-pointer hover:bg-green-50"
      onClick={() => {
        navigate(`/lesson-detail/${lesson.id}`);
      }}
    >
      <div className="w-2 h-2 bg-red-500 rounded-lg"></div>
      <p>{lesson.lesson_name}</p>
      <button
        className="ml-auto flex items-center justify-center gap-2 w-16 h-9 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Edit
      </button>
      <button
        className="flex items-center justify-center gap-2 w-16 h-9 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        type="button"
        onClick={(e) => handleDeleteLesson(e)}
        disabled={isDeletingLesson}
      >
        {!isDeletingLesson && "Delete"}
        {isDeletingLesson && <ButtonSpinner />}
      </button>
      {/* <EditDialog /> */}
    </div>
  );
};

export default LessonItem;
