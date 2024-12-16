import { HiPlayCircle } from "react-icons/hi2";
import { useLocation } from "react-router-dom";
import Container from "../../../components/Container";
import PatternVocabularyList from "../components/PatternVocabularyList";

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
          <div className="flex flex-col gap-2 p-4 border rounded-md border-gray-300">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Vocabulary</h3>
              <button
                type="button"
                className="text-white bg-appColor hover:bg-appHoverColor focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Create New Vocabulary
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-appColor"></div>
              <div className="flex flex-col">
                <p className="font-bold">I used to be a very clever boy.</p>
                <p>
                  ကျွန်တော်အရင်က အရမ်းသွက်လက်တဲ့ ကောင်းလေးတစ်ယောက်ဖြစ်ခဲ့ပါတယ်။
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PatternDetailPage;
