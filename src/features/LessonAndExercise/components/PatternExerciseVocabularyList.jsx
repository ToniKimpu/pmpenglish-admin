import { usePatternExerciseVocabularies } from "../hooks/usePatternExercise";

const PatternExerciseVocabularyList = ({ exerciseId }) => {
  const { data: vocabularies, isLoading } =
    usePatternExerciseVocabularies(exerciseId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {vocabularies?.map((patternVocabulary) => (
        <div key={patternVocabulary.id} className="flex flex-col">
          <span className="leading-none m-0 font-bold">
            {patternVocabulary.english_text}
          </span>
          <span className="leading-none m-0">
            {patternVocabulary.burmese_text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PatternExerciseVocabularyList;
