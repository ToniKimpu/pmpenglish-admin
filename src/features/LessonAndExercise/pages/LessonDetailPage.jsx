import {
  useAllPatternsByLessonId,
  useUnAttachPatternToLesson,
} from "@/features/SpokenPattern/hooks/useSpokenPattern";
import { HiOutlineTrash, HiPlayCircle } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import Container from "../../../components/Container";
import SheetAllPatterns from "../components/SheetAllPatterns";
import ButtonSpinner2 from "@/components/ButtonSpinner2";
import LessonPatternItem from "../components/LessonPatternItem";

const LessonDetailPage = () => {
  const { "lesson-id": lessonId } = useParams();
  const { allPatterns, isLoading } = useAllPatternsByLessonId(lessonId);

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (!allPatterns?.length) {
    return <div>No data</div>;
  }

  return (
    <section>
      <Container className={"flex flex-col gap-4 px-3 md:px-0 pb-8"}>
        <div className="flex justify-between items-center">
          <h1 id="lesson-title" className="text-2xl font-bold mt-6">
            Lesson Detail
          </h1>
          <SheetAllPatterns lessonId={lessonId} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {allPatterns?.map((pattern) => {
            return <LessonPatternItem key={pattern.id} pattern={pattern} />;
          })}
        </div>
      </Container>
    </section>
  );
};

export default LessonDetailPage;
