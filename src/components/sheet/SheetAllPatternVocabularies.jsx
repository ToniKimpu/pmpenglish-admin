import { useAllPatternVocabularies } from "@/features/SpokenPattern/hooks/usePatternVocabulary";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { debounce } from "lodash";
import { useState } from "react";
import usePatternVocabularyStore from "@/stores/usePatternVocabularyStore";

const SheetAllPatternVocabularies = () => {
  const [keyword, setKeyword] = useState("");
  const { allVocabularies, isLoading, error } =
    useAllPatternVocabularies(keyword);
  const { vocabularies, addVocabulary, removeVocabulary } =
    usePatternVocabularyStore();

  console.log("vocabularies", vocabularies);

  const handleSearch = debounce((e) => {
    setKeyword(e.target.value);
  }, 500);
  return (
    <Sheet side={"left"}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="mt-3 text-white bg-appColor hover:bg-appHoverColor focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add new Vocabulary
        </button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>All Vocabularies</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <input
            type="text"
            id=""
            className="p-2.5 bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search...."
            onChange={handleSearch}
          />

          <div className="flex-grow overflow-y-scroll mt-3 space-y-3">
            {allVocabularies?.map((vocabulary, index) => {
              const isChecked = vocabularies.find(
                (v) => v.id === vocabulary.id
              );
              return (
                <div
                  key={index}
                  className="border-b pb-2 flex justify-between items-center cursor-pointer"
                  onClick={() => {
                    isChecked
                      ? removeVocabulary(vocabulary.id)
                      : addVocabulary(vocabulary); // Toggle add/remove on click
                  }}
                >
                  <div className="flex flex-col">
                    <p className="font-bold">{vocabulary.english_text}</p>
                    <p>{vocabulary.burmese_text}</p>
                  </div>
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    checked={isChecked || false}
                    readOnly
                    className="w-4 h-4 me-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              );
            })}
          </div>

          <button className="mt-3 mb-6 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetAllPatternVocabularies;
