import SheetAllPatternVocabularies from "@/components/sheet/SheetAllPatternVocabularies";
import {
  useAddPatternVocabularyRelation,
  usePatternVocabularies,
} from "../hooks/usePatternVocabulary";

import CreatePatternVocabularyDialog from "./dialogs/CreatePatternVocabularyDialog";
import PatternVocabularyItem from "./PatternVocabularyItem";

const PatternVocabularyList = ({ patternId }) => {
  const { vocabularies, isLoading, error } = usePatternVocabularies(patternId);

  const { mutate: addPatternVocabularyRelation, isLoading: adding } =
    useAddPatternVocabularyRelation(patternId);

  return (
    <div className="flex flex-col gap-2 p-4 border rounded-md border-gray-300">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Vocabulary</h3>
        <CreatePatternVocabularyDialog patternId={patternId} />
      </div>
      <div className="flex flex-col gap-2 h-96 overflow-auto pe-2">
        {vocabularies?.map((vocabulary) => {
          return (
            <PatternVocabularyItem
              key={vocabulary.id}
              vocabulary={vocabulary}
              patternId={patternId}
            />
          );
        })}
      </div>

      <SheetAllPatternVocabularies
        patternId={patternId}
        addVocabularyRelation={addPatternVocabularyRelation}
        adding={adding ?? false}
      />
    </div>
  );
};

export default PatternVocabularyList;
