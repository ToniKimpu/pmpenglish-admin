import Container from "../../../components/Container";

import { useNavigate } from "react-router-dom";
import ButtonSpinner2 from "../../../components/ButtonSpinner2";
import {
  useAllTranslationLevels,
  useCreateTranslationLevel,
} from "../hooks/useTranslationLevel";
import { useForm } from "react-hook-form";
import { create } from "zustand";

const TranslationLevelItem = ({ title, onClick, className }) => (
  <div
    role="button"
    aria-label={title}
    onClick={onClick}
    className={`flex cursor-pointer items-center justify-center px-6 py-8 border rounded-md bg-[#0496C7] text-white hover:bg-[#0496c7e2] font-bold ${className}`}
  >
    {title}
  </div>
);

const TranslationLevels = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const {
    data: translationLevels,
    isLoading,
    error,
  } = useAllTranslationLevels();
  const { mutate: createTranslationLevel, isLoading: creating } =
    useCreateTranslationLevel();

  const handleCreateLevel = (data) => {
    createTranslationLevel(
      { level_name: data.level_name },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  if (isLoading) return <p>Loading levels...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <Container className={"flex flex-col gap-4 px-6 md:px-0"}>
        <h1 className="text-2xl font-bold mt-6">Pattern Day List</h1>
        <form
          className="flex justify-end gap-4"
          onSubmit={handleSubmit(handleCreateLevel)}
        >
          <input
            type="text"
            className="bg-gray-50 border min-w-52 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Level Name..."
            {...register("level_name")}
          />
          <button
            className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
            disabled={creating} // Disable button while adding
          >
            Create New Level
            {creating && <ButtonSpinner2 />}
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
          {translationLevels?.map((translationLevel) => (
            <TranslationLevelItem
              key={translationLevel.id}
              title={translationLevel.level_name}
              onClick={() => {
                navigate(`/translation-days/${translationLevel.id}`);
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TranslationLevels;
