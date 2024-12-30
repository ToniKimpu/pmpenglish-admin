import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import {
  useAddTranslationVocabularyRelation,
  useAllTranslationVocabularies,
} from "../../hooks/useTranslation";
import CreateTranslationVocabularyDialog from "./CreateTranslationVocabularyDialog";
import SheetAllPatternVocabularies from "@/components/sheet/SheetAllPatternVocabularies";

const TranslationVocabularyListDialog = ({ translationId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: vocabularies } = useAllTranslationVocabularies(translationId);
  const { mutate: addTranslationVocabularyRelation, isLoading: adding } =
    useAddTranslationVocabularyRelation(translationId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-blue-600 bg-white hover:bg-green-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Vocabulary
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-appColor">Vocabularies</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {vocabularies?.map((vocabulary) => (
            <div key={vocabulary.id} className="flex flex-col">
              <span className="leading-none m-0 font-bold">
                {vocabulary.english_text}
              </span>
              <span className="leading-none m-0">
                {vocabulary.burmese_text}
              </span>
            </div>
          ))}
          <div className="flex flex-row gap-3 mt-3">
            <CreateTranslationVocabularyDialog translationId={translationId} />
            <SheetAllPatternVocabularies
              patternId={translationId}
              addVocabularyRelation={addTranslationVocabularyRelation}
              adding={adding ?? false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TranslationVocabularyListDialog;
