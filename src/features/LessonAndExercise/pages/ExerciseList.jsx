import { useLocation } from "react-router-dom";
import Container from "../../../components/Container";
import CreatePatternExerciseDialog from "../components/dialogs/CreatePatternExerciseDialog";
import PatternExerciseItem from "../components/PatternExerciseItem";
import { usePatternExercises } from "../hooks/usePatternExercise";
import ButtonSpinner2 from "@/components/ButtonSpinner2";

const ExerciseList = () => {
  const { state } = useLocation();
  const { exercise } = state || {};

  const { data: patternExercises, isLoading } = usePatternExercises(
    exercise.id
  );
  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <section>
      <Container className={`flex flex-col gap-4`}>
        <div className="mt-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{exercise.exercise_name}</h1>
          <CreatePatternExerciseDialog exercise={exercise} />
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mt-4">
          {patternExercises.map((patternExercise) => (
            <PatternExerciseItem
              key={patternExercise.id}
              patternExercise={patternExercise}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExerciseList;
