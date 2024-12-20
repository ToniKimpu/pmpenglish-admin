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

import ButtonSpinner2 from "@/components/ButtonSpinner2";
import { useCreatePatternExercise } from "../../hooks/usePatternExercise";

const CreatePatternExerciseDialog = ({ exercise }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit } = useForm();
  const { mutate: createPatternExercise, isLoading: creating } =
    useCreatePatternExercise(exercise.id);

  const onSubmit = async (data) => {
    createPatternExercise(
      {
        english_text: data.english,
        burmese_text: data.burmese,
        exercise_id: exercise.id,
        audio: data.audio?.[0],
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
          Create New Exercise
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-appColor">
            Create New Pattern
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-start gap-3">
            <div>
              <label
                htmlFor="english"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pattern
              </label>
              <input
                {...register("english")}
                type="text"
                id="english"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="English..."
                required
                onInput={validateEnglishText}
              />
            </div>
            <div>
              <label
                htmlFor="burmese"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Burmese
              </label>
              <input
                {...register("burmese")}
                type="text"
                id="burmese"
                className="p-2.5 bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Burmese..."
              />
            </div>

            <div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="audio"
                >
                  Audio
                </label>
                <input
                  {...register("audio")}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="audio"
                  type="file"
                  accept="audio/*"
                />
              </div>
            </div>

            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="flex gap-1 text-white bg-appColor hover:bg-appHoverColor focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                disabled={creating}
              >
                Create
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

export default CreatePatternExerciseDialog;
