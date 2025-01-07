import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";

import { useForm } from "react-hook-form";
import { useAddSpokenPatternAudio } from "../../hooks/useSpokenPattern";
import ButtonSpinner2 from "@/components/ButtonSpinner2";

const AddAudioDialog = ({ patternId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: addAudio, isLoading: adding } =
    useAddSpokenPatternAudio(patternId);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    addAudio(
      {
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
          Add Audio
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-appColor">Add New Audio</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-start gap-3">
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

            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="flex gap-1 text-white bg-appColor hover:bg-appHoverColor focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                disabled={adding}
              >
                Add
                {adding ? "Adding..." : "Add"}
                {adding && <ButtonSpinner2 />}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAudioDialog;
