import { HiArchiveBox } from "react-icons/hi2";
import ButtonSpinner2 from "../../../components/ButtonSpinner2";
import { useDeletePatternVocabulary } from "../hooks/usePatternVocabulary";
import EditPatternVocabularyDialog from "./dialogs/EditPatternVocabularyDialog";

const PatternVocabularyItem = ({ vocabulary, patternId }) => {
  const { mutate: deleteVocabulary, isLoading: deleting } =
    useDeletePatternVocabulary(patternId);

  const handleDelete = (vocabularyId) => {
    deleteVocabulary({ vocabularyId: vocabularyId });
  };

  return (
    <div key={vocabulary.id} className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full bg-appColor"></div>
      <div className="flex flex-col gap-0">
        <p className="font-bold">{vocabulary.english_text}</p>
        <p>{vocabulary.burmese_text}</p>
      </div>
      <EditPatternVocabularyDialog
        patternId={patternId}
        vocabulary={vocabulary}
      />
      <button
        className=" hover:bg-red-50 rounded-full p-2"
        onClick={() => handleDelete(vocabulary.id)}
      >
        {deleting ? (
          <ButtonSpinner2 />
        ) : (
          <HiArchiveBox className="text-appColor" />
        )}
      </button>
    </div>
  );
};

export default PatternVocabularyItem;
