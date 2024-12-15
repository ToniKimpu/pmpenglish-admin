import React from "react";
import { HiPlayCircle } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import Container from "../../../components/Container";
import { useLessonDetails } from "../hooks/usePatternLesson";

const LessonDetailPage = () => {
  const { "lesson-id": lessonId } = useParams();
  const { data: lessonDetails, isLoading } = useLessonDetails(lessonId);

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (!lessonDetails?.length) {
    return <div>No data</div>;
  }

  return (
    <section>
      <Container className={"flex flex-col gap-4 px-3 md:px-0 pb-8"}>
        <h1 id="lesson-title" className="text-2xl font-bold mt-6">
          Lesson Detail
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {lessonDetails?.map((pattern) => {
            return (
              <div
                key={pattern.id}
                className="flex flex-col gap-3 border-2 p-4 border-gray-300 rounded-md"
              >
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

                {pattern.pattern_examples?.map((example, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    <p>Examples</p>
                    <div className="flex justify-start items-center gap-3">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                      <div className="flex flex-col justify-start">
                        <p className="font-bold text-black">
                          {example.english_text}
                        </p>
                        <p>{example.burmese_text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default LessonDetailPage;
