import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";

import { validateEnglishText } from "@/utils/textValidation";
import { useForm } from "react-hook-form";
import ButtonSpinner from "../../../../components/ButtonSpinner";
import { useCreatePatternVocabulary } from "../../hooks/usePatternVocabulary";

const CreatePatternVocabularyDialog = ({ patternId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    mutate: createPatternVocabulary,
    isLoading: creating,
    isError,
  } = useCreatePatternVocabulary(patternId);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    createPatternVocabulary(
      {
        patternId,
        english_text: data.english_text,
        burmese_text: data.burmese_text,
      },
      { onSuccess: () => setIsOpen(false) }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-white bg-appColor hover:bg-appHoverColor focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create New Vocabulary
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-appColor">
            Create New Vocabulary
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-start gap-3">
            <div>
              <label
                htmlFor="english_text"
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
                onInput={validateEnglishText}
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
                className="p-2.5 bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                {creating && <ButtonSpinner />}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePatternVocabularyDialog;
