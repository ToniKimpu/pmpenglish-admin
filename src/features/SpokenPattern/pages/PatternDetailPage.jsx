import { HiPlayCircle } from "react-icons/hi2";
import { useLocation } from "react-router-dom";
import Container from "../../../components/Container";
import PatternVocabularyList from "../components/PatternVocabularyList";
import PatternExampleList from "../components/PatternExampleList";

const PatternDetailPage = () => {
  const { state } = useLocation();
  const { pattern } = state || {};
  return (
    <section>
      <Container className={"h-screen flex flex-col gap-4 mb-8"}>
        <h1
          id="dashboard-title"
          className="text-2xl font-bold text-appColor mt-6"
        >
          Pattern Detail
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-start">
            <p className="font-bold text-black">{pattern.pattern}</p>
            <p>{pattern.title}</p>
          </div>
          <button className="hover:bg-red-50 rounded-full p-1">
            <HiPlayCircle className="w-8 h-8 text-blue-600" />
          </button>
        </div>
        <p>{pattern.description}</p>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PatternVocabularyList patternId={pattern.id} />
          <PatternExampleList patternId={pattern.id} />
        </div>
      </Container>
    </section>
  );
};

export default PatternDetailPage;
