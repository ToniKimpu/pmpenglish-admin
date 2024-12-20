import ButtonSpinner2 from "@/components/ButtonSpinner2";
import { useUnAttachPatternToLesson } from "@/features/SpokenPattern/hooks/useSpokenPattern";
import React from "react";
import { HiOutlineTrash, HiPlayCircle } from "react-icons/hi2";

const LessonPatternItem = ({ pattern }) => {
  const { mutate: unAttachPatternToLesson, isLoading: unAttaching } =
    useUnAttachPatternToLesson();

  const handleUnAttachPattern = (patternId) => {
    if (window.confirm("Are you sure?")) {
      unAttachPatternToLesson(patternId);
    }
  };

  return (
    <div
      key={pattern.id}
      className="flex flex-col gap-3 border-2 p-4 border-gray-300 rounded-md"
    >
      <div className="flex justify-start items-center">
        <div className="flex flex-col justify-start">
          <p className="font-bold text-black">{pattern.pattern}</p>
          <p>{pattern.title}</p>
        </div>
        <button
          className="hover:bg-red-50 rounded-full p-1 ml-auto"
          onClick={() => {
            handleUnAttachPattern(pattern.id);
          }}
          disabled={unAttaching}
        >
          {unAttaching ? (
            <ButtonSpinner2 />
          ) : (
            <HiOutlineTrash className="w-4 h-4 text-red-600" />
          )}
        </button>
        <button className="hover:bg-red-50 rounded-full p-1 me-3">
          <HiPlayCircle className="w-6 h-6 text-blue-600" />
        </button>
      </div>
      <p>{pattern.description}</p>
    </div>
  );
};

export default LessonPatternItem;
