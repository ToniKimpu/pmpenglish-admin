import { HiPlayCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/Container";
import { useSpokenPatterns } from "../hooks/useSpokenPattern";

const SpokenPatternList = () => {
  const navigate = useNavigate();

  const { patterns, isLoading, error } = useSpokenPatterns();

  return (
    <section>
      <Container className={"flex flex-col gap-4 px-6 lg:px-0"}>
        <h1 id="dashboard-title" className="text-2xl font-bold mt-6">
          Spoken Patterns
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {patterns?.map((pattern) => {
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
                  <button className="hover:bg-blue-400 rounded-full">
                    <HiPlayCircle className="w-8 h-8 text-white" />
                  </button>
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
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default SpokenPatternList;
