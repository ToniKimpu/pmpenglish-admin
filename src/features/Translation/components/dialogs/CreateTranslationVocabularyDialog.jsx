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
  useCreateTranslationVocabulary,
} from "../../hooks/useTranslation";
import { useForm } from "react-hook-form";
import ButtonSpinner2 from "@/components/ButtonSpinner2";

const CreateTranslationVocabularyDialog = ({ translationId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, register } = useForm();
  const { data: vocabularies } = useAllTranslationVocabularies(translationId);
  const { mutate: createTranslationVocabulary, isLoading: creating } =
    useCreateTranslationVocabulary(translationId);

  const onSubmit = (data) => {
    createTranslationVocabulary(
      {
        english: data.english_text,
        burmese: data.burmese_text,
      },
      {
        onSuccess: () => setIsOpen(false),
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create New Vocabulary
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-appColor">Vocabularies</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-start gap-3">
            <div>
              <label
                htmlFor="exercise_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                English
              </label>
              <input
                {...register("english_text")}
                type="text"
                id="english_text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="English..."
                required
              />
            </div>
            <div>
              <label
                htmlFor="burmese_text"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Burmese
              </label>
              <input
                {...register("burmese_text")}
                type="text"
                id="burmese_text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Burmese..."
              />
            </div>

            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="flex gap-1 text-white bg-appColor hover:bg-appHoverColor focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                disabled={creating}
              >
                {creating ? "Creating..." : "Create"}
                {creating && <ButtonSpinner2 />}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTranslationVocabularyDialog;
