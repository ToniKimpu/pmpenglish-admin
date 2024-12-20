import { useNavigate } from "react-router-dom";
import ButtonSpinner2 from "../../../components/ButtonSpinner2";
import { useDeleteExercise } from "../hooks/useExercise";

const ExerciseItem = ({ exercise, dayId }) => {
  const navigate = useNavigate();

  const { mutate: deleteExercise, isLoading: isDeleteingExercise } =
    useDeleteExercise(dayId);

  const handleDeleteExercise = (event) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      deleteExercise({ id: exercise.id });
    }
  };

  return (
    <div
      className="flex gap-2 items-center px-2 py-2 cursor-pointer hover:bg-green-50"
      onClick={() => {
        navigate(`/exercise_list/${exercise.id}`, {
          state: { exercise: exercise },
        });
      }}
    >
      <div className="w-2 h-2 bg-red-500 rounded-lg"></div>
      <p>{exercise.exercise_name}</p>
      <button
        className="ml-auto flex items-center justify-center gap-2 w-16 h-9 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Edit
      </button>
      <button
        className="flex items-center justify-center gap-2 w-16 h-9 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        type="button"
        onClick={(e) => handleDeleteExercise(e)}
        disabled={isDeleteingExercise}
      >
        {!isDeleteingExercise && "Delete"}
        {isDeleteingExercise && <ButtonSpinner2 />}
      </button>
      {/* <EditDialog /> */}
    </div>
  );
};

export default ExerciseItem;
