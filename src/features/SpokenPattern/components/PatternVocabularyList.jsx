import { usePatternVocabularies } from "../hooks/usePatternVocabulary";

import CreatePatternVocabularyDialog from "./dialogs/CreatePatternVocabularyDialog";
import PatternVocabularyItem from "./PatternVocabularyItem";

const PatternVocabularyList = ({ patternId }) => {
  const { vocabularies, isLoading, error } = usePatternVocabularies(patternId);

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
              vocabulary={vocabulary}
              patternId={patternId}
            />
          );
        })}
      </div>

      <button
        type="button"
        className="mt-3 text-white bg-appColor hover:bg-appHoverColor focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Add new Vocabulary
      </button>
    </div>
  );
};

export default PatternVocabularyList;
