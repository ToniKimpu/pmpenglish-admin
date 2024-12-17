import { HiTrash } from "react-icons/hi2";
import ButtonSpinner2 from "../../../components/ButtonSpinner2";
import { useDeletePatternVocabulary } from "../hooks/usePatternVocabulary";
import EditPatternVocabularyDialog from "./dialogs/EditPatternVocabularyDialog";
import { useDeletePatternExample } from "../hooks/usePatternExample";
import EditPatternExampleDialog from "./dialogs/EditPatternExampleDialog";

const PatternExampleItem = ({ example, patternId }) => {
  const { mutate: deleteExample, isLoading: deleting } =
    useDeletePatternExample(patternId);

  const handleDelete = (exampleId) => {
    deleteExample({ id: exampleId });
  };

  return (
    <div key={example.id} className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full bg-appColor"></div>
      <div className="flex flex-col gap-0">
        <p className="font-bold">{example.english_text}</p>
        <p>{example.burmese_text}</p>
      </div>
      <EditPatternExampleDialog patternId={patternId} example={example} />
      <button
        className=" hover:bg-red-50 rounded-full p-2"
        onClick={() => handleDelete(example.id)}
      >
        {deleting ? <ButtonSpinner2 /> : <HiTrash className="text-appColor" />}
      </button>
    </div>
  );
};

export default PatternExampleItem;
