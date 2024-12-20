import { useRef, useState } from "react";
import { HiPauseCircle, HiPlayCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDeleteSpokenPattern } from "../hooks/useSpokenPattern";

const PatternItem = ({ pattern }) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { mutate: deleteSpokenPattern, isLoading: isDeleting } =
    useDeleteSpokenPattern();

  const handleDelete = (id) => {
    deleteSpokenPattern({ id: id });
  };
  const handlePlayToggle = () => {
    console.log("audio_url", pattern.audio_path);
    if (isPlaying) {
      audioRef.current.pause(); // Pause the audio
    } else {
      audioRef.current.play(); // Play the audio
    }
    setIsPlaying(!isPlaying); // Toggle play/pause state
  };

  return (
    <div
      key={pattern.id}
      className="flex flex-col gap-2 p-4 bg-appColor rounded-md text-white"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="font-bold">{pattern.pattern}</p>
          <p>{pattern.title}</p>
        </div>
        {pattern.audio_path && (
          <button
            className="hover:bg-blue-400 rounded-full"
            onClick={handlePlayToggle}
          >
            {isPlaying ? (
              <HiPauseCircle className="w-8 h-8 text-white" />
            ) : (
              <HiPlayCircle className="w-8 h-8 text-white" />
            )}
            <audio ref={audioRef} src={pattern.audio_path} />
          </button>
        )}
      </div>
      <div className="flex gap-1 items-center mt-4">
        <button
          onClick={() => {
            navigate(`/spoken-pattern-detail/${pattern.id}`, {
              state: { pattern },
            });
          }}
          type="button"
          className="text-blue-600 bg-white hover:bg-green-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Detail
        </button>
        <button
          type="button"
          className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          disabled={isDeleting}
          onClick={() => handleDelete(pattern.id)}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default PatternItem;
