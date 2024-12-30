import ButtonSpinner2 from "@/components/ButtonSpinner2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { useCreateTranslation } from "../../hooks/useTranslation";

const CreateTranslationDialog = ({ translationDayId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, register } = useForm();
  const { mutate: createTranslationVocabulary, isLoading: creating } =
    useCreateTranslation(translationDayId);

  const onSubmit = (data) => {
    createTranslationVocabulary(
      {
        englishText: data.english_text,
        burmeseText: data.burmese_text,
        words: data.words,
        dayId: translationDayId,
        audioPath: data.audio_path?.[0],
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
          Create New Translation
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
                className="bg-gray-50 border border-gray-300 leading-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Burmese..."
              />
            </div>
            <div>
              <label
                htmlFor="burmese_text"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Word
              </label>
              <input
                {...register("word")}
                type="text"
                id="word"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Word..."
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="audio_path"
              >
                Audio
              </label>
              <input
                {...register("audio_path")}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="audio_path"
                type="file"
                accept="audio/*"
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

export default CreateTranslationDialog;
