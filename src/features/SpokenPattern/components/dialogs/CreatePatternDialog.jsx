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
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateSpokenPattern } from "../../hooks/useSpokenPattern";

const CreatePatternDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit } = useForm();
  const { mutate: createSpokenPattern, isLoading: creating } =
    useCreateSpokenPattern();

  const onSubmit = async (data) => {
    createSpokenPattern(
      {
        pattern: data.pattern,
        title: data.title,
        description: data.description,
        audio_1: data.audio_1?.[0],
        audio_2: data.audio_2?.[0],
        practicable: data.practicable,
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
          Create New Pattern
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
                htmlFor="pattern"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pattern
              </label>
              <input
                {...register("pattern")}
                type="text"
                id="pattern"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Pattern..."
                required
                onInput={validateEnglishText}
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                {...register("title")}
                type="text"
                id="title"
                className="p-2.5 bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title..."
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                {...register("description")}
                type="description"
                id="description"
                className="p-2.5 bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="practicable"
                {...register("practicable")}
                className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="practicable"
                className="text-sm font-medium leading-none"
              >
                Practicable
              </label>
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="audio_1"
              >
                Audio 1
              </label>
              <input
                {...register("audio_1")}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="audio_1"
                type="file"
                accept="audio/*"
              />
            </div>
            <div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="audio_2"
                >
                  Audio 2
                </label>
                <input
                  {...register("audio_2")}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="audio_2"
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

export default CreatePatternDialog;
