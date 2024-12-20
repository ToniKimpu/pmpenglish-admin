import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner2";
import Container from "../../../components/Container";
import ExerciseItem from "../components/ExerciseItem";
import LessonItem from "../components/LessonItem";
import { useAddExercise, useExercises } from "../hooks/useExercise";
import { useAddLesson, useLessons } from "../hooks/usePatternLesson";

// Reusable AddItemForm Component
const AddItemForm = ({
  label,
  placeholder,
  onClick,
  isLoading,
  value,
  onChange,
}) => (
  <div className="flex justify-between">
    <input
      type="text"
      id="input-group-1"
      value={value} // Bind the input value to the state
      onChange={onChange} // Handle input change
      className="bg-gray-50 border min-w-52 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
    />
    <button
      className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
      onClick={onClick}
      disabled={isLoading}
    >
      {label}
      {isLoading && <ButtonSpinner />}
    </button>
  </div>
);

const LessonAndExerciseList = () => {
  const { "day-id": dayId } = useParams();
  const [lessonName, setLessonName] = useState("");
  const [exerciseName, setExerciseName] = useState("");

  const { data: lessons } = useLessons(dayId);
  const { mutate: addLesson, isLoading: isAddingLesson } = useAddLesson(dayId);

  const { data: exercises } = useExercises(dayId);
  const { mutate: addExercise, isLoading: isAddingExercise } =
    useAddExercise(dayId);

  // Handle adding lesson
  const handleAddLesson = () => {
    if (!lessonName) {
      toast.error("Please enter your lesson name.");
      return;
    }
    try {
      addLesson({ lesson_name: lessonName, day_id: dayId });
      setLessonName(""); // Clear input after submitting
    } catch (err) {
      toast.error(err.message);
      console.error(err); // Log error for debugging
    }
  };

  const handleAddExercise = () => {
    if (!exerciseName) {
      toast.error("Please enter your exercise name.");
      return;
    }
    try {
      addExercise({ exercise_name: exerciseName, day_id: dayId });
      setExerciseName(""); // Clear input after submitting
    } catch (err) {
      toast.error(err.message);
      console.error(err); // Log error for debugging
    }
  };

  return (
    <section>
      <Container className={"flex flex-col gap-4 px-6 lg:px-0"}>
        <h1 id="dashboard-title" className="text-2xl font-bold mt-6">
          Day {dayId}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div className="flex flex-col gap-2 p-4 border rounded-md border-gray-300">
            <AddItemForm
              label="Add New Lesson"
              placeholder="Lesson Name..."
              value={lessonName} // Pass the state value here
              onChange={(e) => setLessonName(e.target.value)} // Pass the state setter here
              onClick={handleAddLesson}
              isLoading={isAddingLesson}
            />
            <p className="font-bold mt-2">Lessons</p>
            {lessons?.map((lesson) => (
              <LessonItem key={lesson.id} lesson={lesson} dayId={dayId} />
            ))}
          </div>

          {/* Exercise Form */}
          <div className="flex flex-col gap-2 p-4 border rounded-md border-gray-300">
            <AddItemForm
              label="Add New Exercise"
              placeholder="Exercise Name..."
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              onClick={handleAddExercise}
              isLoading={isAddingExercise}
            />
            <p className="font-bold mt-2">Exercises</p>
            {exercises?.map((exercise) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                dayId={dayId}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LessonAndExerciseList;
