import SheetAllPatternVocabularies from "@/components/sheet/SheetAllPatternVocabularies";
import { HiPlayCircle } from "react-icons/hi2";
import { useAddPatternExerciseVocabularyRelation } from "../hooks/usePatternExercise";
import CreatePatternExerciseVocabularyDialog from "./dialogs/CreatePatternExerciseVocabularyDialog";
import PatternExerciseVocabularyList from "./PatternExerciseVocabularyList";

const PatternExerciseItem = ({ patternExercise }) => {
  const { mutate: addPatternExerciseVocabularyRelation, isLoading } =
    useAddPatternExerciseVocabularyRelation(patternExercise.id);

  return (
    <div className="flex flex-col gap-4 p-4 bg-appColor rounded-md text-white">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="font-bold leading-none">
            {patternExercise.english_text}
          </p>
          <p className="leading-none">{patternExercise.burmese_text}</p>
        </div>
        <button
          className="hover:bg-blue-400 rounded-full"
          // onClick={handlePlayToggle}
        >
          <HiPlayCircle className="w-8 h-8 text-white" />
        </button>
      </div>
      <PatternExerciseVocabularyList exerciseId={patternExercise.id} />
      <div className="flex justify-start gap-3">
        <CreatePatternExerciseVocabularyDialog
          patternExerciseId={patternExercise.id}
        />
        <SheetAllPatternVocabularies
          patternId={patternExercise.id}
          addVocabularyRelation={addPatternExerciseVocabularyRelation}
          adding={isLoading ?? false}
        />
      </div>
    </div>
  );
};

export default PatternExerciseItem;
